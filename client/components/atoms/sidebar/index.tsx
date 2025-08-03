// components/atoms/SideBar.tsx
"use client";

import { Tab, Tabs } from "@nextui-org/react";
import React from "react";

type SideBarProps = {
  data?: string[];
  selected: string;
  onSelect: (key: string) => void;
};

function SideBar({ data, selected, onSelect }: SideBarProps) {
  return (
    <div className="bg-zinc-700 h-full w-full text-white">
      <p className="p-4 text-lg font-bold">CodeMeet</p>
      <Tabs
        aria-label="Sidebar"
        variant="underlined"
        color="primary"
        radius="none"
        placement="start"
        selectedKey={selected}
        onSelectionChange={(key:any) => onSelect(key.toString())}
        classNames={{
          tabList: "flex flex-col",
          cursor: "bg-white w-1",
          tabContent: "text-left",
        }}
      >
        {data?.map((item) => (
          <Tab key={item} title={item} />
        ))}
      </Tabs>
    </div>
  );
}

export default SideBar;
