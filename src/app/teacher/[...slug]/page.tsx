import { Suspense } from "react";
import { PlannedPage } from "@/components/layout/PlannedPage";

export default function TeacherPlannedRoute() {
  return (
    <Suspense>
      <PlannedPage role="teacher" />
    </Suspense>
  );
}
