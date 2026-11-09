import { Suspense } from "react";
import { PlannedPage } from "@/components/layout/PlannedPage";

export default function StudentPlannedRoute() {
  return (
    <Suspense>
      <PlannedPage role="student" />
    </Suspense>
  );
}
