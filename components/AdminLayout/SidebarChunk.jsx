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
  Palette,
  UserCircle,
  FolderTree,
  CheckSquare,
  CheckCircle,
  Type,
  Hash,
  Lock,
  AlignLeft,
  ChevronDown,
  ListChecks,
  ToggleLeft,
  Radio,
  Calendar,
  CalendarRange,
  CalendarClock,
  KeyRound,
  Tag,
  SlidersHorizontal,
  Upload,
  Pipette,
  Phone,
  LayoutList,
  Image,
  Grid3X3,
  SwatchBook,
  UsersRound,
  Mail,
  Clock,
  CalendarDays,
  PenTool,
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
  {
    title: "Form Showcase",
    icon: Palette,
    url: "/form-showcase",
  },
  {
    title: "Avatar Upload",
    icon: UserCircle,
    url: "/avatar-showcase",
  },
  {
    title: "Category Tree",
    icon: FolderTree,
    url: "/category-tree-showcase",
  },
  {
    title: "Checkbox Cards",
    icon: CheckSquare,
    url: "/checkbox-cards-showcase",
  },
  {
    title: "Checkbox Input",
    icon: CheckCircle,
    url: "/checkbox-input-showcase",
  },
  {
    title: "Text Input",
    icon: Type,
    url: "/text-input-showcase",
  },
  {
    title: "Number Input",
    icon: Hash,
    url: "/number-input-showcase",
  },
  {
    title: "Password Input",
    icon: Lock,
    url: "/password-input-showcase",
  },
  {
    title: "Textarea Input",
    icon: AlignLeft,
    url: "/textarea-input-showcase",
  },
  {
    title: "Select Input",
    icon: ChevronDown,
    url: "/select-input-showcase",
  },
  {
    title: "Multi Select",
    icon: ListChecks,
    url: "/multi-select-input-showcase",
  },
  {
    title: "Radio Input",
    icon: Radio,
    url: "/radio-input-showcase",
  },
  {
    title: "Switch Input",
    icon: ToggleLeft,
    url: "/switch-input-showcase",
  },
  {
    title: "Radio Cards",
    icon: LayoutList,
    url: "/radio-cards-showcase",
  },
  {
    title: "Date Picker",
    icon: Calendar,
    url: "/date-picker-showcase",
  },
  {
    title: "Date Range",
    icon: CalendarRange,
    url: "/date-range-showcase",
  },
  {
    title: "DateTime Picker",
    icon: CalendarClock,
    url: "/date-time-picker-showcase",
  },
  {
    title: "OTP Input",
    icon: KeyRound,
    url: "/otp-input-showcase",
  },
  {
    title: "Tag Input",
    icon: Tag,
    url: "/tag-input-showcase",
  },
  {
    title: "Slider Input",
    icon: SlidersHorizontal,
    url: "/slider-input-showcase",
  },
  {
    title: "File Upload",
    icon: Upload,
    url: "/file-upload-showcase",
  },
  {
    title: "Color Picker",
    icon: Pipette,
    url: "/color-picker-showcase",
  },
  {
    title: "Color Swatch",
    icon: SwatchBook,
    url: "/color-swatch-showcase",
  },
  {
    title: "Phone Input",
    icon: Phone,
    url: "/phone-input-showcase",
  },
  {
    title: "Segmented Control",
    icon: LayoutList,
    url: "/segmented-control-showcase",
  },
  {
    title: "Image Upload",
    icon: Image,
    url: "/image-upload-showcase",
  },
  {
    title: "Multi Image Upload",
    icon: Grid3X3,
    url: "/multi-image-upload-showcase",
  },
  {
    title: "User Selector",
    icon: UsersRound,
    url: "/user-selector-showcase",
  },
  {
    title: "Icon Picker",
    icon: LayoutList,
    url: "/icon-picker-showcase",
  },
  {
    title: "Email Recipients",
    icon: Mail,
    url: "/email-recipients-showcase",
  },
  {
    title: "Week Timing",
    icon: Clock,
    url: "/week-timing-showcase",
  },
  {
    title: "Year Picker",
    icon: CalendarDays,
    url: "/year-picker-showcase",
  },
  {
    title: "Rich Text Editor",
    icon: PenTool,
    url: "/rich-text-editor-showcase",
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
