
import { getUserProgress } from "@/db/queries";
import { List } from "C:/Users/USER/devguru/app/(main)/courses/list"; 
import { courses } from "@/db/schema";

type Props = {
  courses: typeof courses.$inferSelect[];
  activeCourseId?: number;
};

export default async function ListWrapper({ courses, activeCourseId }: Props) {
  const userProgress = await getUserProgress();

  return (
    <List
      courses={courses}
      activeCourseId={activeCourseId}
      userExpertise={userProgress?.user_expertise}
    />
  );
}
