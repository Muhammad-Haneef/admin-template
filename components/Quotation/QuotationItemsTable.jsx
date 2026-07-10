"use client";

import React from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Plus, FolderPlus } from "lucide-react";
import QuotationItemRow from "./QuotationItemRow";
import ItemGroup from "./ItemGroup";

export default function QuotationItemsTable() {
  const { control } = useFormContext();
  
  const { fields, append, remove, move } = useFieldArray({
    control,
    name: "items"
  });

  const handleAddItem = (groupId = null) => {
    append({
      id: `item-${Date.now()}`,
      type: "item",
      groupId: groupId,
      name: "",
      sku: "",
      description: "",
      image: null,
      unit: "piece",
      quantity: 1,
      rate: 0,
      discountType: "percentage",
      discountValue: 0,
      taxRate: 0,
      taxAmount: 0,
      subtotal: 0,
      total: 0,
      sortOrder: fields.length
    });
  };

  const handleAddGroup = () => {
    const groupId = `group-${Date.now()}`;
    append({
      id: groupId,
      type: "group",
      name: "",
      description: "",
      image: null,
      collapsed: false,
      sortOrder: fields.length
    });
  };

  const handleDuplicateItem = (index) => {
    const item = fields[index];
    append({
      ...item,
      id: `item-${Date.now()}`,
      name: `${item.name} (Copy)`
    });
  };

  const handleDuplicateGroup = (groupId) => {
    const groupIndex = fields.findIndex(f => f.id === groupId);
    if (groupIndex >= 0) {
      const group = fields[groupIndex];
      const newGroupId = `group-${Date.now()}`;
      
      // Duplicate group
      append({
        ...group,
        id: newGroupId,
        name: `${group.name} (Copy)`
      });

      // Duplicate all items in the group
      fields.forEach((field, index) => {
        if (field.groupId === groupId && field.type === "item") {
          append({
            ...field,
            id: `item-${Date.now()}-${index}`,
            groupId: newGroupId
          });
        }
      });
    }
  };

  // Group items by their groupId
  const groupedItems = fields.reduce((acc, field, index) => {
    if (field.type === "group") {
      acc[field.id] = {
        group: field,
        groupIndex: index,
        items: []
      };
    }
    return acc;
  }, {});

  // Add items to their respective groups
  fields.forEach((field, index) => {
    if (field.type === "item" && field.groupId && groupedItems[field.groupId]) {
      groupedItems[field.groupId].items.push({ ...field, index });
    }
  });

  // Ungrouped items
  const ungroupedItems = fields
    .map((field, index) => ({ ...field, index }))
    .filter(field => field.type === "item" && !field.groupId);

  return (
    <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6 pb-3 border-b border-border">
        <h3 className="text-base font-semibold">Items / Services</h3>
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => handleAddItem()}
            className="text-xs"
          >
            <Plus className="w-3 h-3 mr-1" />
            Add Line
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleAddGroup}
            className="text-xs"
          >
            <FolderPlus className="w-3 h-3 mr-1" />
            Add Group
          </Button>
        </div>
      </div>

      {/* Empty State */}
      {fields.length === 0 && (
        <div className="text-center py-12 text-muted-foreground border-2 border-dashed border-border rounded-lg">
          <div className="flex flex-col items-center gap-3">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
              <Plus className="w-8 h-8" />
            </div>
            <div>
              <p className="text-base font-medium text-foreground mb-1">No items added yet</p>
              <p className="text-sm">Add line items or create groups to organize your quotation</p>
            </div>
            <div className="flex gap-2 mt-2">
              <Button
                type="button"
                variant="default"
                size="sm"
                onClick={() => handleAddItem()}
              >
                <Plus className="w-4 h-4 mr-1" />
                Add First Item
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleAddGroup}
              >
                <FolderPlus className="w-4 h-4 mr-1" />
                Create Group
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Render Items and Groups */}
      <div className="space-y-4">
        {/* Ungrouped Items */}
        {ungroupedItems.map((item, idx) => (
          <QuotationItemRow
            key={item.id}
            itemIndex={item.index}
            onRemove={() => remove(item.index)}
            onDuplicate={() => handleDuplicateItem(item.index)}
            isFirst={idx === 0 && Object.keys(groupedItems).length === 0}
          />
        ))}

        {/* Groups with their Items */}
        {Object.entries(groupedItems).map(([groupId, groupData]) => (
          <div key={groupId} className="space-y-3">
            <ItemGroup
              groupIndex={groupData.groupIndex}
              groupId={groupId}
              onRemove={() => {
                // Remove all items in the group first
                groupData.items.forEach((item) => {
                  remove(item.index);
                });
                // Then remove the group
                remove(groupData.groupIndex);
              }}
              onDuplicate={() => handleDuplicateGroup(groupId)}
            />

            {/* Items within this group */}
            <div className="ml-8 space-y-3">
              {groupData.items.map((item, idx) => (
                <QuotationItemRow
                  key={item.id}
                  itemIndex={item.index}
                  onRemove={() => remove(item.index)}
                  onDuplicate={() => handleDuplicateItem(item.index)}
                  isFirst={idx === 0}
                />
              ))}

              {/* Add item to this group */}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handleAddItem(groupId)}
                className="text-xs w-full border-dashed"
              >
                <Plus className="w-3 h-3 mr-1" />
                Add Item to Group
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Add More Items Footer */}
      {fields.length > 0 && (
        <div className="flex gap-2 mt-6 pt-4 border-t border-border">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => handleAddItem()}
            className="flex-1"
          >
            <Plus className="w-3 h-3 mr-1" />
            Add Another Line
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleAddGroup}
            className="flex-1"
          >
            <FolderPlus className="w-3 h-3 mr-1" />
            Add Another Group
          </Button>
        </div>
      )}
    </div>
  );
}
