import { Suspense } from "react";
import { LabPage } from "@/components/labs/LabPage";
import { labs } from "@/data/labs";

export function generateStaticParams() {
  return labs.map((l) => ({ labId: l.id }));
}

async function LabRoute({ params }: { params: Promise<{ labId: string }> }) {
  const { labId } = await params;
  return <LabPage labId={labId} />;
}

export default function Page(props: PageProps<"/student/labs/[labId]">) {
  return (
    <Suspense fallback={<div role="status" className="h-96 animate-pulse rounded-3xl border border-line bg-card" />}>
      <LabRoute params={props.params} />
    </Suspense>
  );
}
