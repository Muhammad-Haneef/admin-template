"use client";

import React from "react";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  Users,
  Settings,
  ShieldCheck,
  FileText,
  BarChart3,
  HelpCircle,
  Bell,
  LogOut,
  Command,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAVIGATION_ITEMS = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    url: "/dashboard",
  },
  {
    title: "Analytics",
    icon: BarChart3,
    url: "/analytics",
  },
  {
    title: "Users Management",
    icon: Users,
    url: "/users",
  },
  {
    title: "Permissions",
    icon: ShieldCheck,
    url: "/permissions",
  },
  {
    title: "Reports & Logs",
    icon: FileText,
    url: "/reports",
  },
  {
    title: "System Settings",
    icon: Settings,
    url: "/settings",
  },
  {
    title: "Help & Support",
    icon: HelpCircle,
    url: "/support",
  },
];

export default function SidebarChunk() {
  const pathname = usePathname();
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <Sidebar collapsible="icon" className="border-r border-zinc-200 dark:border-zinc-800 bg-background/95 backdrop-blur-md">
      {/* Sidebar branding */}
      <SidebarHeader className="h-16 flex items-center justify-start px-4 border-b border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center gap-2.5 overflow-hidden">
          <div className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md shrink-0">
            <Command className="size-5" />
          </div>
          {!isCollapsed && (
            <div className="flex flex-col min-w-0">
              <span className="font-bold text-sm text-foreground truncate">AdminPortal</span>
              <span className="text-[10px] text-muted-foreground font-medium truncate">Control Center</span>
            </div>
          )}
        </div>
      </SidebarHeader>

      {/* Navigation list */}
      <SidebarContent className="py-4 px-2">
        <SidebarMenu className="gap-1">
          {NAVIGATION_ITEMS.map((item, idx) => {
            const isActive = pathname === item.url;
            return (
              <SidebarMenuItem key={idx}>
                <SidebarMenuButton
                  asChild
                  tooltip={item.title}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer select-none",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-md hover:bg-primary/95"
                      : "text-muted-foreground hover:bg-accent hover:text-foreground"
                  )}
                >
                  <a href={item.url} className="flex items-center gap-3 w-full">
                    <item.icon className={cn("size-4 shrink-0", isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground")} />
                    {!isCollapsed && <span className="truncate">{item.title}</span>}
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>

      {/* User info footer */}
      <SidebarFooter className="p-3 border-t border-zinc-200 dark:border-zinc-800 bg-muted/20">
        <div className={cn("flex items-center gap-3 overflow-hidden", isCollapsed ? "justify-center" : "px-1.5")}>
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&fit=crop&auto=format&q=80"
            alt="Profile Avatar"
            className="size-8 rounded-full object-cover border border-zinc-200 dark:border-zinc-800 shadow-sm shrink-0"
          />
          {!isCollapsed && (
            <div className="flex flex-col min-w-0 flex-1">
              <span className="font-semibold text-xs text-foreground truncate">Jane Doe</span>
              <span className="text-[10px] text-muted-foreground truncate">jane@company.com</span>
            </div>
          )}
          {!isCollapsed && (
            <button
              type="button"
              className="p-1 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors cursor-pointer"
            >
              <LogOut className="size-4" />
            </button>
          )}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
