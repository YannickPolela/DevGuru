"use client";

import { toast } from "sonner";
import Image from "next/image";
import Confetti from "react-confetti";
import { useRouter } from "next/navigation";
import { useState, useTransition, useEffect } from "react";
import { useAudio, useMount, useWindowSize } from "react-use";

import { reduceHearts } from "@/actions/user-progress";
import { challengeOptions, challenges } from "@/db/schema";
import { getNextLesson } from "@/actions/next-lesson";

import { QuestionBubble } from "./question-bubble";
import { Header } from "./header";
import { Challenge } from "./challenge";
import { Footer } from "./footer";
import { upsertChallengeProgress } from "@/actions/challenge-progress";
import { ResultCard } from "./result-card";
import { useHeartsModal } from "@/store/use-hearts-modal";
import { usePracticeModal } from "@/store/use-practice-modal";

type Props = {
  initialPercentage: number;
  initialHearts: number;
  initialLessonId: number;
  initialLessonChallenges: (typeof challenges.$inferSelect & {
    completed: boolean;
    challengeOptions: typeof challengeOptions.$inferSelect[];
  })[];
};

export const Quiz = ({
  initialPercentage,
  initialHearts,
  initialLessonId,
  initialLessonChallenges,
}: Props) => {
  const { open: openHeartsModal } = useHeartsModal();
  const { open: openPracticeModal } = usePracticeModal();
  const router = useRouter();
  const { width, height } = useWindowSize();
  useMount(() => {
    if (initialPercentage === 100) {
      openPracticeModal();
    }
  });

  const [finishAudio] = useAudio({ src: "/finish.mp3", autoPlay: true });
  const [correctAudio, , correctControls] = useAudio({ src: "/correct.wav" });
  const [incorrectAudio, , incorrectControls] = useAudio({ src: "/incorrect.wav" });


  const [hasMounted, setHasMounted] = useState(false);

  const [pending, startTransition] = useTransition();
  const [lessonId] = useState(initialLessonId);
  const [hearts, setHearts] = useState(initialHearts);
  const [percentage, setPercentage] = useState(() => {
    return initialPercentage === 100 ? 0 : initialPercentage;
  });
  const [challenges, setChallenges] = useState(initialLessonChallenges);
    const [activeIndex, setActiveIndex] = useState(() => {
    const uncompletedIndex = challenges.findIndex((challenge) => !challenge.completed);
    return uncompletedIndex === -1 ? 0 : uncompletedIndex;
  });
  const [selectedOption, setSelectedOption] = useState<number>();
  const [status, setStatus] = useState<"correct" | "wrong" | "none" | "completed">("none");

  useEffect(() => {
    setHasMounted(true);
    if (initialPercentage === 100) openPracticeModal();
  }, [initialPercentage, openPracticeModal]);

  if (!hasMounted) return null;

  const challenge = challenges[activeIndex];
  const options = challenge?.challengeOptions ?? [];

  const completedChallenges = challenges.filter((c) => c.completed);



  const correctCount = completedChallenges.length;



  const awardedPoints = correctCount * 5;

  const validChallenges = challenges;
  const totalValidChallenges = validChallenges.length;
  const completedValidChallenges = validChallenges.filter((c) => c.completed).length;

  const correctPercentage =
    totalValidChallenges === 0
      ? 100
      : Math.round((completedValidChallenges / totalValidChallenges) * 100);


  const gemsEarned = 0;


  const onSelect = (id: number) => {
    if (status !== "none") return;
    setSelectedOption(id);
  };

  const onNext = () => {
    const nextIndex = activeIndex + 1;
    const allChallengesCompleted = challenges.every(c => c.completed);
    
    if (nextIndex >= challenges.length || allChallengesCompleted) {
      setStatus("completed");
      // Check for next lesson when all challenges are completed
      getNextLesson(lessonId).then((nextLesson) => {
        if (nextLesson) {
          router.push(`/lesson/${nextLesson.id}`);
        } else {
          router.push("/learn");
        }
      });
    } else {
      setActiveIndex(nextIndex);
      setStatus("none");
      setSelectedOption(undefined);
    }
  };



  const onContinue = () => {
    if (!selectedOption) return;

    if (status === "wrong") {
      setStatus("none");
      setSelectedOption(undefined);
      return;
    }

    if (status === "correct") {
      onNext();
      setStatus("none");
      setSelectedOption(undefined);
      return;
    }

    const correctOption = options.find((option) => option.correct);
    if (!correctOption) return;

    if (correctOption.id === selectedOption) {
      startTransition(() => {
        upsertChallengeProgress(challenge.id)
          .then((response) => {
            if (response?.error === "hearts") {
              openHeartsModal();
              return;
            }

            correctControls.play();
            setStatus("correct");
            setPercentage((prev) => prev + 100 / challenges.length);

            const updated = challenges.map((c, i) =>
              i === activeIndex ? { ...c, completed: true, correct: true } : c
            );
            setChallenges(updated);

            if (initialPercentage === 100) {
              setHearts((prev) => Math.min(prev + 1, 5));
            }

            // If this was the last challenge, check for the next lesson
            const allChallengesCompleted = updated.every(c => c.completed);
            if (allChallengesCompleted) {
              getNextLesson(lessonId).then((nextLesson) => {
                if (nextLesson) {
                  router.push(`/lesson/${nextLesson.id}`);
                } else {
                  router.push("/learn");
                }
              });
            }
          })
          .catch(() => toast.error("Something went wrong. Please try again."));
      });
    } else {
      startTransition(() => {
        reduceHearts(challenge.id)
          .then((response) => {
            if (response?.error === "hearts") {
              openHeartsModal();
              return;
            }

            incorrectControls.play();
            setStatus("wrong");

            if (!response?.error) {
              setHearts((prev) => Math.max(prev - 1, 0));
            }
          })
          .catch(() => toast.error("Something went wrong. Please try again."));
      });
    }
  };


   if (status === "completed" || !challenge) {

    return (
      <>
        {finishAudio}
        <Confetti width={width} height={height} recycle={false} numberOfPieces={500} tweenDuration={10000} />
        <div className="flex flex-col gap-y-4 lg:gap-y-8 max-w-lg mx-auto text-center items-center justify-center h-full">
          <video
            className="hidden lg:block rounded-md"
            width="300"
            height="300"
            autoPlay
            loop
            muted
            playsInline
            disablePictureInPicture
            controlsList="nodownload nofullscreen noremoteplayback"
            onContextMenu={(e) => e.preventDefault()}
          >

            <video
            className="rounded-md block lg:hidden"
            width="300"
            height="300"
            autoPlay
            loop
            muted
            playsInline
            disablePictureInPicture
            controlsList="nodownload nofullscreen noremoteplayback"
            onContextMenu={(e) => e.preventDefault()}
          ></video>
            <source src="/Mascot_celebration.mp4" type="video/mp4" />
            Mascot
          </video>

          <h1 className="text-xl lg:text-3xl font-bold text-neutral-700">
            Great job! <br /> You&apos;ve completed the lesson.
          </h1>
          <div className="flex items-center gap-x-4 w-full">
            <ResultCard variant="points" value={awardedPoints} />
            <ResultCard variant="hearts" value={hearts} />
            <ResultCard variant="percentage" value={correctPercentage} />
          </div>
        </div>
        <Footer lessonId={lessonId} status="completed" onCheck={() => router.push("/learn")} />
      </>
    );
  }


  const title = challenge.type === "ASSIST"
    ? "Complete the following code"
    : challenge.question;

  return (
    <>
      {incorrectAudio}
      {correctAudio}
      <Header hearts={hearts} percentage={percentage} />
      <div className="flex-1">
        <div className="h-full flex items-center justify-center">
          <div className="lg:min-h-[350px] lg:w-[600px] w-full px-6 lg:px-0 flex flex-col gap-y-12">
            <h1
              className="text-lg lg:text-3xl text-center lg:text-start font-bold text-neutral-700"
              dangerouslySetInnerHTML={{ __html: title }}
            />
            {challenge.imageSrc && (
              <Image
                alt="Icon"
                src={challenge.imageSrc}
                height={500}
                width={500}
                className="mr-1.5 rounded-lg"
              />
            )}
            <div>
              {challenge.type === "ASSIST" && <QuestionBubble question={challenge.question} />}
              <Challenge
                options={options}
                onSelect={onSelect}
                status={status}
                selectedOption={selectedOption}
                disabled={pending}
                type={challenge.type}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer
        disabled={pending || !selectedOption}
        status={status}
        onCheck={onContinue}
        
      />
    </>
  );
};
