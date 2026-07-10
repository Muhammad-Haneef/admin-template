"use client";

import React, { useState } from "react";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bell, Search, Settings, Shield, User, HelpCircle, LogOut, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const NOTIFICATIONS = [
  {
    id: 1,
    title: "Database Backup Completed",
    description: "Weekly auto-backup finished successfully.",
    time: "5 minutes ago",
    unread: true,
  },
  {
    id: 2,
    title: "New User Registered",
    description: "Alex joined the system as Analyst.",
    time: "2 hours ago",
    unread: true,
  },
  {
    id: 3,
    title: "System Update Scheduled",
    description: "Maintenance window set for Sunday 02:00 AM.",
    time: "1 day ago",
    unread: false,
  },
];

export default function HeaderChunk() {
  const { isMobile } = useSidebar();
  const [unreadCount, setUnreadCount] = useState(2);

  const clearNotifications = () => {
    setUnreadCount(0);
  };

  return (
    <header className="h-16 w-full flex items-center justify-between px-4 border-b border-zinc-200 dark:border-zinc-800 bg-background/95 backdrop-blur-md sticky top-0 z-40">
      
      {/* Left side actions (Hamburger & Search) */}
      <div className="flex items-center gap-3 flex-1 max-w-md">
        <SidebarTrigger className="h-9 w-9 rounded-xl hover:bg-accent border border-input cursor-pointer shrink-0" />
        
        {/* Search bar chunk */}
        <div className="relative w-full hidden sm:block">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
            <Search className="size-4" />
          </span>
          <Input
            type="search"
            placeholder="Search resources, users or reports..."
            className="w-full h-9 pl-9 pr-4 rounded-xl border border-input bg-muted/30 focus-visible:bg-background transition-all outline-none"
          />
        </div>
      </div>

      {/* Right side actions (Notifications & Profile drop) */}
      <div className="flex items-center gap-3">
        
        {/* Notifications Popover */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="h-9 w-9 rounded-xl relative hover:bg-accent border border-input cursor-pointer shrink-0"
            >
              <Bell className="size-4 text-foreground" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[9px] font-bold text-destructive-foreground animate-pulse">
                  {unreadCount}
                </span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-0 w-80 shadow-lg border border-input rounded-2xl" align="end">
            <div className="flex items-center justify-between p-3 border-b border-input">
              <span className="font-semibold text-xs text-foreground">Notifications</span>
              {unreadCount > 0 && (
                <button
                  onClick={clearNotifications}
                  className="text-[10px] text-primary font-semibold hover:underline cursor-pointer"
                >
                  Mark all as read
                </button>
              )}
            </div>
            <div className="flex flex-col max-h-[300px] overflow-y-auto divide-y divide-zinc-100 dark:divide-zinc-800">
              {NOTIFICATIONS.map((notif) => (
                <div
                  key={notif.id}
                  className={cn(
                    "p-3.5 flex flex-col gap-1 hover:bg-accent/40 transition-colors",
                    notif.unread && unreadCount > 0 && "bg-primary/5"
                  )}
                >
                  <div className="flex justify-between items-start gap-2">
                    <span className="font-medium text-xs text-foreground leading-tight">{notif.title}</span>
                    {notif.unread && unreadCount > 0 && (
                      <span className="size-1.5 rounded-full bg-primary shrink-0 mt-1" />
                    )}
                  </div>
                  <span className="text-[10px] text-muted-foreground leading-relaxed">{notif.description}</span>
                  <span className="text-[9px] text-muted-foreground/75 mt-0.5">{notif.time}</span>
                </div>
              ))}
            </div>
          </PopoverContent>
        </Popover>

        {/* User Profile menu dropdown */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              className="h-9 gap-2 pl-2 pr-2.5 rounded-xl border border-transparent hover:border-input hover:bg-accent cursor-pointer shrink-0"
            >
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&fit=crop&auto=format&q=80"
                alt="Profile Avatar"
                className="size-6.5 rounded-full object-cover border border-zinc-200 dark:border-zinc-800 shadow-sm"
              />
              <span className="text-xs font-semibold text-foreground hidden md:inline">Jane Doe</span>
              <ChevronDown className="size-3.5 text-muted-foreground opacity-50 hidden md:block" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-1 w-52 shadow-lg border border-input rounded-2xl" align="end">
            <div className="flex flex-col gap-0.5 py-1 px-1.5 border-b border-input mb-1">
              <span className="font-semibold text-xs text-foreground">Jane Doe</span>
              <span className="text-[10px] text-muted-foreground">Super Administrator</span>
            </div>
            
            <div className="flex flex-col gap-0.5">
              <button className="w-full flex items-center gap-2.5 px-2.5 py-1.5 text-xs text-muted-foreground hover:text-foreground rounded-lg hover:bg-accent cursor-pointer text-left">
                <User className="size-4 shrink-0" /> My Profile
              </button>
              <button className="w-full flex items-center gap-2.5 px-2.5 py-1.5 text-xs text-muted-foreground hover:text-foreground rounded-lg hover:bg-accent cursor-pointer text-left">
                <Settings className="size-4 shrink-0" /> Portal Settings
              </button>
              <button className="w-full flex items-center gap-2.5 px-2.5 py-1.5 text-xs text-muted-foreground hover:text-foreground rounded-lg hover:bg-accent cursor-pointer text-left">
                <Shield className="size-4 shrink-0" /> Security Controls
              </button>
              <button className="w-full flex items-center gap-2.5 px-2.5 py-1.5 text-xs text-muted-foreground hover:text-foreground rounded-lg hover:bg-accent cursor-pointer text-left border-t border-zinc-100 dark:border-zinc-800 mt-1 pt-1.5">
                <LogOut className="size-4 shrink-0 text-destructive" /> Sign Out
              </button>
            </div>
          </PopoverContent>
        </Popover>

      </div>
    </header>
  );
}
