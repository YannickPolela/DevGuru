
"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { upsertUserProgress } from "@/actions/user-progress";
import { Card } from "./card";
import { courses } from "@/db/schema";
import { userProgress } from "@/db/schema";
import { toast } from "sonner";

type Props = {
  courses: typeof courses.$inferSelect[];
  activeCourseId?: typeof userProgress.$inferSelect.activeCourseId;
  userExpertise?: typeof userProgress.$inferSelect.user_expertise;
};

export function List({ courses, activeCourseId, userExpertise }: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

const onClick = (id: number) => {
  if (pending) return;

  if (id === activeCourseId) {
    // Don't trigger redirect if the course is already active
    return router.push("/learn");
  }

  // When selecting a new course, pass `true` to trigger the redirect
  startTransition(() => {
    upsertUserProgress(id, true)  // Pass `true` to redirect to /learn
      .catch(() => toast.error("Something went wrong!"));
  });
};



  return (
    <div className="pt-6 flex flex-col gap-4 lg:flex-row lg:flex-wrap lg:gap-4 pb-6">
      {courses.map((course) => (
        <Card
          key={course.id}
          id={course.id}
          title={course.title}
          imageSrc={course.imageSrc}
          onClick={onClick}
          disabled={(userExpertise ?? 3) < course.id || pending}
          active={course.id === activeCourseId}
        />
      ))}
    </div>
  );
}
