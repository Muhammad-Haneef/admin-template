"use client";

import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { 
  GripVertical, Copy, Trash2, ChevronDown, ChevronUp, 
  FileImage, AlignLeft 
} from "lucide-react";
import { TextInput, NumberInput, SelectInput, RichTextEditor, FileUpload } from "@/components/FormElements";
import { calculateItemTotal, formatCurrency } from "@/lib/quotation-utils";

const unitOptions = [
  { label: "Piece", value: "piece" },
  { label: "Box", value: "box" },
  { label: "Kg", value: "kg" },
  { label: "Liter", value: "liter" },
  { label: "Meter", value: "meter" },
  { label: "Hour", value: "hour" },
  { label: "Day", value: "day" }
];

const discountTypeOptions = [
  { label: "%", value: "percentage" },
  { label: "Fixed", value: "fixed" }
];

export default function QuotationItemRow({ 
  itemIndex, 
  onRemove, 
  onDuplicate,
  isFirst = false 
}) {
  const { watch, setValue } = useFormContext();
  const [showDescription, setShowDescription] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const item = watch(`items.${itemIndex}`);
  const currency = watch("currency") || "PKR";

  // Calculate totals
  const totals = calculateItemTotal({
    quantity: item?.quantity || 0,
    rate: item?.rate || 0,
    discountType: item?.discountType || "percentage",
    discountValue: item?.discountValue || 0,
    taxRate: item?.taxRate || 0
  });

  // Auto-update calculated fields
  React.useEffect(() => {
    setValue(`items.${itemIndex}.subtotal`, totals.amountAfterDiscount);
    setValue(`items.${itemIndex}.taxAmount`, totals.taxAmount);
    setValue(`items.${itemIndex}.total`, totals.total);
  }, [totals, itemIndex, setValue]);

  if (isCollapsed) {
    return (
      <div className="bg-muted/50 p-3 rounded-lg border border-border flex items-center justify-between">
        <div className="flex items-center gap-3 flex-1">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed(false)}
            className="h-8 w-8"
          >
            <ChevronDown className="w-4 h-4" />
          </Button>
          <span className="font-medium">{item?.name || "Untitled Item"}</span>
          <span className="text-sm text-muted-foreground">
            {item?.quantity || 0} × {formatCurrency(item?.rate || 0, currency)}
          </span>
        </div>
        <span className="font-semibold">{formatCurrency(totals.total, currency)}</span>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg p-4 space-y-4 hover:shadow-md transition-shadow">
      {/* Row Header with Drag Handle */}
      <div className="flex items-start gap-3">
        {/* Drag Handle */}
        <button
          type="button"
          className="cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground mt-2"
        >
          <GripVertical className="w-4 h-4" />
        </button>

        {/* Main Fields Grid */}
        <div className="flex-1 grid grid-cols-12 gap-3">
          {/* Item Name - Col Span 4 */}
          <div className="col-span-12 md:col-span-4">
            <TextInput
              name={`items.${itemIndex}.name`}
              placeholder="Item name"
              label={isFirst ? "Item Name" : ""}
            />
          </div>

          {/* SKU - Col Span 2 */}
          <div className="col-span-6 md:col-span-2">
            <TextInput
              name={`items.${itemIndex}.sku`}
              placeholder="SKU"
              label={isFirst ? "SKU" : ""}
            />
          </div>

          {/* Unit - Col Span 2 */}
          <div className="col-span-6 md:col-span-2">
            <SelectInput
              name={`items.${itemIndex}.unit`}
              placeholder="Unit"
              options={unitOptions}
              label={isFirst ? "Unit" : ""}
            />
          </div>

          {/* Quantity - Col Span 1 */}
          <div className="col-span-4 md:col-span-1">
            <NumberInput
              name={`items.${itemIndex}.quantity`}
              placeholder="Qty"
              min={1}
              allowDecimal={false}
              label={isFirst ? "Qty" : ""}
            />
          </div>

          {/* Rate - Col Span 2 */}
          <div className="col-span-4 md:col-span-2">
            <NumberInput
              name={`items.${itemIndex}.rate`}
              placeholder="Rate"
              min={0}
              allowDecimal={true}
              label={isFirst ? "Rate" : ""}
            />
          </div>

          {/* Amount - Col Span 1 */}
          <div className="col-span-4 md:col-span-1">
            <NumberInput
              value={totals.lineAmount}
              disabled={true}
              label={isFirst ? "Amount" : ""}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-1">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed(true)}
            className="h-8 w-8"
          >
            <ChevronUp className="w-4 h-4" />
          </Button>
          
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={onDuplicate}
            className="h-8 w-8"
          >
            <Copy className="w-4 h-4" />
          </Button>
          
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={onRemove}
            className="h-8 w-8 text-destructive hover:text-destructive"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Discount and Tax Row */}
      <div className="grid grid-cols-12 gap-3 pl-7">
        {/* Discount Type */}
        <div className="col-span-6 md:col-span-2">
          <SelectInput
            name={`items.${itemIndex}.discountType`}
            placeholder="Type"
            options={discountTypeOptions}
            label="Discount Type"
          />
        </div>

        {/* Discount Value */}
        <div className="col-span-6 md:col-span-2">
          <NumberInput
            name={`items.${itemIndex}.discountValue`}
            placeholder="0"
            min={0}
            allowDecimal={true}
            label="Discount Value"
          />
        </div>

        {/* Tax Rate */}
        <div className="col-span-6 md:col-span-2">
          <NumberInput
            name={`items.${itemIndex}.taxRate`}
            placeholder="Tax %"
            min={0}
            max={100}
            allowDecimal={true}
            label="Tax Rate %"
          />
        </div>

        {/* Tax Amount */}
        <div className="col-span-6 md:col-span-2">
          <NumberInput
            value={totals.taxAmount}
            disabled={true}
            label="Tax Amount"
          />
        </div>

        {/* Total */}
        <div className="col-span-12 md:col-span-2">
          <NumberInput
            value={totals.total}
            disabled={true}
            label="Total"
            className="font-semibold"
          />
        </div>
      </div>

      {/* Toggle Buttons for Description & Image */}
      <div className="flex gap-2 pl-7">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setShowDescription(!showDescription)}
          className="text-xs"
        >
          <AlignLeft className="w-3 h-3 mr-1" />
          {showDescription ? "Hide" : "Add"} Description
        </Button>
        
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setShowImage(!showImage)}
          className="text-xs"
        >
          <FileImage className="w-3 h-3 mr-1" />
          {showImage ? "Hide" : "Add"} Image
        </Button>
      </div>

      {/* Description Editor */}
      {showDescription && (
        <div className="pl-7 animate-in slide-in-from-top-2 duration-200">
          <RichTextEditor
            name={`items.${itemIndex}.description`}
            placeholder="Enter detailed item description..."
            height={150}
          />
        </div>
      )}

      {/* Image Upload */}
      {showImage && (
        <div className="pl-7 animate-in slide-in-from-top-2 duration-200">
          <FileUpload
            name={`items.${itemIndex}.image`}
            accept="image/*"
            maxFiles={1}
            label="Item Image"
          />
        </div>
      )}

      {/* Calculated Summary for this row */}
      <div className="pl-7 pt-2 border-t border-border text-xs text-muted-foreground flex justify-between">
        <div className="space-x-4">
          <span>Line: {formatCurrency(totals.lineAmount, currency)}</span>
          {totals.discountAmount > 0 && (
            <span>Discount: -{formatCurrency(totals.discountAmount, currency)}</span>
          )}
          <span>After Discount: {formatCurrency(totals.amountAfterDiscount, currency)}</span>
          {totals.taxAmount > 0 && (
            <span>Tax: +{formatCurrency(totals.taxAmount, currency)}</span>
          )}
        </div>
        <span className="font-semibold text-foreground">
          Row Total: {formatCurrency(totals.total, currency)}
        </span>
      </div>
    </div>
  );
}
