"use client";

import React from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import SidebarChunk from "./SidebarChunk";
import HeaderChunk from "./HeaderChunk";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function AdminLayout({ children }) {
  return (
    <TooltipProvider>
      <SidebarProvider defaultOpen={true}>
        <div className="flex min-h-screen w-full bg-zinc-50 dark:bg-zinc-950 font-sans text-foreground">
          {/* Collapsible sidebar */}
          <SidebarChunk />

          {/* Core content wrapper */}
          <div className="flex-1 flex flex-col min-w-0">
            {/* Top header navigation */}
            <HeaderChunk />

            {/* Main content body */}
            <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto w-full animate-in fade-in duration-300">
              {children}
            </main>

            {/* Simple footer */}
            <footer className="h-12 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between px-6 bg-background/50 text-[10px] text-muted-foreground mt-auto shrink-0 select-none">
              <span>&copy; {new Date().getFullYear()} AdminPortal Control Center</span>
              <div className="flex items-center gap-3">
                <a href="/terms" className="hover:text-foreground hover:underline">Terms</a>
                <span className="text-zinc-300 dark:text-zinc-800">•</span>
                <a href="/privacy" className="hover:text-foreground hover:underline">Privacy</a>
              </div>
            </footer>
          </div>
        </div>
      </SidebarProvider>
    </TooltipProvider>
  );
}
