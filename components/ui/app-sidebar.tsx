"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { useCollectionStore } from "@/state/collection";
import { ChangeEvent } from "react";
import { Input } from "./input";
import { Tabs, TabsList, TabsTrigger } from "./tabs";

export function AppSidebar() {
  const { set, setFormat, collection, format } = useCollectionStore();

  const handleUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event?.target?.files?.[0] as File;
    const reader = new FileReader();

    reader.onload = async (e) => {
      const data = JSON.parse(e.target?.result as string);
      set(data);

      event.target.value = "";
    };

    reader.readAsText(file);
  };

  const formats = collection ? Object.keys(collection) : false;

  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Upload</SidebarGroupLabel>
          <SidebarGroupContent>
            <Input type="file" accept=".json" onChange={handleUpload} />
          </SidebarGroupContent>
        </SidebarGroup>

        {formats && (
          <SidebarGroup>
            <SidebarGroupLabel>Formats</SidebarGroupLabel>
            <SidebarGroupContent>
              <Tabs
                value={String(format)}
                className="w-full"
                onValueChange={(value) => setFormat(Number(value))}
              >
                <TabsList className="w-full justify-evenly">
                  {formats.map((format) => (
                    <TabsTrigger key={format} value={format}>
                      {format} &quot;
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {collection && format && (
          <SidebarGroup>
            <SidebarGroupLabel>Overview</SidebarGroupLabel>
            <SidebarGroupContent>
              <CollectionOverviewTree data={collection[format]} />
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}

interface CollectionOverviewTreeProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  level?: number;
  parent?: string;
}

const CollectionOverviewTree = ({
  data,
  level = 1,
  parent = "",
}: CollectionOverviewTreeProps) => {
  return Object.entries(data).map(([key, node]) => {
    if (Array.isArray(node)) {
      const href = parent
        ? `${parent}-${key}`.toLocaleLowerCase()
        : key.toLocaleLowerCase();
      return (
        <div key={key + level} className={`px-${level + 1}`}>
          <a href={`#${href}`}>
            {key} ({node.length})
          </a>
        </div>
      );
    }

    return (
      <div key={key + level}>
        {key}
        <div className={`px-${level + 1}`}>
          <CollectionOverviewTree data={node} level={level + 1} parent={key} />
        </div>
        <div className={level === 1 ? "py-2" : ``}></div>
      </div>
    );
  });
};
