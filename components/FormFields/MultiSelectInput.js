"use client";
import { Icon } from "@iconify/react";
import { useState, useRef, useEffect, useMemo } from "react";
import {
  useFloating,
  offset,
  flip,
  shift,
  size,
  autoUpdate,
  FloatingPortal,
  useDismiss,
  useInteractions,
  useClick,
} from "@floating-ui/react";

export default function MultiSelectInput({
  label,
  icon,
  error,
  helperText,
  tooltip,
  disabled,
  loading = false,
  placeholder = " ",
  options = [],
  value = [],
  onChange,
  id,
  clearError,
  name,
  onCreate,
  ...props
}) {
  
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const wrapperRef = useRef(null);
  const inputRef = useRef(null);
  const isFirstClick = useRef(true);

  // Floating UI setup with interactions
  const { refs, floatingStyles, context } = useFloating({
    placement: "bottom-start",
    middleware: [
      offset(6),
      flip(),
      shift(),
      size({
        apply({ rects, elements }) {
          Object.assign(elements.floating.style, {
            width: `${rects.reference.width}px`,
          });
        },
      }),
    ],
    whileElementsMounted: autoUpdate,
    open: isOpen,
    onOpenChange: setIsOpen,
  });

  // interactions: click (opens), dismiss (click outside / escape)
  const click = useClick(context, { enabled: !disabled && !loading });
  const dismiss = useDismiss(context);
  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
  ]);

  // Normalize selected values to strings for reliable comparisons
  const selectedValues = useMemo(
    () =>
      Array.isArray(value)
        ? value.map((v) => (v === null || v === undefined ? "" : String(v)))
        : [],
    [value]
  );

  // Memoize selected items (option objects) for chips rendering
  const selectedItems = useMemo(
    () =>
      (options || []).filter((opt) =>
        selectedValues.includes(opt?.value == null ? "" : String(opt.value))
      ),
    [options, selectedValues]
  );

  // Filter + sort options (exclude already selected)
  const filteredOptions = useMemo(() => {
    const lower = (searchTerm || "").toLowerCase();
    const list = (options || [])
      .filter((option) => {
        const label = (option?.label || "").toLowerCase();
        const val = option?.value == null ? "" : String(option.value);
        if (selectedValues.includes(val)) return false;
        if (!lower) return true;
        return label.includes(lower);
      })
      .sort((a, b) => {
        if (a?.disabled && !b?.disabled) return 1;
        if (!a?.disabled && b?.disabled) return -1;
        return 0;
      });
    return list;
  }, [options, searchTerm, selectedValues]);

  // Prevent page jump on input focus / dropdown open
  useEffect(() => {
    if (!isOpen) return;

    const html = document.documentElement;
    const prevScroll = html.style.scrollBehavior;
    html.style.scrollBehavior = "auto";

    const preventScroll = (e) => {
      // only prevent if caused by keyboard navigation in the floating list
      // keep it conservative to avoid blocking normal scroll
      e.preventDefault();
    };

    // add passive: false so preventDefault works if needed
    window.addEventListener("scroll", preventScroll, { passive: false });

    return () => {
      html.style.scrollBehavior = prevScroll;
      window.removeEventListener("scroll", preventScroll);
    };
  }, [isOpen]);

  // Focus first option when opened
  useEffect(() => {
    if (isOpen) {
      setFocusedIndex((prev) =>
        Math.min(Math.max(prev, 0), Math.max(filteredOptions.length - 1, 0))
      );
    } else {
      setFocusedIndex(-1);
    }
  }, [isOpen, filteredOptions.length]);

  // Ensure focused option is scrolled into view
  useEffect(() => {
    if (!refs.floating.current) return;
    if (focusedIndex < 0) return;
    // find only option nodes (skip potential helper/empty nodes)
    const nodes = Array.from(refs.floating.current.children).filter(
      (n) => n.getAttribute("role") === "option"
    );
    const node = nodes[focusedIndex];
    if (node) {
      node.scrollIntoView({ block: "nearest", inline: "nearest", behavior: "auto" });
    }
  }, [focusedIndex, refs.floating]);

  // Keyboard handling
  const handleKeyDown = (e) => {
    if (disabled || loading) return;

    const lastIndex = filteredOptions.length - 1;

    switch (e.key) {
      case "Enter":
        if (isOpen && focusedIndex >= 0 && filteredOptions[focusedIndex]) {
          e.preventDefault();
          handleSelect(filteredOptions[focusedIndex]);
        } else if (!isOpen) {
          e.preventDefault();
          setIsOpen(true);
        }
        break;
      case "ArrowDown":
        e.preventDefault();
        setIsOpen(true);
        setFocusedIndex((prev) => {
          if (lastIndex < 0) return -1;
          return prev < lastIndex ? prev + 1 : 0;
        });
        break;
      case "ArrowUp":
        e.preventDefault();
        setIsOpen(true);
        setFocusedIndex((prev) => {
          if (lastIndex < 0) return -1;
          return prev > 0 ? prev - 1 : lastIndex;
        });
        break;
      case "Backspace":
        if (searchTerm === "" && selectedValues.length > 0) {
          // remove last
          onChange(selectedValues.slice(0, -1));
          if (clearError) clearError();
        }
        break;
      case "Escape":
        setIsOpen(false);
        setFocusedIndex(-1);
        break;
      default:
        break;
    }
  };

  // Selecting an option (adds value)
  const handleSelect = (option) => {
    if (loading || disabled) return;
    const val = option?.value == null ? "" : String(option.value);
    // avoid duplicates (safety)
    if (selectedValues.includes(val)) {
      setSearchTerm("");
      inputRef.current?.focus({ preventScroll: true });
      return;
    }
    onChange([...selectedValues, val]);
    setSearchTerm("");
    setFocusedIndex(0);
    if (clearError) clearError();
    requestAnimationFrame(() => inputRef.current?.focus({ preventScroll: true }));
  };

  // Remove chip
  const handleRemove = (val, e) => {
    e.stopPropagation();
    if (loading || disabled) return;
    const sval = val == null ? "" : String(val);
    onChange(selectedValues.filter((v) => v !== sval));
    if (clearError) clearError();
  };

  const handleClear = () => {
    if (loading || disabled) return;
    onChange([]);
    setSearchTerm("");
    if (clearError) clearError();
  };

  // click on container opens input (but avoid opening when clicking chip remove)
  const handleContainerClick = (e) => {
    if (disabled || loading) return;
    // open and focus input
    setIsOpen(true);
    requestAnimationFrame(() => inputRef.current?.focus({ preventScroll: true }));
  };

  // Create options when no matches
  const handleCreate = () => {
    if (!onCreate || !searchTerm) return;
    onCreate(searchTerm);
    setIsOpen(false);
    setSearchTerm("");
  };

  return (
    <div>
      <div className="w-full relative group" ref={wrapperRef}>
        <div
          ref={refs.setReference}
          {...getReferenceProps({
            onClick: handleContainerClick,
          })}
          // container
          className={`relative border-b ${
            error ? "border-red-500" : "border-gray-dark"
          } focus-within:border-primary transition-all min-h-[28px] py-0.5 flex flex-wrap items-center gap-1 pr-12 ${
            selectedValues.length > 0 && icon ? "pl-10" : "pl-1"
          } ${disabled || loading ? "opacity-70" : ""}`}
        >
          {/* Icon */}
          {icon && (
            <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
              <Icon
                icon={icon}
                className={`h-5 w-5 ${error ? "text-red-500" : "text-gray-400"} group-focus-within:text-primary`}
              />
            </div>
          )}

          {/* Selected Chips */}
          {selectedItems.map((item) => (
            <div
              key={String(item.value)}
              className="flex items-center gap-2 bg-gray-100 rounded-full px-2 py-1 text-sm"
            >
              {item?.icon && item?.icon}
              <span className="truncate max-w-[200px]">{item.label}</span>
              {!loading && (
                <button
                  type="button"
                  onClick={(e) => handleRemove(item.value, e)}
                  className="text-gray-500 hover:text-red-500"
                  disabled={disabled || loading}
                >
                  <Icon icon="mdi:close" className="h-3 w-3" />
                </button>
              )}
            </div>
          ))}

          {/* Input area */}
          <div className={`flex-1 ${icon ? "pl-10" : "pl-2"}`}>
            <input
              ref={inputRef}
              type="text"
              value={searchTerm}
              onChange={(e) => {
                if (loading || disabled) return;
                setSearchTerm(e.target.value);
                setIsOpen(true);
                setFocusedIndex(0);
              }}
              onFocus={() => {
                if (disabled || loading) return;
                // open on focus except for the "initial click" scenario where click handler already opened
                if (!isFirstClick.current) {
                  setIsOpen(true);
                  setFocusedIndex(0);
                }
                isFirstClick.current = false;
                requestAnimationFrame(() => inputRef.current?.focus({ preventScroll: true }));
              }}
              onKeyDown={handleKeyDown}
              disabled={disabled || loading}
              placeholder={selectedValues.length === 0 ? placeholder : ""}
              className={`focus:outline-none bg-transparent w-full placeholder:text-gray-dark ${disabled || loading ? "cursor-not-allowed" : ""}`}
              aria-autocomplete="list"
              aria-haspopup="listbox"
              aria-expanded={isOpen}
              {...props}
            />
          </div>

          {/* Clear Button */}
          {!loading && selectedValues.length > 0 && !disabled ? (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleClear();
              }}
              className="absolute right-8 text-gray-400 hover:text-red-500"
              disabled={loading}
            >
              <Icon icon="mdi:close-circle" className="h-4 w-4" />
            </button>
          ) : null}

          {/* Chevron / Loading */}
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            {loading ? (
              <Icon icon="mdi:loading" className="h-5 w-5 animate-spin text-gray-400" />
            ) : (
              <Icon icon={isOpen ? "mdi:chevron-up" : "mdi:chevron-down"} className="h-5 w-5 text-gray-400" />
            )}
          </div>

          {/* Floating label */}
          <label
            className={`text-sm absolute left-0 text-gray-light cursor-text truncate max-w-[calc(100%-18px)] float-labels ${
              icon ? "left-10" : "left-0"
            } ${error ? "text-red-500" : "peer-focus:text-primary"} ${
              selectedValues.length > 0 || searchTerm || isOpen
                ? "text-xs -top-3.5 left-0"
                : "peer-placeholder-shown:text-sm peer-placeholder-shown:top-0 peer-focus:text-xs peer-focus:left-0 peer-focus:-top-3.5"
            } ${disabled || loading ? "cursor-not-allowed" : ""}`}
          >
            {label}
          </label>
        </div>

        {/* Floating Dropdown */}
        {isOpen && !disabled && !loading && (
          <FloatingPortal>
            <div
              ref={refs.setFloating}
              style={floatingStyles}
              {...getFloatingProps()}
              className="z-50 bg-white shadow-lg rounded-md py-1 max-h-60 overflow-auto"
              role="listbox"
              aria-labelledby={id || name}
            >
              {filteredOptions.length === 0 ? (
                <div className="px-3 py-2 text-gray-500 text-sm">
                  {onCreate && searchTerm ? (
                    <div
                      className="text-primary text-center cursor-pointer"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={handleCreate}
                    >
                      Create &quot;{searchTerm}&quot;
                    </div>
                  ) : (
                    "No options available"
                  )}
                </div>
              ) : (
                filteredOptions.map((option, idx) => (
                  <div
                    key={String(option?.value)}
                    role="option"
                    aria-selected={idx === focusedIndex}
                    aria-disabled={option.disabled || false}
                    className={`text-sm px-3 py-2 ${
                      option.disabled ? "text-gray-400 cursor-not-allowed" : "cursor-pointer hover:bg-primary/10 hover:text-primary"
                    } ${focusedIndex === idx ? "bg-primary/10 text-primary" : ""} flex items-center gap-2`}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => {
                      if (!option.disabled) handleSelect(option);
                    }}
                  >
                    {option?.icon && option?.icon}
                    <span className="truncate">{option.label}</span>
                  </div>
                ))
              )}
            </div>
          </FloatingPortal>
        )}

        {/* Helper / Error */}
        {helperText && !error && <div className="text-[10px] text-gray-500 mt-1">{helperText}</div>}
        {error && <div className="text-[10px] text-red-500 mt-1">{error}</div>}
      </div>
    </div>
  );
}
