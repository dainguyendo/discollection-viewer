"use client";

import { Input } from "@/components/ui/input";
import { Collection } from "./Collection";
import React, { ChangeEvent } from "react";

export default function Home() {
  const [data, set] = React.useState(null);

  const handleUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event?.target?.files?.[0] as File;
    const reader = new FileReader();

    reader.onload = async (e) => {
      const data = JSON.parse(e.target?.result as string);
      set(data);
    };

    reader.readAsText(file);
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Input type="file" accept=".json" onChange={handleUpload} />
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {data && <Collection data={data} />}
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}
