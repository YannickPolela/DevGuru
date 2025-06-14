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
  }  // Get all challenges for this lesson to check if this is the last one
  const lessonChallenges = await db.query.challenges.findMany({
    where: eq(challenges.lessonId, lessonId),
    with: {
      challengeProgress: {
        where: eq(challengeProgress.userId, userId)
      }
    }
  });

  if (isPractice) {
    await db.update(challengeProgress).set({
      completed: true,
    })
    .where(
      eq(challengeProgress.id, existingChallengeProgress.id)
    );
    
    // Check if this was the last challenge in practice mode
    const allChallengesCompleted = lessonChallenges.every(c => 
      c.id === challengeId || 
      (c.challengeProgress && c.challengeProgress.some(p => p.completed))
    );

    revalidatePath("/learn");
    revalidatePath("/lesson");
    revalidatePath("/quests");
    revalidatePath("/leaderboard");
    revalidatePath(`/lesson/${lessonId}`);
    return { isPractice: true, completed: allChallengesCompleted };
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
    gems: currentUserProgress.gems + 10,
  }).where(eq(userProgress.userId, userId));

  revalidatePath("/learn");
revalidatePath("/quests");
revalidatePath("/leaderboard");
revalidatePath(`/lesson/${lessonId}`);

};
