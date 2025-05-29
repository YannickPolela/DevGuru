"use server";

import { auth } from "@clerk/nextjs/server";
import { and, eq, gt } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import db from "@/db/drizzle";
import { getUserProgress } from "@/db/queries";
import { lessons, units } from "@/db/schema";

export const getNextLesson = async (currentLessonId: number) => {
  const { userId } = await auth();
  
  if (!userId) {
    return null;
  }

  const userProgress = await getUserProgress();
  
  if (!userProgress?.activeCourseId) {
    return null;
  }

  // Get current lesson to find its unit
  const currentLesson = await db.query.lessons.findFirst({
    where: eq(lessons.id, currentLessonId),
    with: {
      unit: true
    }
  });

  if (!currentLesson) {
    return null;
  }

  // First try to find next lesson in same unit
  const nextLesson = await db.query.lessons.findFirst({
    where: and(
      eq(lessons.unitId, currentLesson.unitId),
      gt(lessons.order, currentLesson.order)
    ),
    orderBy: (lessons, { asc }) => [asc(lessons.order)],
  });

  if (nextLesson) {
    return nextLesson;
  }

  // If no more lessons in current unit, find first lesson of next unit
  const nextUnit = await db.query.units.findFirst({
    where: and(
      eq(units.courseId, userProgress.activeCourseId),
      gt(units.order, currentLesson.unit.order)
    ),
    orderBy: (units, { asc }) => [asc(units.order)],
    with: {
      lessons: {
        orderBy: (lessons, { asc }) => [asc(lessons.order)],
        limit: 1
      }
    }
  });

  if (nextUnit?.lessons[0]) {
    return nextUnit.lessons[0];
  }

  return null;
};
