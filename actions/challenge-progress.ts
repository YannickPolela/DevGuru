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

  const isPractice = !!existingChallengeProgress;

  if (
    currentUserProgress.hearts === 0 && 
    !isPractice 
  ) {
    return { error: "hearts" };
  }

  if (isPractice) {
    await db.update(challengeProgress).set({
      completed: true,
    })
    .where(
      eq(challengeProgress.id, existingChallengeProgress.id)
    );

 if (currentUserProgress.hearts < 5) {
      await db.update(userProgress).set({
        hearts: Math.min(currentUserProgress.hearts + 1, 5),
        points: currentUserProgress.points + 5,
      }).where(eq(userProgress.userId, userId));
    } else {
      // Just update points if hearts are already full
      await db.update(userProgress).set({
        points: currentUserProgress.points + 5,
      }).where(eq(userProgress.userId, userId));
    }
    revalidatePath("/learn");
    revalidatePath("/lesson");
    revalidatePath("/quests");
    revalidatePath("/leaderboard");
    revalidatePath(`/lesson/${lessonId}`);
    return;
  }

  await db.insert(challengeProgress).values({
    challengeId,
    userId,
    completed: true,
  });



  /*

  const nextIndex = activeIndex + 1;
  const allChallengesCompleted = challenges.every(c => c.completed);
  
  if (nextIndex >= challenges.length || allChallengesCompleted) {
    setStatus("completed");
  } else {
  
  }
  */

  await db.update(userProgress).set({
    points: currentUserProgress.points + 5,
    gems: currentUserProgress.gems + 2,
  }).where(eq(userProgress.userId, userId));

  revalidatePath("/learn");
revalidatePath("/quests");
revalidatePath("/leaderboard");
revalidatePath(`/lesson/${lessonId}`);

};
