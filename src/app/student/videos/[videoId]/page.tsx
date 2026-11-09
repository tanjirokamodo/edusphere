import { Suspense } from "react";
import { VideoWatch } from "@/components/videos/VideoWatch";
import { videos } from "@/data/videos";

export function generateStaticParams() {
  return videos.map((v) => ({ videoId: v.id }));
}

async function VideoRoute({ params }: { params: Promise<{ videoId: string }> }) {
  const { videoId } = await params;
  return <VideoWatch videoId={videoId} />;
}

export default function Page(props: PageProps<"/student/videos/[videoId]">) {
  return (
    <Suspense fallback={<div role="status" className="h-96 animate-pulse rounded-3xl border border-line bg-card" />}>
      <VideoRoute params={props.params} />
    </Suspense>
  );
}
