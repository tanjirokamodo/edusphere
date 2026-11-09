import type {
  ActivityItem,
  Assignment,
  ChartPoint,
  ScheduledClass,
  StatItem,
  Submission,
} from "@/types";

/* ---------- Student ---------- */
export const studentStats: StatItem[] = [
  { key: "stat.coursesInProgress", value: "5", delta: "+1 this month", trend: "up" },
  { key: "stat.studyHours", value: "12.5 h", delta: "+2.1 h vs last week", trend: "up" },
  { key: "stat.assignmentsDue", value: "3", delta: "1 due tomorrow", trend: "down" },
  { key: "stat.averageScore", value: "86%", delta: "+4% since mid-term", trend: "up" },
];

export const studyHoursByDay: ChartPoint[] = [
  { label: "Mon", hours: 1.5 },
  { label: "Tue", hours: 2.2 },
  { label: "Wed", hours: 1.0 },
  { label: "Thu", hours: 2.8 },
  { label: "Fri", hours: 1.7 },
  { label: "Sat", hours: 3.0 },
  { label: "Sun", hours: 0.3 },
];

export const studentAssignments: Assignment[] = [
  { id: "a1", title: "Ray diagrams for concave mirrors", course: "Physics", due: "Tomorrow, 5:00 PM", status: "Pending" },
  { id: "a2", title: "Trigonometric identities worksheet", course: "Mathematics", due: "Fri, 12 Nov", status: "Pending" },
  { id: "a3", title: "Mendel's pea plant experiment report", course: "Biology", due: "Mon, 15 Nov", status: "Pending" },
  { id: "a4", title: "Periodic table classification quiz", course: "Chemistry", due: "Submitted 2 Nov", status: "Submitted" },
];

/* ---------- Teacher ---------- */
export const teacherStats: StatItem[] = [
  { key: "stat.activeStudents", value: "186", delta: "+12 this term", trend: "up" },
  { key: "stat.coursesTeaching", value: "4", delta: "2 sections each" },
  { key: "stat.pendingReviews", value: "23", delta: "9 older than 3 days", trend: "down" },
  { key: "stat.classAverage", value: "78%", delta: "+3% vs last unit", trend: "up" },
];

export const classPerformance: ChartPoint[] = [
  { label: "Unit 1", average: 71, completion: 96 },
  { label: "Unit 2", average: 74, completion: 92 },
  { label: "Unit 3", average: 69, completion: 88 },
  { label: "Unit 4", average: 78, completion: 90 },
  { label: "Unit 5", average: 81, completion: 84 },
  { label: "Unit 6", average: 78, completion: 72 },
];

export const recentSubmissions: Submission[] = [
  { id: "s1", student: "Ananya Reddy", assignment: "Ray diagrams for concave mirrors", submitted: "2 hours ago", status: "Needs review" },
  { id: "s2", student: "Karthik Subramanian", assignment: "Ray diagrams for concave mirrors", submitted: "3 hours ago", status: "Needs review" },
  { id: "s3", student: "Fatima Sheikh", assignment: "Ohm's law lab report", submitted: "Yesterday", status: "Graded" },
  { id: "s4", student: "Rohit Chowdary", assignment: "Ohm's law lab report", submitted: "Yesterday", status: "Needs review" },
  { id: "s5", student: "Sneha Pillai", assignment: "Electric circuits quiz", submitted: "2 days ago", status: "Graded" },
];

export const todaysClasses: ScheduledClass[] = [
  { id: "t1", title: "Physics · Grade 10 B", time: "9:00 – 9:45 AM", room: "Science Block, Room 204" },
  { id: "t2", title: "Physics · Grade 10 A", time: "11:15 – 12:00 PM", room: "Science Block, Room 204" },
  { id: "t3", title: "Virtual Lab: Refraction", time: "2:00 – 2:45 PM", room: "Computer Lab 2" },
];

/* ---------- Admin ---------- */
export const adminStats: StatItem[] = [
  { key: "stat.totalStudents", value: "4,820", delta: "+6.2% this term", trend: "up" },
  { key: "stat.totalTeachers", value: "212", delta: "+9 new hires", trend: "up" },
  { key: "stat.activeCourses", value: "148", delta: "12 in draft" },
  { key: "stat.libraryTitles", value: "1,264", delta: "+38 this month", trend: "up" },
];

export const enrollmentTrend: ChartPoint[] = [
  { label: "Jun", students: 3120 },
  { label: "Jul", students: 3580 },
  { label: "Aug", students: 4010 },
  { label: "Sep", students: 4390 },
  { label: "Oct", students: 4640 },
  { label: "Nov", students: 4820 },
];

export const contentMix: ChartPoint[] = [
  { label: "E-books", count: 1264 },
  { label: "Videos", count: 842 },
  { label: "Simulations", count: 96 },
  { label: "Journals", count: 410 },
];

export const adminActivity: ActivityItem[] = [
  { id: "ac1", text: "Dr. Kavitha Menon published “Heredity: Mendel's Laws” (video)", time: "12 min ago" },
  { id: "ac2", text: "38 Telugu textbooks added to the Digital Library", time: "1 hour ago" },
  { id: "ac3", text: "Grade 9 batch import completed — 312 students enrolled", time: "3 hours ago" },
  { id: "ac4", text: "Sri Arjun Kumar requested approval for “Python Foundations”", time: "Yesterday" },
];
