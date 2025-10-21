"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

interface TabsProps {
  tabs: { value: string; label: string; content: React.ReactNode }[];
  defaultValue?: string;
  className?: string;
}

export function Tabs({ tabs, defaultValue, className }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultValue || tabs[0]?.value);

  return (
    <div className={cn("w-full", className)}>
      {/* Tabs Header */}
      <div className="flex justify-between h-10 items-center  rounded-md bg-muted p-1 text-muted-foreground">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={cn(
              "inline-flex items-center justify-center w-full whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              activeTab === tab.value
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tabs Content */}
      <div className="mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
        {tabs.map(
          (tab) =>
            activeTab === tab.value && (
              <div key={tab.value} className="p-2">
                {tab.content}
              </div>
            )
        )}
      </div>
    </div>
  );
}
