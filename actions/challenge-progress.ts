"use server";

import { auth } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import db from "@/db/drizzle";
import { getUserProgress } from "@/db/queries";
import { challengeProgress, challenges, userProgress } from "@/db/schema";

export const upsertChallengeProgress = async (challengeId: number) => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized"); 
  }

  const currentUserProgress = await getUserProgress();
  if (!currentUserProgress) {
    throw new Error("User progress not found");
  }

  const challenge = await db.query.challenges.findFirst({
    where: eq(challenges.id, challengeId)
  });

  if (!challenge) {
    throw new Error("Challenge not found");
  }

  const lessonId = challenge.lessonId;

  const existingChallengeProgress = await db.query.challengeProgress.findFirst({
    where: and(
      eq(challengeProgress.userId, userId),
      eq(challengeProgress.challengeId, challengeId),
    ),
  });

  // Only consider it practice if the challenge was previously completed
  const isPractice = existingChallengeProgress?.completed || false;

  if (currentUserProgress.hearts === 0 && !isPractice) {
    return { error: "hearts" };
  }

  if (isPractice) {
    // Practice session - only update points, no hearts or gems
    await db.update(userProgress).set({
      points: currentUserProgress.points + 2,
    }).where(eq(userProgress.userId, userId));

    revalidatePaths(lessonId);
    return;
  }

  // First-time completion
  if (existingChallengeProgress) {
    await db.update(challengeProgress).set({
      completed: true,
    }).where(eq(challengeProgress.id, existingChallengeProgress.id));
  } else {
    await db.insert(challengeProgress).values({
      challengeId,
      userId,
      completed: true,
    });
  }

  
  await db.update(userProgress).set({
    points: currentUserProgress.points + 5,
    gems: currentUserProgress.gems + 2,
  }).where(eq(userProgress.userId, userId));

  revalidatePaths(lessonId);
};

function revalidatePaths(lessonId: number) {
  revalidatePath("/learn");
  revalidatePath("/lesson");
  revalidatePath("/quests");
  revalidatePath("/leaderboard");
  revalidatePath(`/lesson/${lessonId}`);
}