"use client";

import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Info, ChevronRight, ChevronDown, Search, X } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

export default function CategoryTreeSelect({
  name,
  label,
  placeholder = "Select a category",
  is_required = false,
  helperText,
  tooltip,
  disabled = false,
  error: externalError,
  className = "",
  categories = [],
}) {
  const {
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  const value = watch(name) || "";
  const error = externalError || errors[name]?.message;

  const [isOpen, setIsOpen] = useState(false);
  const [breadcrumb, setBreadcrumb] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const currentOptions = breadcrumb.reduce((acc, cur) => {
    const found = acc?.find((item) => item.label === cur);
    return found?.children || [];
  }, categories);

  const displayOptions = searchQuery
    ? categories.filter((cat) =>
        cat.label.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : currentOptions;

  const handleSelect = (category) => {
    const selectedPath = [...breadcrumb, category.label];

    if (!category.children || category.children.length === 0) {
      const fullPath = selectedPath.join(" > ");
      setValue(name, fullPath, { shouldValidate: true });
      setIsOpen(false);
      setBreadcrumb([]);
      setSearchQuery("");
    } else {
      setBreadcrumb(selectedPath);
    }
  };

  const handleBreadcrumbClick = (index) => {
    setBreadcrumb(breadcrumb.slice(0, index));
  };

  const handleClear = (e) => {
    e.stopPropagation();
    setValue(name, "", { shouldValidate: true });
    setBreadcrumb([]);
    setSearchQuery("");
  };

  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <div className="flex items-center justify-between">
          <Label
            htmlFor={name}
            className={cn(
              error && "text-destructive",
              disabled && "opacity-50"
            )}
          >
            {label}
            {is_required && <span className="text-destructive ml-1">*</span>}
          </Label>
          {tooltip && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs max-w-xs">{tooltip}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      )}

      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <div className="relative">
            <Input
              id={name}
              value={value}
              placeholder={placeholder}
              readOnly
              disabled={disabled}
              className={cn(
                "cursor-pointer pr-8",
                error && "border-destructive",
                disabled && "opacity-50 cursor-not-allowed"
              )}
            />
            {value && !disabled && (
              <button
                type="button"
                onClick={handleClear}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </PopoverTrigger>

        <PopoverContent className="w-[400px] p-0" align="start">
          <div className="p-3 border-b">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-8 pl-8"
              />
            </div>
          </div>

          {breadcrumb.length > 0 && !searchQuery && (
            <div className="flex items-center gap-1 px-3 py-2 text-xs text-muted-foreground border-b bg-muted/50">
              <button
                onClick={handleReset}
                className="hover:text-foreground font-medium"
              >
                Home
              </button>
              {breadcrumb.map((crumb, index) => (
                <div key={index} className="flex items-center gap-1">
                  <ChevronRight className="h-3 w-3" />
                  <button
                    onClick={() => handleBreadcrumbClick(index)}
                    className="hover:text-foreground font-medium"
                  >
                    {crumb}
                  </button>
                </div>
              ))}
            </div>
          )}

          <ScrollArea className="h-[300px]">
            <div className="p-2">
              {displayOptions.length === 0 ? (
                <div className="text-center py-8 text-sm text-muted-foreground">
                  No categories found
                </div>
              ) : (
                <div className="space-y-1">
                  {displayOptions.map((category, index) => {
                    const hasChildren =
                      category.children && category.children.length > 0;
                    return (
                      <button
                        key={index}
                        onClick={() => handleSelect(category)}
                        className="w-full flex items-center justify-between px-3 py-2 text-sm rounded-md hover:bg-accent transition-colors text-left"
                      >
                        <span>{category.label}</span>
                        {hasChildren && (
                          <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </ScrollArea>
        </PopoverContent>
      </Popover>

      {helperText && !error && (
        <p className={cn("text-xs text-muted-foreground", disabled && "opacity-50")}>
          {helperText}
        </p>
      )}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );

  function handleReset() {
    setBreadcrumb([]);
    setSearchQuery("");
  }
}
