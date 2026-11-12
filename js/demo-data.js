"use strict";

window.SMARTPREP_DATA = {
  demoUser: {
    name: "Nora Patel",
    email: "nora@example.com",
    loggedIn: true,
    onboardingCompleted: true,
    education: "B.Tech",
    year: "3",
    targetRole: "Software Developer",
    skills: ["Technical", "Communication"]
  },
  mentors: [
    {
      id: "maya-shah",
      name: "Maya Shah",
      specialization: "Frontend Engineering",
      experience_years: 8,
      rating: 4.9,
      skills: ["JavaScript", "React", "Accessibility"],
      bio: "Senior frontend engineer who helps early-career developers build strong UI fundamentals and prepare for practical interviews."
    },
    {
      id: "arjun-mehta",
      name: "Arjun Mehta",
      specialization: "Data Structures & Algorithms",
      experience_years: 6,
      rating: 4.8,
      skills: ["Algorithms", "Problem Solving", "Java"],
      bio: "Software engineer and patient problem-solving coach focused on clear reasoning, coding patterns, and interview confidence."
    },
    {
      id: "sana-khan",
      name: "Sana Khan",
      specialization: "Career & HR Interviews",
      experience_years: 10,
      rating: 5.0,
      skills: ["Behavioral Interviews", "Communication", "Career Planning"],
      bio: "Career mentor helping students turn their experience into concise, authentic interview stories and actionable career plans."
    },
    {
      id: "dev-rao",
      name: "Dev Rao",
      specialization: "Backend Engineering",
      experience_years: 5,
      rating: 4.7,
      skills: ["Node.js", "APIs", "System Design"],
      bio: "Backend developer who enjoys explaining APIs, databases, and foundational system-design concepts through real-world examples."
    }
  ],
  practiceQuestions: {
    Programming: [
      { question: "What is the difference between a compiler and an interpreter?", options: ["A compiler translates a program before execution; an interpreter evaluates it during execution", "They are identical", "An interpreter only checks spelling", "A compiler only runs on servers"], answer: "A compiler translates a program before execution; an interpreter evaluates it during execution", explanation: "Compilers commonly translate a program ahead of execution, while interpreters execute instructions through a runtime. Many modern languages use a mix of both approaches." },
      { question: "What is the purpose of a function?", options: ["To group reusable instructions that perform a task", "To store only images", "To stop a program permanently", "To replace every variable"], answer: "To group reusable instructions that perform a task", explanation: "Functions package behavior behind a name and can accept inputs and return results, which supports reuse and clearer organization." },
      { question: "What does a loop help a program do?", options: ["Repeat a block of instructions", "Encrypt every file", "Create a database automatically", "Declare a class only"], answer: "Repeat a block of instructions", explanation: "Loops repeat work while a condition holds or for each item in a collection." }
    ],
    DBMS: [
      { question: "What is a primary key?", options: ["A field that uniquely identifies each row in a table", "A duplicate row", "A database password", "A query that deletes all records"], answer: "A field that uniquely identifies each row in a table", explanation: "A primary key uniquely identifies each row and cannot contain duplicate or null values." },
      { question: "What does SQL mainly provide?", options: ["A language for defining and querying relational data", "A graphics format", "A CPU scheduling algorithm", "A network cable standard"], answer: "A language for defining and querying relational data", explanation: "SQL is commonly used to create, read, update, and manage data in relational database systems." },
      { question: "Why is normalization used in relational databases?", options: ["To reduce unnecessary duplication and improve data consistency", "To make every column contain the same value", "To remove all relationships", "To encrypt query results"], answer: "To reduce unnecessary duplication and improve data consistency", explanation: "Normalization organizes related data to reduce redundancy and the update anomalies it can cause." }
    ],
    OOP: [
      { question: "What is encapsulation in object-oriented programming?", options: ["Bundling data with methods and controlling access to internal state", "Running multiple programs at once", "Converting source code to machine code", "Storing every object in a global variable"], answer: "Bundling data with methods and controlling access to internal state", explanation: "Encapsulation groups state and behavior together and exposes a controlled interface." },
      { question: "What is inheritance used for?", options: ["Creating a type that can reuse or extend behavior from another type", "Sorting an array", "Encrypting a method", "Removing all class methods"], answer: "Creating a type that can reuse or extend behavior from another type", explanation: "Inheritance lets a derived class reuse and specialize behavior from a base class." },
      { question: "What does polymorphism allow?", options: ["Different types to respond to the same interface in their own way", "A program to contain only one class", "A variable to store no value", "A function to run only once"], answer: "Different types to respond to the same interface in their own way", explanation: "Polymorphism allows code to work through a shared interface while concrete implementations provide type-specific behavior." }
    ],
    "Operating Systems": [
      { question: "What is the main difference between a process and a thread?", options: ["A process has its own resources; threads within it share process resources", "A thread is a storage device", "Processes cannot execute programs", "They are always the same thing"], answer: "A process has its own resources; threads within it share process resources", explanation: "A process is an executing program with its own address space. Threads are execution paths within a process and share many of its resources." },
      { question: "What is a context switch?", options: ["Saving one task's state and restoring another task's state", "Deleting the operating system", "Changing a file extension", "Formatting a disk"], answer: "Saving one task's state and restoring another task's state", explanation: "The operating system switches CPU execution between tasks by saving and restoring their state." },
      { question: "What is virtual memory?", options: ["A memory-management technique that provides processes an address space beyond physical RAM", "A type of keyboard", "A CPU register", "A backup power supply"], answer: "A memory-management technique that provides processes an address space beyond physical RAM", explanation: "Virtual memory maps process address spaces to physical memory and storage, giving programs a managed abstraction of memory." }
    ],
    "Computer Networks": [
      { question: "What is the primary purpose of DNS?", options: ["Translating domain names into IP addresses", "Encrypting every network packet", "Assigning CPU time", "Storing website images"], answer: "Translating domain names into IP addresses", explanation: "DNS lets users access services by domain name while resolving those names to network addresses." },
      { question: "Which protocol is commonly used to securely browse websites?", options: ["HTTPS", "FTP", "Telnet", "SMTP"], answer: "HTTPS", explanation: "HTTPS uses TLS to protect HTTP traffic between a client and a web server." },
      { question: "What does a router do?", options: ["Forwards packets between networks", "Compiles source code", "Stores application passwords", "Renders web pages"], answer: "Forwards packets between networks", explanation: "Routers use network-layer addressing and routing information to forward packets toward their destinations." }
    ]
  }
};

window.getSmartPrepUser = function () {
  try {
    const savedUser = JSON.parse(localStorage.getItem("smartprepUser") || "null");
    return savedUser || { ...window.SMARTPREP_DATA.demoUser };
  } catch (error) {
    console.error("Could not read the saved SmartPrep profile:", error);
    return { ...window.SMARTPREP_DATA.demoUser };
  }
};
