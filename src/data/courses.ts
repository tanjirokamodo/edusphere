import type { Course } from "@/types";

export const courses: Course[] = [
  { id: "c-math-79", title: "Numbers, Shapes and Patterns", subject: "Mathematics", grade: "Grade 3", instructor: "Smt. Padma Rao", lessons: 14, completedLessons: 9, hours: 8, level: "Beginner", tone: "teal", bands: ["7-9"] },
  { id: "c-sci-79", title: "Plants, Animals and Our Environment", subject: "Science", grade: "Grade 4", instructor: "Dr. Kavitha Menon", lessons: 16, completedLessons: 6, hours: 9, level: "Beginner", tone: "rose", bands: ["7-9"] },
  { id: "c-eng-79", title: "Reading Stories in English", subject: "Languages", grade: "Grade 4", instructor: "Ms. Grace Thomas", lessons: 12, completedLessons: 12, hours: 6, level: "Beginner", tone: "sky", bands: ["7-9"] },
  { id: "c-tel-79", title: "Telugu Varnamala and Simple Words", subject: "Languages", grade: "Grade 3", instructor: "Sri Murali Mohan", lessons: 15, completedLessons: 4, hours: 7, level: "Beginner", tone: "amber", bands: ["7-9"] },
  { id: "c-math-1012", title: "Fractions, Ratios and Early Algebra", subject: "Mathematics", grade: "Grade 5", instructor: "Smt. Padma Rao", lessons: 20, completedLessons: 8, hours: 14, level: "Intermediate", tone: "teal", bands: ["10-12"] },
  { id: "c-sci-1012", title: "Matter, Energy and Electric Circuits", subject: "Science", grade: "Grade 6", instructor: "Dr. Suresh Varma", lessons: 22, completedLessons: 11, hours: 16, level: "Intermediate", tone: "indigo", bands: ["10-12"] },
  { id: "c-soc-1012", title: "Our Earth and Early Civilisations", subject: "Social Studies", grade: "Grade 6", instructor: "Smt. Radha Krishnan", lessons: 18, completedLessons: 3, hours: 12, level: "Intermediate", tone: "sky", bands: ["10-12"] },
  { id: "c-cs-1012", title: "Coding with Scratch: Build Your First Game", subject: "Computer Science", grade: "Grade 7", instructor: "Sri Arjun Kumar", lessons: 16, completedLessons: 0, hours: 12, level: "Advanced", tone: "indigo", bands: ["10-12"] },
];
