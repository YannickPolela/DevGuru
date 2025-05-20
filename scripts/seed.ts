import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

import * as schema from "../db/schema";
import dotenv from "dotenv";
dotenv.config({ path: "public/.env.local" });


const sql = neon(process.env.DATABASE_URL!); 

const db = drizzle(sql, { schema });

const main = async () => {
  try {
    console.log("Seeding database");

    await db.delete(schema.courses);
    await db.delete(schema.userProgress);
    await db.delete(schema.units);
    await db.delete(schema.lessons);
    await db.delete(schema.challenges);
    await db.delete(schema.challengeOptions);
    await db.delete(schema.challengeProgress);


    await db.insert(schema.courses).values([
        {
          id: 1,
          title: "Beginner",
          imageSrc: "/Beginner.png",
        },
        {
          id: 2,
          title: "Intermediate",
          imageSrc: "/Intermediate.png",
        },
        {
          id: 3,
          title: "Advanced",
          imageSrc: "/Advanced.png",
        },
       
      ])


      await db.insert(schema.units).values([
        {
          id: 1,
          courseId: 1,
          title: "Unit 1",
          description: "Learn the basics of programming.",
          order: 1,
        },
        {
          id: 2,
          courseId: 1,
          title: "Unit 2",
          description: "Write your first Python code.",
          order: 2,
        },
        {
          id: 3,
          courseId: 1,
          title: "Unit 3",
          description: "Work with variables and data types in Python.",
          order: 3,
        },
        {
          id: 4,
          courseId: 1,
          title: "Unit 4",
          description: "Use conditionals to make decisions in your code.",
          order: 4,
        },
        {
          id: 5,
          courseId: 1,
          title: "Unit 5",
          description: "Repeat actions using loops like for and while.",
          order: 5,
        },
        {
          id: 6,
          courseId: 1,
          title: "Unit 6",
          description: "Organize code with functions and reuse logic.",
          order: 6,
        },
        {
          id: 7,
          courseId: 1,
          title: "Unit 7",
          description: "Handle errors and debug your programs effectively.",
          order: 7,
        },
        {
          id: 8,
          courseId: 1,
          title: "Unit 8",
          description: "Use lists and dictionaries to manage collections of data.",
          order: 8,
        },
        {
          id: 9,
          courseId: 1,
          title: "Unit 9",
          description: "Read from and write to files in Python.",
          order: 9,
        },
        {
          id: 10,
          courseId: 1,
          title: "Unit 10",
          description: "Build a mini project to apply what you've learned.",
          order: 10,
        },
      ]);
      

      await db.insert(schema.lessons).values([
        {
          id: 1,
          unitId: 1, 
          order: 1,
          title: "What is programming?",
        },
        {
          id: 2,
          unitId: 1, 
          order: 2,
          title: "Algorithms",
        },
         {
          id: 3,
          unitId: 1, 
          order: 3,
          title: "Test",
        }
      ]);


      

    await db.insert(schema.challenges).values([
      {
        id: 1,
        lessonId: 1,
        type: "INFO",
        order: 1,
        question: "<h1>What is Programming?</h1> <br/> Programming is the process of giving instructions to a computer so it can perform tasks. Just like following a recipe, you write a set of steps for the computer to follow. <br/> These steps are written in a language the computer understands. With programming, you can create apps, websites, games, and tools that solve problems or make life easier. <br> <br> With Devguru you will be able to gain the necessary skills to start your programming journey.",
        imageSrc: "/programming3.png"
      },
      {
        id: 2,
        lessonId: 1, 
        type: "INFO",
        order: 2,
        question: "To understand how programming works, we need to understand the concept of pseudocode. <br> A Pseudocode is a simplified step-by-step description of an program that does not use a specific programming language. Instead, it uses simple English language text for human understanding rather than for machine reading. <br><br> For example if you wanted to make a peanut butter and jelly sandwich, the steps carried out to do so would be presented as follows:",
        imageSrc: "/pseudocode1.png"
      },
      
      {
        id: 3,
        lessonId: 1,
        type: "SELECT",
        order: 3,
        question: "Which statement is missing from the pseudocode to make the sandwich? Fill in the blank space below",
        imageSrc: "/pseudocode2.png"
      },
    ]);



    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 1,
        correct: true,
        text: "Proceed",
      },
      {
        challengeId: 2,
        correct: true,
        text: "Proceed",
      },
      {
        challengeId: 3, // Which statement is missing from the pseudocode to make the sandwich"?
        correct: true,
        text: "START",
      },
      {
        challengeId: 3,
        correct: false,
        text: "END",
      },
      {
        challengeId: 3,
        correct: false,
        text: "CONTINUE",
      },
    ]);

    ;
    console.log("Seeding finished");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to seed the database");
  }
};

main();

