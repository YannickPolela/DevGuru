import { getUserProgress } from "@/db/queries";
import { MobileSidebar } from "./mobile-sidebar";
import { UserProgress } from "./user-progress";
import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";
export const MobileHeader = async () => {

const userProgressData = getUserProgress();


  const [
    userProgress,

   
  ] = await Promise.all([
    userProgressData,

  ]);
    return(
<nav className="lg:hidden px-6 h-[55px] flex items-center justify-between bg-cyan-500 border-b fixed top-0 w-full z-50">
  <MobileSidebar />
  
  <div className="bg-white flex items-center gap-x-2 rounded-lg ml-auto px-2 py-0">
    <Link href="/shop">
      <Button variant="ghost" className="text-cyan-500">
        <Image
          src="/points.png"
          alt="points"
          height={20}
          width={20}
          className="mr-2"
        />
        {userProgress?.points}
      </Button>
    </Link>
    <Link href="/shop">
      <Button variant="ghost" className="text-cyan-500">
        <Image
          src="/hearts.png"
          alt="hearts"
          height={18}
          width={18}
          className="mr-2"
        />
        {userProgress?.hearts}
      </Button>
    </Link>
    <Link href="/shop">
      <Button variant="ghost" className="text-cyan-500">
        <Image
          src="/gems.png"
          alt="gems"
          height={16}
          width={16}
          className="mr-2"
        />
        {userProgress?.gems}
      </Button>
    </Link>
  </div>
</nav>

    );
};