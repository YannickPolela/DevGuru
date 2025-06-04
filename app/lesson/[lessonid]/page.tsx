import { redirect } from "next/navigation";

import { getLesson, getUserProgress} from "@/db/queries";
import { Quiz } from "../quiz";


type Props = {
  params: {
    lessonid: string;
  };
};


const LessonIdPage = async ({params}: Props) => {
  // Get lesson ID from params and start fetching data
  const lessonId = parseInt(params.lessonid, 10);
  
  const [lesson, userProgress] = await Promise.all([
    getLesson(lessonId),
    getUserProgress()
  ]);

  if (!lesson || !userProgress) {
    redirect("/learn");
  }

  const initialPercentage = lesson.challenges
    .filter((challenge) => challenge.completed)
    .length / lesson.challenges.length * 100;

  return ( 
    <Quiz
      initialLessonId={lesson.id}
      initialLessonChallenges={lesson.challenges}
      initialHearts={userProgress.hearts}
      initialPercentage={initialPercentage}     
    />
  );
};
 
export default LessonIdPage;
