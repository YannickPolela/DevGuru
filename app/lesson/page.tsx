import { redirect } from "next/navigation";

import { getLesson, getUserProgress} from "@/db/queries";
import { Quiz } from "./quiz";



const LessonPage = async () => {
  const lessonData = getLesson();
  const userProgressData = getUserProgress();

  const [
    lesson,
    userProgress,
    
  ] = await Promise.all([
    lessonData,
    userProgressData,
    
  ]);

  if (!lesson || !userProgress) {
    redirect("/learn");
  }

  const initialPercentage = lesson.challenges
    .filter((challenge) => challenge.completed)
    .length / lesson.challenges.length * 100;


      const isPractice = initialPercentage === 100;

  return ( 
    <Quiz
      initialLessonId={lesson.id}
      initialLessonChallenges={lesson.challenges}
      initialHearts={userProgress.hearts}
      initialPercentage={initialPercentage}   
    />
  );
};
 
export default LessonPage;
