"use client";

import { toast } from "sonner";
import Image from "next/image";
import { useTransition } from "react";

import { Button } from "@/components/ui/button";
import { GEMS_TO_REFILL } from "@/constants";
import { refillHearts } from "@/actions/user-progress";


type Props = {
  hearts: number;

  gems:number;
};

export const Items = ({
  hearts,
  gems,
}: Props) => {
  const [pending, startTransition] = useTransition();

  const onRefillHearts = () => {
    if (pending || hearts === 5 || gems < GEMS_TO_REFILL) {
      return;
    }

    startTransition(() => {
      refillHearts()
        .catch(() => toast.error("Something went wrong"));
    });
  };



  return (
    <ul className="w-full">
      <div className="flex items-center w-full p-4 gap-x-4 border-t-2">
        <Image 
          src="/hearts.png"
          alt="Heart"
          height={60}
          width={60}
        />
        <div className="flex-1">
          <p className="text-neutral-700 text-base lg:text-xl font-bold">
            Refill hearts
          </p>
        </div>
        <Button
          onClick={onRefillHearts}
          disabled={
            pending
            || hearts === 5 
            || gems < GEMS_TO_REFILL
          }
        >
          {hearts === 5
            ? "full"
            : (
              <div className="flex items-center">
                <Image
                  src="/gems.png"
                  alt="Gems"
                  height={20}
                  width={20}
                />
                <p>
                  {GEMS_TO_REFILL}
                </p>
              </div>
            )
          }
        </Button>
      </div>
      
    </ul>
  );
};
