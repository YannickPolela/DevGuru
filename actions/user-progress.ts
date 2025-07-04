"use server";

import { GEMS_TO_REFILL } from "@/constants";
import db from "@/db/drizzle";
import { getCourseById, getUserProgress } from "@/db/queries";
import { challengeProgress, challenges, userProgress } from "@/db/schema";
import { auth, currentUser } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";


import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const upsertUserProgress = async (courseId: number, shouldRedirect: boolean = true) => {
  const { userId } = await auth();
  const user = await currentUser();

  if (!userId || !user) {
    throw new Error("Unauthorized");
  }

  const course = await getCourseById(courseId);

  if (!course) {
    throw new Error("Course not found");
  }

  const existingUserProgress = await getUserProgress();

  if (existingUserProgress) {
    const shouldIncreaseExpertise = courseId > (existingUserProgress?.activeCourseId ?? 0);
    const updatedExpertise = (existingUserProgress.user_expertise ?? 0) + (shouldIncreaseExpertise ? 1 : 0);

    await db.update(userProgress).set({
      activeCourseId: courseId,
      userName: user.firstName || "User",
      userImageSrc: user.imageUrl || "public/profile.png",
      //user_expertise: updatedExpertise,
      user_expertise: 3,
    });

    revalidatePath("/courses");
    revalidatePath("/learn");
    if (shouldRedirect) {
      redirect("/learn");
    }
  }

  await db.insert(userProgress).values({
    userId,
    activeCourseId: courseId,
    userName: user.firstName || "User",
    userImageSrc: user.imageUrl || "public/profile.png",
    //user_expertise: courseId || 1,
     user_expertise: 3,
  });

  revalidatePath("/courses");
  revalidatePath("/learn");
  if (shouldRedirect) {
    redirect("/learn");
  }
};

  export const reduceHearts = async (challengeId: number) => {
    const { userId } = await auth();
  
    if (!userId) {
      throw new Error("Unauthorized");
    }
  
    const currentUserProgress = await getUserProgress();
  
    const challenge = await db.query.challenges.findFirst({
      where: eq(challenges.id, challengeId),
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
  
    if (isPractice) {
      return { error: "practice" }; 
    }
  
    if (!currentUserProgress) {
      throw new Error("User progress not found");
    }
  
    if (currentUserProgress.hearts === 0) {
      return { error: "hearts" };
    }
  
    
    await db.update(userProgress).set({
      hearts: Math.max(currentUserProgress.hearts - 1, 0),
    }).where(eq(userProgress.userId, userId));
  

    await db.insert(challengeProgress).values({
      challengeId,
      userId,
      completed: true,
      correct: false,
    });
  
    revalidatePath("/shop");
    revalidatePath("/learn");
    revalidatePath("/quests");
    revalidatePath("/leaderboard");
    revalidatePath(`/lesson/${lessonId}`);
  };
  
  



export const refillHearts = async () => {
  const currentUserProgress = await getUserProgress();

  if (!currentUserProgress) {
    throw new Error("User progress not found");
  }

  if (currentUserProgress.hearts === 5) {
    throw new Error("Hearts are already full");
  }  

  if (currentUserProgress.gems < GEMS_TO_REFILL) {
    throw new Error("Not enough gems");
  }

  await db.update(userProgress).set({
    hearts: 5,
    gems: currentUserProgress.gems - GEMS_TO_REFILL,
  }).where(eq(userProgress.userId, currentUserProgress.userId));

  revalidatePath("/shop");
  revalidatePath("/learn");
  revalidatePath("/quests");
  revalidatePath("/leaderboard");
};