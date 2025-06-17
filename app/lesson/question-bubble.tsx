import Image from "next/image";

type Props = {
  question: string;
};

export const QuestionBubble = ({ question }: Props) => {
  return (
    <div className="flex items-center gap-x-4 mb-6">
      <video
            className="hidden lg:block rounded-md"
            width={60}
            height={60}
            autoPlay
            loop
            muted
            playsInline
            disablePictureInPicture
            controlsList="nodownload nofullscreen noremoteplayback"
            onContextMenu={(e) => e.preventDefault()}
          >
            <source src="/Talking.mp4" type="video/mp4" />
            Mascot
          </video>
      <video
            className="block:lg hidden rounded-md"
            width={40}
            height={40}
            autoPlay
            loop
            muted
            playsInline
            disablePictureInPicture
            controlsList="nodownload nofullscreen noremoteplayback"
            onContextMenu={(e) => e.preventDefault()}
          >
            <source src="/Talking.mp4" type="video/mp4" />
            Mascot
          </video>
      <div className="relative py-2 px-4 border-2 rounded-xl text-sm lg:text-base">
        {question}
        <div
          className="absolute -left-3 top-1/2 w-0 h-0 border-x-8 border-x-transparent border-t-8 transform -translate-y-1/2 rotate-90"
        />
      </div>
    </div>
  );
};
