import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { courses } from "@/db/schema";


type Props = {
    activeCourse: typeof courses.$inferInsert;
    hearts: number;
    points: number;
    gems: number;
    }



export const UserProgress = ({activeCourse, 
    points, 
    hearts,
    gems
    
    }: Props) => {
    return (
        <div className="flex items-center justify-between gap-x-2 w-full">
            <Link href="/courses">
                <Button variant = "ghost">
                    <Image src = {activeCourse.imageSrc} alt = {activeCourse.title} 
                    className="rounded-md border" width = {32} 
                    height = {32}></Image>
                </Button>
            </Link>
            <Link href = "/quests">
                <Button variant = "ghost" className="text-cyan-500">
                    <Image src ="/points.png" alt = "points" 
                    height = {28} 
                    width = {28} 
                    className="mr-2" />
                    {points}
                </Button>
            </Link>
            <Link href = "/shop">
                <Button variant = "ghost" className="text-cyan-500">
                    <Image src ="/hearts.png" alt = "hearts" 
                    height = {22} 
                    width = {22} 
                    className="mr-2" />
                    {hearts}
                </Button>
            </Link>
            <Link href = "/shop">
                <Button variant = "ghost" className="text-cyan-500">
                    <Image src ="/gems.png" alt = "hearts" 
                    height = {22} 
                    width = {22} 
                    className="mr-2" />
                    {gems}
                </Button>
            </Link>
        </div>
    )
}