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
        // Unit 1: Basics of Programming
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
          title: "Flow Control Basics",
        },
        {
          id: 4,
          unitId: 1, 
          order: 4,
          title: "Unit 1 Review",
        },

        // Unit 2: First Python Code
        {
          id: 5,
          unitId: 2,
          order: 1,
          title: "Python Syntax Basics",
        },
        {
          id: 6,
          unitId: 2,
          order: 2,
          title: "Your First Python Program",
        },
        {
          id: 7,
          unitId: 2,
          order: 3,
          title: "Understanding Errors",
        },
        {
          id: 8,
          unitId: 2,
          order: 4,
          title: "Unit 2 Review",
        },

        // Unit 3: Variables and Data Types
        {
          id: 9,
          unitId: 3,
          order: 1,
          title: "Introduction to Variables",
        },
        {
          id: 10,
          unitId: 3,
          order: 2,
          title: "Python Data Types",
        },
        {
          id: 11,
          unitId: 3,
          order: 3,
          title: "Type Conversion",
        },
        {
          id: 12,
          unitId: 3,
          order: 4,
          title: "Working with Numbers",
        },
        {
          id: 13,
          unitId: 3,
          order: 5,
          title: "Unit 3 Review",
        },

        // Unit 4: Conditionals
        {
          id: 14,
          unitId: 4,
          order: 1,
          title: "If Statements",
        },
        {
          id: 15,
          unitId: 4,
          order: 2,
          title: "Else and Elif",
        },
        {
          id: 16,
          unitId: 4,
          order: 3,
          title: "Comparison Operators",
        },
        {
          id: 17,
          unitId: 4,
          order: 4,
          title: "Logical Operators",
        },
        {
          id: 18,
          unitId: 4,
          order: 5,
          title: "Unit 4 Review",
        },

        // Unit 5: Loops
        {
          id: 19,
          unitId: 5,
          order: 1,
          title: "While Loops",
        },
        {
          id: 20,
          unitId: 5,
          order: 2,
          title: "For Loops",
        },
        {
          id: 21,
          unitId: 5,
          order: 3,
          title: "Loop Control (break/continue)",
        },
        {
          id: 22,
          unitId: 5,
          order: 4,
          title: "Nested Loops",
        },
        {
          id: 23,
          unitId: 5,
          order: 5,
          title: "Unit 5 Review",
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

       {
        id: 4,
        lessonId: 1,
        type: "INFO",
        order: 4,
        question: "In a pseudocode, START marks where the algorithm begins while END (or STOP) marks where it finishes.<br> This helps clearly indicate what is and isn't part of the process. <br><br> When pseudocode gets longer, having START and END helps organize the steps and makes it easier to: <br>- Trace the flow of logic <br>- Break problems into smaller routines (like functions)",
        imageSrc: "/programming6.png"
      },

      {
        id: 5,
        lessonId: 1,
        type: "INFO",
        order: 5,
        question: "When you're learning Python for the first time, it's easy to get stuck on: <br/><br/> -- Where do the colons go? <br/>Why is indentation so strict? <br/> -- What’s the exact name of the function?<br/><br/>Pseudocode removes all that. It helps you focus on what the program should do, not how to type it perfectly.",
        imageSrc: "/programming4.png"
      },
        {
              id: 6,
              lessonId: 1,
              type: "SELECT",
              order: 6,
              question: "What is the purpose of pseudocode?",
              imageSrc: "/programming7.png"
            },
            {
            id: 7,
            lessonId: 1,
            type: "ASSIST",
            order: 7,
            question: "Complete the pseudocode for a morning routine:",
            imageSrc: "/pseudocode3.png" // Image shows incomplete pseudocode
          },
          {
        id: 8,
        lessonId: 2,
        type: "INFO",
        order: 8,
        question: "<h1>What is an an Algorithm?</h1> <br> This is a step-by-step set of instructions that tells a computer how to solve a problem or perform a task. <br/> Just like a recipe tells you how to make a cake, an algorithm tells the computer exactly what to do, in what order, to get the correct result.",
        imageSrc: "/programming5.png"
      },
        {
          id: 9,
          lessonId: 2,
          type: "INFO",
          order: 9,
          question: "<h2>Algorithm Characteristics</h2><br>Good algorithms have these qualities:<br>- <strong>Clear steps</strong>: Each instruction is precise<br>- <strong>Finite</strong>: It must eventually stop<br>- <strong>Effective</strong>: Solves the problem correctly<br>- <strong>General</strong>: Works for different inputs",
          imageSrc: "/programming.png"
        },
        {
          id: 10,
          lessonId: 2,
          type: "SELECT",
          order: 10,
          question: "Which of these is NOT a characteristic of a good algorithm?",
          imageSrc: "/programming7.png"
        },
          {
          id: 11,
          lessonId: 2,
          type: "SELECT",
          order: 11,
          question: "Complete the algorithm for making tea:",
          imageSrc: "/pseudocode4.png" 
        }
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
        challengeId: 3, 
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
      {
        challengeId: 4,
        correct: true,
        text: "Proceed",
      },
      {
        challengeId: 5,
        correct: true,
        text: "Proceed",
      },
      {
        challengeId: 6,
        correct: false,
        text: "To write code that computers can execute directly"
      },
      {
        challengeId: 6,
        correct: true,
        text: "To plan and communicate algorithms in human-readable form"
      },
      {
        challengeId: 6,
        correct: false,
        text: "To create visual diagrams of programs"
      },
      {
        challengeId: 7,
        correct: true,
        text: "Wake up"
      },
      {
        challengeId: 7,
        correct: false,
        text: "Go to sleep"
      },
      {
        challengeId: 7,
        correct: false,
        text: "Eat dinner"
      },
      {
        challengeId: 8,
        correct: true,
        text: "Proceed",
      },
      {
        challengeId: 9,
        correct: true,
        text: "Proceed",
      },
      {
          challengeId: 10,
          correct: false,
          text: "Finite (stops after completing)"
      },
      {
          challengeId: 10,
          correct: true,
          text: "Requires complex math"
      },
      {
          challengeId: 10,
          correct: false,
          text: "Has clear, precise steps"
      },
      {
          challengeId: 11,
          correct: true,
          text: "Boil water"
      },
      {
          challengeId: 11,
          correct: false,
          text: "Add ice cubes"
      },
      {
          challengeId: 11,
          correct: false,
          text: "Put in microwave"
      }
    ]);

    ;
    console.log("Seeding finished");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to seed the database");
  }
};

main();

