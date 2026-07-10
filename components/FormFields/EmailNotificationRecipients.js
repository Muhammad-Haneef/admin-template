"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Icon } from "@iconify/react";
import * as Popover from "@radix-ui/react-popover";
import Modal from "@/components/Modal";
import TagInput from "@/components/FormFields/TagInput";
import Button from "@/components/Button";

const formatValue = (text) => {
  return text
    .toLowerCase()
    .replace(/'/g, "")        // remove apostrophes
    .replace(/[^a-z0-9]+/g, "_") // replace spaces & special chars with _
    .replace(/^_+|_+$/g, ""); // trim underscores
};

export default function EmailNotificationRecipients({
  label,
  value = [],
  onChange,
  error,
  clearError,
  module = "",
  users = [],
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeGroup, setActiveGroup] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [additionalEmails, setAdditionalEmails] = useState([]);
  const [emailErrors, setEmailErrors] = useState("");

  const selectedValues = Array.isArray(value) ? value : (value ? (typeof value === 'object' && value.value ? [value] : []) : []);

  const hierarchy = useMemo(() => {
    const baseGroups = {
      Leads: [
        { label: "Lead", options: ["Owner", "Creator", "Owner's Manager"] },
      ],
      Contacts: [
        { label: "Contact", options: ["Owner", "Creator", "Owner's Manager"] },
        { label: "Account", options: ["Owner", "Creator"] },
        { label: "Reporting To", options: ["Owner", "Creator"] },
      ],
      Accounts: [
        { label: "Account", options: ["Owner", "Creator", "Owner's Manager"] },
        { label: "Parent Account", options: ["Owner", "Creator"] },
      ],
      Deals: [
        { label: "Deal", options: ["Owner", "Creator", "Owner's Manager"] },
        { label: "Account", options: ["Owner", "Creator"] },
        { label: "Contact", options: ["Owner", "Creator"] },
      ],
      Tasks: [
        { label: "Task", options: ["Owner", "Creator", "Owner's Manager"] },
        { label: "Contact", options: ["Owner", "Creator"] },
        { label: "Lead", options: ["Owner", "Creator"] },
        { label: "Account", options: ["Owner", "Creator"] },
        { label: "Deal", options: ["Owner", "Creator"] },
      ],
      Meetings: [
        { label: "Meeting", options: ["Owner", "Creator", "Owner's Manager"] },
        { label: "Contact", options: ["Owner", "Creator"] },
        { label: "Lead", options: ["Owner", "Creator"] },
        { label: "Account", options: ["Owner", "Creator"] },
        { label: "Deal", options: ["Owner", "Creator"] },
      ],
      Calls: [
        { label: "Call", options: ["Owner", "Creator", "Owner's Manager"] },
        { label: "Contact", options: ["Owner", "Creator"] },
        { label: "Lead", options: ["Owner", "Creator"] },
        { label: "Account", options: ["Owner", "Creator"] },
        { label: "Deal", options: ["Owner", "Creator"] },
      ],
    };

    const normalizedModule = (module || "Leads").replace(/s$/, "");
    const matcher = Object.keys(baseGroups).find(k => k.replace(/s$/, "").toLowerCase() === normalizedModule.toLowerCase());
    const mod = matcher ? matcher : "Leads";

    return [...baseGroups[mod], { label: "Users", options: "USERS" }];
  }, [module]);

  useEffect(() => {
    if (isOpen) {
      if (hierarchy.length > 0) {
        // Find existing or reset to first
        if (!activeGroup || !hierarchy.find(h => h.label === activeGroup)) {
          setActiveGroup(hierarchy[0].label);
        }
      }
      setSearchQuery("");
    }
  }, [isOpen, hierarchy, activeGroup]);

  const activeOptions = useMemo(() => {
    const group = hierarchy.find((g) => g.label === activeGroup);
    if (!group) return [];

    let opts = group.options;

    if (group.label === "Users" || opts === "USERS") {
      opts = users.map((u) => ({ label: u.label, value: u.value, type: "user" }));
    } else {
      //opts = opts.map((o) => ({ label: o, value: (`${activeGroup}_${o}`).toLowerCase(), type: activeGroup.toLowerCase() }));
      opts = opts.map((o) => ({
        label: o,
        value: `${formatValue(activeGroup)}_${formatValue(o)}`, // ✅ FIXED
        type: formatValue(activeGroup),
      }));
    }

    if (searchQuery) {
      opts = opts.filter((o) => o.label.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    return opts;
  }, [hierarchy, activeGroup, searchQuery, users]);

  const handleSelect = (option) => {
    const isSelected = selectedValues.find((v) => v.value === option.value);
    let newValues;
    if (isSelected) {
      newValues = selectedValues.filter((v) => v.value !== option.value);
    } else {
      newValues = [...selectedValues, option];
    }
    onChange(newValues);
    if (clearError) clearError();
  };

  const handleRemove = (e, valToRemove) => {
    e.stopPropagation();
    onChange(selectedValues.filter((v) => v.value !== valToRemove.value));
  };

  const handleAddAdditionalEmails = () => {
    // Validate emails carefully
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const invalidEmails = additionalEmails.filter(email => !emailRegex.test(email));

    if (invalidEmails.length > 0) {
      setEmailErrors(`Invalid email(s): ${invalidEmails.join(", ")}`);
      return;
    }

    if (additionalEmails.length === 0) {
      setEmailErrors("Please enter at least one email.");
      return;
    }

    // Map emails to the uniform object format used by selectedValues
    const newOptions = additionalEmails.map(email => ({
      label: email,
      value: `email_${email}`,
      type: "email"
    }));

    // Filter duplicates
    const combined = [...selectedValues];
    newOptions.forEach(opt => {
      if (!combined.find(v => v.value === opt.value)) {
        combined.push(opt);
      }
    });

    onChange(combined);
    if (clearError) clearError();
    setIsModalOpen(false);
    setAdditionalEmails([]);
    setEmailErrors("");
  };

  return (
    <div className="w-full relative group">
      <Popover.Root open={isOpen} onOpenChange={setIsOpen}>
        <Popover.Trigger asChild>
          <div
            className={`relative border-b ${error ? "border-blue-500" : "border-gray-dark"
              } focus-within:border-primary transition-all pb-1 min-h-[36px] flex flex-wrap items-end gap-2 pr-10 ${selectedValues.length === 0 ? "cursor-text" : "cursor-pointer"
              }`}
          >
            {selectedValues.length === 0 && (
              <span className="text-gray-400 text-sm select-none">
                Choose Users, Groups, Roles etc.,
              </span>
            )}
            {selectedValues.map((val) => (
              <div
                key={val.value}
                className="flex items-center gap-1 bg-gray-100 border border-gray-200 rounded px-2 py-0.5 text-xs text-gray-700"
              >
                <span>{val.type}: {val.label}</span>
                <Icon
                  icon="mdi:close"
                  className="cursor-pointer hover:text-red-500"
                  onClick={(e) => handleRemove(e, val)}
                />
              </div>
            ))}
            <label
              className={`text-sm absolute left-0 text-gray-light cursor-text float-labels pointer-events-none transition-all ${error ? "text-red-500" : "peer-focus:text-primary"
                } ${selectedValues.length > 0 || isOpen
                  ? "text-xs -top-4 left-0"
                  : "text-sm top-1 focus:text-xs focus:-top-4"
                }`}
            >
              {label}
            </label>
            <div className="absolute inset-y-0 bottom-0 right-0 flex items-center pr-2 pointer-events-none mb-1">
              <Icon icon="mdi:account-search-outline" className="h-5 w-5 text-gray-600" />
            </div>
          </div>
        </Popover.Trigger>

        <Popover.Portal>
          <Popover.Content
            className="z-[100] w-[350px] sm:w-[400px] bg-white rounded-md shadow-xl border border-blue-300 overflow-hidden text-sm"
            align="start"
            sideOffset={4}
          >
            {/* Header: Select Group & Search */}
            <div className="flex border-b border-blue-300">
              <div className="w-[140px] border-r border-blue-300 relative bg-white">
                <select
                  value={activeGroup}
                  onChange={(e) => setActiveGroup(e.target.value)}
                  className="w-full h-full py-2 pl-3 pr-6 appearance-none outline-none text-sm text-gray-700 cursor-pointer bg-transparent relative z-10"
                >
                  {hierarchy.map((g) => (
                    <option key={g.label} value={g.label}>
                      {g.label}
                    </option>
                  ))}
                </select>
                <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                  <Icon icon="mdi:chevron-down" />
                </div>
              </div>
              <div className="flex-1 flex items-center px-1">
                <input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full p-2 outline-none text-sm text-gray-700 bg-transparent"
                  autoFocus
                />
              </div>
            </div>

            {/* Options List */}
            <div className="max-h-60 overflow-y-auto">
              {activeOptions.length === 0 ? (
                <div className="p-4 text-center text-gray-500 text-xs text-sm">No results found</div>
              ) : (
                <div className="py-2">
                  {activeOptions.map((opt) => {
                    const isSelected = selectedValues.some((v) => v.value === opt.value);
                    return (
                      <div
                        key={opt.value}
                        className={`flex items-center pl-8 pr-4 py-2 cursor-pointer hover:bg-gray-100 ${isSelected ? "bg-primary/5 text-primary" : "text-gray-700"
                          }`}
                        onClick={() => handleSelect(opt)}
                      >
                        <span className="flex-1 text-[13px]">{opt.label}</span>
                        {isSelected && <Icon icon="mdi:check" className="h-4 w-4" />}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer Text */}
            <div className="border-t border-gray-100">
              <div
                className="w-full text-left text-red-500 text-[13px] py-3 px-4 hover:bg-red-50 cursor-pointer transition-colors"
                onClick={() => {
                  setIsOpen(false);
                  setIsModalOpen(true);
                  setAdditionalEmails([]);
                  setEmailErrors("");
                }}
              >
                Add additional recipient
              </div>
            </div>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>

      <Modal isOpenModal={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-lg font-semibold mb-4 text-gray-800">Add Additional Recipients</h2>
        <div className="mb-4">
          <TagInput
            label="Email Addresses"
            placeholder="Enter email and press Enter"
            value={additionalEmails}
            onChange={(val) => {
              setAdditionalEmails(val);
              setEmailErrors("");
            }}
            error={emailErrors}
            clearError={() => setEmailErrors("")}
          />
          <p className="text-xs text-gray-500 mt-2">Type an email and press Enter to add it.</p>
        </div>
        <div className="flex justify-end gap-2 mt-6">
          <Button variant="outline" onClick={() => setIsModalOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleAddAdditionalEmails}>
            Add Recipients
          </Button>
        </div>
      </Modal>

      {error && <div className="text-[10px] text-red-500 mt-1">{error}</div>}
    </div>
  );
}
