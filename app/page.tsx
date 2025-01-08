"use client";

import { useCollectionStore } from "@/state/collection";
import { CollectionNode } from "./Collection";

export default function Home() {
  const { collection, format } = useCollectionStore();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-6 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start w-full">
        {collection && format && <CollectionNode data={collection[format]} />}
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}
