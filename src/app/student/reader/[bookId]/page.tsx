import { Suspense } from "react";
import { BookReader } from "@/components/reader/BookReader";
import { books } from "@/data/books";

export function generateStaticParams() {
  return books.map((b) => ({ bookId: b.id }));
}

async function ReaderRoute({ params }: { params: Promise<{ bookId: string }> }) {
  const { bookId } = await params;
  return <BookReader bookId={bookId} />;
}

export default function Page(props: PageProps<"/student/reader/[bookId]">) {
  return (
    <Suspense fallback={<div role="status" className="h-96 animate-pulse rounded-3xl border border-line bg-card" />}>
      <ReaderRoute params={props.params} />
    </Suspense>
  );
}
