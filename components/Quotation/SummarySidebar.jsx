"use client";

import React, { useState } from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { NumberInput, SelectInput } from "@/components/FormElements";
import { Plus, X, Upload, Edit2 } from "lucide-react";
import { 
  calculateGrandTotal, 
  numberToWords, 
  formatCurrency,
  calculateTotalQuantity 
} from "@/lib/quotation-utils";
import Image from "next/image";

const discountTypeOptions = [
  { label: "%", value: "percentage" },
  { label: "Fixed", value: "fixed" }
];

const roundModeOptions = [
  { label: "No Rounding", value: "none" },
  { label: "Round Up", value: "up" },
  { label: "Round Down", value: "down" }
];

export default function SummarySidebar() {
  const { control, watch, setValue } = useFormContext();
  const [signatureFile, setSignatureFile] = useState(null);

  const { fields: chargeFields, append: appendCharge, remove: removeCharge } = useFieldArray({
    control,
    name: "additionalCharges"
  });

  const items = watch("items") || [];
  const currency = watch("currency") || "PKR";
  const overallDiscountType = watch("overallDiscountType") || "percentage";
  const overallDiscountValue = watch("overallDiscountValue") || 0;
  const additionalCharges = watch("additionalCharges") || [];
  const roundMode = watch("roundMode") || "none";
  const signature = watch("signature");

  // Calculate totals
  const totals = calculateGrandTotal({
    items,
    overallDiscountType,
    overallDiscountValue,
    additionalCharges,
    roundMode
  });

  const totalQuantity = calculateTotalQuantity(items);
  const totalInWords = numberToWords(totals.grandTotal, currency === "PKR" ? "Rupees" : currency);

  const handleAddCharge = () => {
    appendCharge({
      label: "",
      amount: 0
    });
  };

  const handleSignatureUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setValue("signature", reader.result);
        setSignatureFile(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveSignature = () => {
    setValue("signature", null);
    setSignatureFile(null);
  };

  return (
    <div className="sticky top-6 space-y-4">
      <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
        <h3 className="text-base font-semibold mb-4 pb-3 border-b border-border">
          Summary
        </h3>

        <div className="space-y-3">
          {/* Subtotal */}
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Subtotal:</span>
            <span className="font-medium">{formatCurrency(totals.subtotal, currency)}</span>
          </div>

          {/* Tax */}
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Total Tax:</span>
            <span className="font-medium">{formatCurrency(totals.totalTax, currency)}</span>
          </div>

          {/* Overall Discount */}
          <div className="border-t pt-3 space-y-2">
            <p className="text-xs font-medium text-muted-foreground">Overall Discount</p>
            <div className="grid grid-cols-2 gap-2">
              <SelectInput
                name="overallDiscountType"
                options={discountTypeOptions}
                placeholder="Type"
              />
              <NumberInput
                name="overallDiscountValue"
                placeholder="0"
                min={0}
                allowDecimal={true}
              />
            </div>
            {totals.overallDiscount > 0 && (
              <div className="flex justify-between text-sm text-destructive">
                <span>Discount:</span>
                <span>-{formatCurrency(totals.overallDiscount, currency)}</span>
              </div>
            )}
          </div>

          {/* Additional Charges */}
          <div className="border-t pt-3 space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium text-muted-foreground">Additional Charges</p>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleAddCharge}
                className="h-6 px-2 text-xs"
              >
                <Plus className="w-3 h-3" />
              </Button>
            </div>

            {chargeFields.map((field, index) => (
              <div key={field.id} className="flex gap-2">
                <input
                  type="text"
                  {...control.register(`additionalCharges.${index}.label`)}
                  placeholder="Label"
                  className="flex-1 px-2 py-1 border border-input rounded text-xs"
                />
                <input
                  type="number"
                  {...control.register(`additionalCharges.${index}.amount`, {
                    valueAsNumber: true
                  })}
                  placeholder="0"
                  className="w-20 px-2 py-1 border border-input rounded text-xs"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeCharge(index)}
                  className="h-7 w-7 text-destructive"
                >
                  <X className="w-3 h-3" />
                </Button>
              </div>
            ))}

            {totals.chargesTotal > 0 && (
              <div className="flex justify-between text-sm text-green-600">
                <span>Total Charges:</span>
                <span>+{formatCurrency(totals.chargesTotal, currency)}</span>
              </div>
            )}
          </div>

          {/* Rounding */}
          <div className="border-t pt-3">
            <SelectInput
              name="roundMode"
              label="Rounding"
              options={roundModeOptions}
            />
            {totals.roundingDifference !== 0 && (
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>Rounding Adjustment:</span>
                <span>
                  {totals.roundingDifference > 0 ? "+" : ""}
                  {formatCurrency(totals.roundingDifference, currency)}
                </span>
              </div>
            )}
          </div>

          {/* Total Quantity Summary */}
          {totalQuantity > 0 && (
            <div className="flex justify-between text-sm bg-muted/50 p-2 rounded">
              <span className="text-muted-foreground">Total Quantity:</span>
              <span className="font-medium">{totalQuantity}</span>
            </div>
          )}

          {/* Grand Total */}
          <div className="border-t-2 border-primary pt-3 mt-3">
            <div className="flex justify-between text-lg font-bold">
              <span>TOTAL:</span>
              <span className="text-primary">
                {formatCurrency(totals.grandTotal, currency)}
              </span>
            </div>
          </div>

          {/* Total in Words */}
          <div className="bg-muted/30 p-3 rounded text-xs text-muted-foreground italic">
            {totalInWords}
          </div>
        </div>
      </div>

      {/* Signature Section */}
      <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
        <h3 className="text-sm font-semibold mb-3">Signature</h3>
        
        {signature ? (
          <div className="space-y-2">
            <div className="border border-border rounded-lg p-2 bg-white">
              <Image
                src={signature}
                alt="Signature"
                width={200}
                height={80}
                className="object-contain w-full h-20"
              />
            </div>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => document.getElementById("signature-upload")?.click()}
                className="flex-1 text-xs"
              >
                <Edit2 className="w-3 h-3 mr-1" />
                Change
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleRemoveSignature}
                className="flex-1 text-xs text-destructive"
              >
                <X className="w-3 h-3 mr-1" />
                Remove
              </Button>
            </div>
          </div>
        ) : (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => document.getElementById("signature-upload")?.click()}
            className="w-full text-xs"
          >
            <Upload className="w-3 h-3 mr-1" />
            Upload Signature
          </Button>
        )}

        <input
          id="signature-upload"
          type="file"
          accept="image/*"
          onChange={handleSignatureUpload}
          className="hidden"
        />
      </div>
    </div>
  );
}
