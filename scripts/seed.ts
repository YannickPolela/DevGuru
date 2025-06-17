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
        {
          id: 11,
          courseId: 2, // Intermediate course
          title: "Unit 11",
          description: "Understanding classes and objects in Python",
          order: 1,
        },
        {
          id: 12,
          courseId: 2,
          title: "Unit 12",
          description: "Using modules and packages",
          order: 2,
        },
        {
          id: 13,
          courseId: 2,
          title: "Unit 13",
          description: "Working with dates, times, and built-in libraries",
          order: 3,
        },
        {
          id: 14,
          courseId: 2,
          title: "Unit 14",
          description: "Writing more efficient code with list comprehensions and generators",
          order: 4,
        },
        {
          id: 15,
          courseId: 2,
          title: "Unit 15",
          description: "Mastering file handling and working with different file formats (CSV, JSON)",
          order: 5,
        },
        {
          id: 16,
          courseId: 2,
          title: "Unit 16",
          description: "Introduction to virtual environments and dependency management",
          order: 6,
        },
        {
          id: 17,
          courseId: 2,
          title: "Unit 17",
          description: "Error handling with custom exceptions",
          order: 7,
        },
        {
          id: 18,
          courseId: 2,
          title: "Unit 18",
          description: "Exploring functional programming concepts in Python",
          order: 8,
        },
        {
          id: 19,
          courseId: 2,
          title: "Unit 19",
          description: "Introduction to testing and writing unit tests",
          order: 9,
        },
        {
          id: 20,
          courseId: 2,
          title: "Unit 20",
          description: "Building a project: A command-line tool or mini app",
          order: 10,
        }
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
        },
        {
          id: 24,
          unitId: 11,
          order: 1,
          title: "Introduction to OOP",
        },
        {
          id: 25,
          unitId: 11,
          order: 2,
          title: "Classes vs Objects",
        },
        {
          id: 26,
          unitId: 11,
          order: 3,
          title: "Attributes and Methods",
        },
        {
          id: 27,
          unitId: 11,
          order: 4,
          title: "__init__ and self",
        },
        {
          id: 28,
          unitId: 11,
          order: 5,
          title: "Unit 11 Review",
        },
        {
          id: 29,
          unitId: 12,
          order: 1,
          title: "Importing Modules",
        },
        {
          id: 30,
          unitId: 12,
          order: 2,
          title: "Creating Your Own Modules",
        },
        {
          id: 31,
          unitId: 12,
          order: 3,
          title: "Package Structure",
        },
        {
          id: 32,
          unitId: 12,
          order: 4,
          title: "__init__.py and __all__",
        },
        {
          id: 33,
          unitId: 12,
          order: 5,
          title: "Unit 12 Review",
        },
         {
          id: 34,
          unitId: 13,
          order: 1,
          title: "datetime Module",
        },
        {
          id: 35,
          unitId: 13,
          order: 2,
          title: "Time Zones with pytz",
        },
        {
          id: 36,
          unitId: 13,
          order: 3,
          title: "Working with timedelta",
        },
        {
          id: 37,
          unitId: 13,
          order: 4,
          title: "Calendar and math Modules",
        },
        {
          id: 38,
          unitId: 13,
          order: 5,
          title: "Unit 13 Review",
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
        question: "When you're learning Python for the first time, it's easy to get stuck on: <br/><br/> -- Where do the colons go? <br/> -- Why is indentation so strict? <br/> -- What’s the exact name of the function?<br/><br/>Pseudocode removes all that. It helps you focus on what the program should do, not how to type it perfectly.",
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
        },
        {
          id: 12,
          lessonId: 2,
          type: "SELECT",
          order: 12,
          question: "What is the first step in creating a program?",
          imageSrc: "/programming8.png"
        },
        {
          id: 13,
          lessonId: 3,
          type: "ASSIST",
          order: 13,
          question: "Complete this algorithm for finding the largest of three numbers:",
          imageSrc: "/pseudocode5.png" // Shows incomplete pseudocode
        },
        {
          id: 14,
          lessonId: 3, // Flow Control Basics
          type: "INFO",
          order: 14,
          question: "<h2>Understanding Flow Control</h2><br><br>Flow control determines the order in which instructions are executed in a program. <br><br>There are three basic structures:<br>1. <strong>Sequence</strong>: Execute statements one after another<br>2. <strong>Selection</strong>: Make decisions with if/else<br>3. <strong>Repetition</strong>: Repeat actions with loops",
          imageSrc: "/programming9.png"
        },
        {
          id: 15,
          lessonId: 3,
          type: "SELECT",
          order: 15,
          question: "Which flow control structure would you use to execute different code based on whether a user is logged in?",
          imageSrc: "/thinking.png"
        },
        {
          id: 16,
          lessonId: 3,
          type: "ASSIST",
          order: 16,
          question: "Complete this sequence flow for making coffee:",
          imageSrc: "/pseudocode6.png" // Shows: 1. Boil water -> 2. ? -> 3. Pour water
        },
        {
          id: 17,
          lessonId: 3,
          type: "INFO",
          order: 17,
          question: "<h2>Pseudocode for Decisions</h2><br>Selection structures use conditions:<br><br><strong>IF</strong> condition <strong>THEN</strong><br>&nbsp;&nbsp;statement(s)<br><strong>END IF</strong><br><br>Example:<br>IF hour > 12 THEN<br>&nbsp;&nbsp;PRINT 'Good afternoon'<br>END IF",
          imageSrc: "/programming10.png"
        },
        {
          id: 18,
          lessonId: 3,
          type: "ASSIST",
          order: 18,
          question: "Complete this pseudocode for a login check (missing condition):",
          imageSrc: "/pseudocode7.png" // Shows: IF ? THEN -> PRINT 'Access granted'
        },
        {
          id: 19,
          lessonId: 3,
          type: "SELECT",
          order: 19,
          question: "What's the correct order for this breakfast routine?<br>1. Eat food<br>2. Prepare ingredients<br>3. Cook food",
          imageSrc: "/thinking2.png"
        },
        {
          id: 20,
          lessonId: 24,
          type: "INFO",
          order: 1,
          question: "<h2>Object-Oriented Programming</h2><br><br>OOP organizes code into <strong>objects</strong> that contain:<br><br>• <strong>Data</strong> (attributes/properties)<br>• <strong>Behavior</strong> (methods/functions)<br><br>Key principles:<br>• Encapsulation<br>• Abstraction<br>• Inheritance<br>• Polymorphism",
          imageSrc: "/programming11.png"
        },
        {
          id: 21,
          lessonId: 24,
          type: "SELECT",
          order: 2,
          question: "Which OOP principle hides internal implementation details?",
          imageSrc: "/thinking.png"
        },
        {
          id: 22,
          lessonId: 24,
          type: "ASSIST",
          order: 3,
          question: "Complete this class definition:",
          imageSrc: "/pythoncode.png" // Shows: class Car: → def __init__(self, ?): → self.make = make
        },
        {
          id: 23,
          lessonId: 24,
          type: "INFO",
          order: 4,
          question: "<h2>Real-World Analogy</h2><br>A <strong>class</strong> is like a blueprint for a house.<br>A <strong>object</strong> is an actual house built from that blueprint.<br><br>Attributes = number of rooms, color<br>Methods = open_door(), turn_on_lights()",
          imageSrc: "/house-analogy.png"
        },
        {
          id: 24,
          lessonId: 24,
          type: "SELECT",
          order: 5,
          question: "If 'Dog' is a class, which is an object?",
          imageSrc: "/thinking2.png"
        },
        {
          id: 25,
          lessonId: 24,
          type: "ASSIST",
          order: 6, // Follows existing challenges
          question: "Complete this method to return the car's info:",
          imageSrc: "/pythoncode2.png" 
        
        },

        {
          id: 26,
          lessonId: 25,
          type: "INFO",
          order: 1,
          question: "<h2>Classes vs Objects</h2><br><br>A <strong>class</strong> is a template (like a cookie cutter)<br>An <strong>object</strong> is an instance (like an actual cookie)<br><br>Example:<br>• <code>class Car:</code> → Blueprint<br>• <code>my_car = Car()</code> → Actual vehicle",
          imageSrc: "/programming6.png"
        },
        {
          id: 27,
          lessonId: 25,
          type: "SELECT",
          order: 2,
          question: "How many objects can be created from one class?",
          imageSrc: "/thinking2.png"
        },
        {
          id: 28,
          lessonId: 25,
          type: "ASSIST",
          order: 3,
          question: "Complete this object instantiation:",
          imageSrc: "/pythoncode3.png" // Shows: class Book: pass → ? = Book()
        },
        {
          id: 29,
          lessonId: 25,
          type: "INFO",
          order: 4,
          question: "<h2>Instance Identity</h2><br>Each object has unique:<br>• Memory address<br>• Attribute values<br><br>Example:<br><code>car1 = Car('red')</code><br><code>car2 = Car('blue')</code>",
          imageSrc: "/programming8.png"
        },
        {
          id: 30,
          lessonId: 25,
          type: "SELECT",
          order: 5,
          question: "Which is the class in this code?<br><code>class Student:</code><br><code>s = Student()</code>",
          imageSrc: "/programming4.png"
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
      },
      
      {
        challengeId: 12,
        correct: false,
        text: "Start typing code immediately"
      },
      {
        challengeId: 12,
        correct: false,
        text: "Choose the programming language"
      },
       {
        challengeId: 12,
        correct: true,
        text: "Understand the problem and plan with pseudocode"
      },
      {
        challengeId: 13,
        correct: true,
        text: "Compare num1 and num2, store larger in max"
      },
      {
        challengeId: 13,
        correct: false,
        text: "Add all three numbers together"
      },
      {
        challengeId: 13,
        correct: false,
        text: "Print 'Hello World'"
      },
      {
    challengeId: 14,
    correct: true,
    text: "Proceed"
  },
  
  // SELECT Challenge 15
  {
    challengeId: 15,
    correct: false,
    text: "Sequence"
  },
  {
    challengeId: 15,
    correct: true,
    text: "Selection"
  },
  {
    challengeId: 15,
    correct: false,
    text: "Repetition"
  },
  
  // ASSIST Challenge 16
  {
    challengeId: 16,
    correct: true,
    text: "Add coffee grounds"
  },
  {
    challengeId: 16,
    correct: false,
    text: "Drink coffee"
  },
  {
    challengeId: 16,
    correct: false,
    text: "Clean the cup"
  },
  
  // INFO Challenge 17
  {
    challengeId: 17,
    correct: true,
    text: "Proceed"
  },
  
  // ASSIST Challenge 18
  {
    challengeId: 18,
    correct: true,
    text: "password == correct_password"
  },
  {
    challengeId: 18,
    correct: false,
    text: "password = correct_password"
  },
  {
    challengeId: 18,
    correct: false,
    text: "password != correct_password"
  },
  
  // SELECT Challenge 19
  {
    challengeId: 19,
    correct: false,
    text: "1, 2, 3"
  },
  {
    challengeId: 19,
    correct: true,
    text: "2, 3, 1"
  },
  {
    challengeId: 19,
    correct: false,
    text: "3, 2, 1"
  },


  //Intermediate challenge options


   {
    challengeId: 20,
    correct: true,
    text: "Proceed"
  },
  
  // SELECT Challenge 21 (OOP principles)
  {
    challengeId: 21,
    correct: true,
    text: "Encapsulation"
  },
  {
    challengeId: 21,
    correct: false,
    text: "Inheritance"
  },
  {
    challengeId: 21,
    correct: false,
    text: "Polymorphism"
  },
  
  // ASSIST Challenge 22 (Class definition)
  {
    challengeId: 22,
    correct: true,
    text: "make"
  },
  {
    challengeId: 22,
    correct: false,
    text: "model"
  },
  {
    challengeId: 22,
    correct: false,
    text: "color"
  },
  
  // INFO Challenge 23 (Proceed button)
  {
    challengeId: 23,
    correct: true,
    text: "Proceed"
  },
  
  // SELECT Challenge 24 (Class vs object)
  {
    challengeId: 24,
    correct: false,
    text: "Animal"
  },
  {
    challengeId: 24,
    correct: true,
    text: "my_dog 'Fido'"
  },
  {
    challengeId: 24,
    correct: false,
    text: "Pet"
  },
  {
    challengeId: 25,
    correct: true,
    text: `f"{self.make} {self.model}"`,
    
  },
  {
    challengeId: 25,
    correct: false,
    text: `"make model"`,
  
  },
  {
    challengeId: 25,
    correct: false,
    text: `self.make + self.model`,
    
  },
  { challengeId: 26, correct: true, text: "Proceed" },
  
  // SELECT Challenge 27
  { challengeId: 27, correct: false, text: "Only one" },
  { challengeId: 27, correct: true, text: "Unlimited" },
  { challengeId: 27, correct: false, text: "Maximum 10" },
  
  // ASSIST Challenge 28
  { challengeId: 28, correct: true, text: "my_book" },
  { challengeId: 28, correct: false, text: "Book" },
  { challengeId: 28, correct: false, text: "book_class" },
  
  // INFO Challenge 29
  { challengeId: 29, correct: true, text: "Proceed" },
  
  // SELECT Challenge 30
  { challengeId: 30, correct: true, text: "Student" },
  { challengeId: 30, correct: false, text: "s" },
  { challengeId: 30, correct: false, text: "()" }
      

    ]);

    ;
    console.log("Seeding finished");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to seed the database");
  }
};

main();

