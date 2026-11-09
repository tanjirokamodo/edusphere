import { Suspense } from "react";
import { PlannedPage } from "@/components/layout/PlannedPage";

export default function AdminPlannedRoute() {
  return (
    <Suspense>
      <PlannedPage role="admin" />
    </Suspense>
  );
}
