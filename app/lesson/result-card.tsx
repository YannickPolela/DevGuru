import Image from "next/image";
import { cn } from "@/lib/utils";

type Props = {
  value: number;
  variant: "points" | "hearts" | "percentage";
};

export const ResultCard = ({ value, variant }: Props) => {
  const imageSrc =
    variant === "hearts"
      ? "/hearts.png"
      : variant === "percentage"
      ? "/gems.png"
        : "/points.png"
        ;

  return (
    <div className={cn(
      "rounded-2xl border-2 w-full",
      variant === "points" && "bg-cyan-400 border-cyan-400",
      variant === "hearts" && "bg-orange-500 border-orange-500",
      variant === "percentage" && "bg-yellow-500 border-yellow-500"
    )}>
      <div className={cn(
        "p-1.5 text-white rounded-t-xl font-bold text-center uppercase text-xs",
        variant === "hearts" && "bg-orange-500",
        variant === "points" && "bg-cyan-400",
        variant === "percentage" && "bg-yellow-500"
      )}>
        {variant === "hearts"
          ? "Hearts Left"
          : variant === "percentage"
            ? "Gems Earned"
            : "XP Earned"}
      </div>
      <div className={cn(
        "rounded-2xl bg-white items-center flex justify-center p-6 font-bold text-lg",
        variant === "hearts" && "text-rose-500",
        variant === "points" && "text-orange-400",
        variant === "percentage" && "text-yellow-500"
      )}>
        <Image
          alt="Icon"
          src={imageSrc}
          height={30}
          width={30}
          className="mr-1.5"
        />
        {value}
      </div>
    </div>
  );
};
