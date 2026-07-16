"use client";

import { useState } from "react";
import { useForm, FormProvider, Controller, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Plus,
  Trash2,
  Lock,
  Calculator,
} from "lucide-react";

import {
  TextInput,
  NumberInput,
  SelectInput,
  CheckboxInput,
  RadioInput,
  SwitchInput,
  TextareaInput,
  TagInput,
  MultiImageUpload,
} from "@/components/FormElements";

/* ------------------------------------------------------------------ */
/* Static option lists (replace with real API data)                   */
/* ------------------------------------------------------------------ */

const CATEGORY_OPTIONS = [
  { label: "Raw Materials", value: "raw-materials" },
  { label: "Finished Goods", value: "finished-goods" },
  { label: "Packaging", value: "packaging" },
  { label: "Electronics", value: "electronics" },
  { label: "Apparel", value: "apparel" },
];

const UNIT_OPTIONS = [
  { label: "Pieces (Pcs)", value: "pcs" },
  { label: "Kilogram (kg)", value: "kg" },
  { label: "Litre (L)", value: "l" },
  { label: "Box", value: "box" },
  { label: "Dozen", value: "dozen" },
  { label: "Meter (m)", value: "m" },
];

const LEDGER_OPTIONS = [
  { label: "Cost of Goods Sold", value: "cogs" },
  { label: "Direct Expenses", value: "direct-expenses" },
  { label: "Sales Revenue", value: "sales-revenue" },
  { label: "Inventory Asset", value: "inventory-asset" },
];

const CURRENCY_OPTIONS = [
  { id: "PKR", title: "Pakistani Rupee (PKR, PKRs)" },
  { id: "USD", title: "US Dollar (USD, $)" },
  { id: "AED", title: "UAE Dirham (AED, د.إ)" },
  { id: "SAR", title: "Saudi Riyal (SAR, ر.س)" },
];

const WAREHOUSE_OPTIONS = [
  { id: "wh-khi", title: "Main Warehouse - Karachi" },
  { id: "wh-lhr", title: "North Warehouse - Lahore" },
  { id: "wh-isb", title: "Retail Store - Islamabad" },
];

const TRACKING_METHOD_OPTIONS = [
  { id: "none", title: "None" },
  { id: "batchwise", title: "Batchwise", disabled: true, icon: <Lock className="h-3 w-3 text-muted-foreground" /> },
  { id: "serial", title: "Serial No.", disabled: true, icon: <Lock className="h-3 w-3 text-muted-foreground" /> },
  { id: "batch-serial", title: "Batch + Serial No.", disabled: true, icon: <Lock className="h-3 w-3 text-muted-foreground" /> },
];

const DECIMAL_OPTIONS = [
  { label: "0 (1234)", value: "0" },
  { label: "2 (1234.00)", value: "2" },
  { label: "3 (1234.000)", value: "3" },
];

const SEPARATOR_OPTIONS = [
  { label: "Comma (1,234.00)", value: "comma" },
  { label: "Space (1 234.00)", value: "space" },
  { label: "None (1234.00)", value: "none" },
];

const SYMBOL_POSITION_OPTIONS = [
  { label: "Before amount (Rs. 1,234)", value: "before" },
  { label: "After amount (1,234 Rs.)", value: "after" },
];

/* ------------------------------------------------------------------ */
/* Validation schema                                                   */
/* ------------------------------------------------------------------ */

const itemSchema = z.object({
  itemType: z.string().default("product"),
  category: z.string().optional(),
  sellableToCustomers: z.boolean().optional(),
  manageStock: z.boolean().optional(),
  itemImages: z.array(z.any()).optional(),
  itemOriginalImages: z.array(z.any()).optional(),
  itemName: z.string().min(2, "Item name must be at least 2 characters"),
  skuId: z.string().optional(),
  unit: z.string().optional(),

  description: z.string().optional(),
  tags: z.array(z.string()).optional(),
  vendorName: z.string().optional(),
  vendorCode: z.string().optional(),
  dimLength: z.string().optional(),
  dimWidth: z.string().optional(),
  dimHeight: z.string().optional(),
  weightValue: z.string().optional(),
  customFields: z
    .array(z.object({ key: z.string().optional(), value: z.string().optional() }))
    .optional(),

  purchaseLedger: z.string().optional(),
  salesLedger: z.string().optional(),
  inventoryLedger: z.string().optional(),

  currency: z.string().default("PKR"),
  currencyFormat: z
    .object({ decimalPlaces: z.string(), separator: z.string(), symbolPosition: z.string() })
    .optional(),
  buyingPrice: z.string().optional(),
  sellingPrice: z.string().optional(),
  landedCost: z.string().optional(),
  taxRate: z.string().optional(),
  priceInclusiveOfTaxes: z.boolean().optional(),

  strictControl: z.boolean().optional(),
  initialStock: z.string().optional(),
  trackingMethod: z.string().default("none"),
  warehouseStock: z
    .array(
      z.object({
        warehouse: z.string().min(1, "Warehouse is required"),
        stock: z.string().optional(),
      })
    )
    .optional(),

  reorderPoint: z.string().optional(),
  overstockPoint: z.string().optional(),
  warehouseReorder: z
    .array(
      z.object({
        warehouse: z.string().min(1, "Warehouse is required"),
        reorderPoint: z.string().optional(),
        overstockPoint: z.string().optional(),
      })
    )
    .optional(),
});

const defaultValues = {
  itemType: "product",
  category: "",
  sellableToCustomers: false,
  manageStock: false,
  itemImages: [],
  itemOriginalImages: [],
  itemName: "",
  skuId: `${Date.now()}`,
  unit: "",

  description: "",
  tags: [],
  vendorName: "",
  vendorCode: "",
  dimLength: "",
  dimWidth: "",
  dimHeight: "",
  weightValue: "",
  customFields: [],

  purchaseLedger: "",
  salesLedger: "",
  inventoryLedger: "",

  currency: "PKR",
  currencyFormat: { decimalPlaces: "2", separator: "comma", symbolPosition: "before" },
  buyingPrice: "",
  sellingPrice: "",
  landedCost: "",
  taxRate: "",
  priceInclusiveOfTaxes: false,

  strictControl: false,
  initialStock: "",
  trackingMethod: "none",
  warehouseStock: [{ warehouse: "", stock: "0" }],

  reorderPoint: "2",
  overstockPoint: "5",
  warehouseReorder: [{ warehouse: "", reorderPoint: "2", overstockPoint: "5" }],
};

/* ------------------------------------------------------------------ */
/* Small building blocks                                               */
/* ------------------------------------------------------------------ */

function Section({ number, title, defaultOpen = true, children }) {
  return (
    <Accordion
      type="single"
      collapsible
      defaultValue={defaultOpen ? "section" : undefined}
      className="rounded-xl bg-card ring-1 ring-foreground/10 overflow-hidden"
    >
      <AccordionItem value="section" className="border-b-0">
        <AccordionTrigger className="px-4 py-4 text-base font-bold hover:no-underline">
          {number}. {title}
        </AccordionTrigger>
        <AccordionContent className="px-4">
          <div className="flex flex-col gap-5 pb-1">{children}</div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

function ToggleAddLink({ label, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline cursor-pointer"
    >
      <Plus className={active ? "h-3.5 w-3.5 rotate-45 transition-transform" : "h-3.5 w-3.5 transition-transform"} />
      {label}
    </button>
  );
}

function CurrencyFormatControl({ name }) {
  return (
    <Controller
      name={name}
      render={({ field }) => {
        const val = field.value || { decimalPlaces: "2", separator: "comma", symbolPosition: "before" };
        const update = (patch) => field.onChange({ ...val, ...patch });
        return (
          <div className="w-full flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Currency Formatting
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full h-9 justify-center gap-2 font-normal text-sm"
                >
                  <Calculator className="h-3.5 w-3.5 text-muted-foreground" />
                  Number and Currency Format
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-72 flex flex-col gap-3" align="start">
                <SelectInput
                  label="Decimal Places"
                  options={DECIMAL_OPTIONS}
                  value={val.decimalPlaces}
                  onChange={(v) => update({ decimalPlaces: v })}
                  searchable={false}
                  clearable={false}
                />
                <SelectInput
                  label="Thousands Separator"
                  options={SEPARATOR_OPTIONS}
                  value={val.separator}
                  onChange={(v) => update({ separator: v })}
                  searchable={false}
                  clearable={false}
                />
                <SelectInput
                  label="Symbol Position"
                  options={SYMBOL_POSITION_OPTIONS}
                  value={val.symbolPosition}
                  onChange={(v) => update({ symbolPosition: v })}
                  searchable={false}
                  clearable={false}
                />
              </PopoverContent>
            </Popover>
          </div>
        );
      }}
    />
  );
}

/* ------------------------------------------------------------------ */
/* Main page                                                           */
/* ------------------------------------------------------------------ */

export default function AddItemPage() {
  const methods = useForm({
    resolver: zodResolver(itemSchema),
    defaultValues,
    mode: "onBlur",
  });
  const { control, handleSubmit, watch } = methods;

  const [showDescription, setShowDescription] = useState(false);
  const [showTags, setShowTags] = useState(false);
  const [showVendor, setShowVendor] = useState(false);
  const [showDimensions, setShowDimensions] = useState(false);
  const [showWeights, setShowWeights] = useState(false);

  const warehouseStockArray = useFieldArray({ control, name: "warehouseStock" });
  const warehouseReorderArray = useFieldArray({ control, name: "warehouseReorder" });
  const customFieldsArray = useFieldArray({ control, name: "customFields" });

  const onSubmit = (data) => {
    console.log("Item payload:", data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-3xl mx-auto p-6 flex flex-col gap-5">
        <h1 className="text-xl font-bold">Add Item</h1>

        {/* 1. Item / Product Details -------------------------------------------------- */}
        <Section number={1} title="Item/Product Details">
          <RadioInput
            name="itemType"
            label="Item Type"
            orientation="horizontal"
            options={[
              { label: "Product", value: "product" },
              { label: "Service", value: "service" },
            ]}
          />

          <SelectInput
            name="category"
            label="Category"
            placeholder="Select a Category"
            options={CATEGORY_OPTIONS}
          />

          <div className="flex flex-col gap-4">
            <CheckboxInput
              name="sellableToCustomers"
              label="This item can be sold to customers"
              helperText="Enable this for items that can be sold to external customers or clients."
            />
            <CheckboxInput
              name="manageStock"
              label="Manage Stock"
              helperText="Track inventory levels for this item"
            />
          </div>

          <MultiImageUpload
            name="itemImages"
            label="Item Images"
            maxImages={6}
            gridCols={4}
          />

          <MultiImageUpload
            name="itemOriginalImages"
            label="Item Original Images"
            maxImages={6}
            gridCols={4}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <TextInput
              name="itemName"
              label="Item Name"
              is_required
              placeholder="Enter name of your item"
            />
            <TextInput name="skuId" label="SKU ID" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <SelectInput
              name="unit"
              label="Unit"
              placeholder="Select a quantity unit"
              options={UNIT_OPTIONS}
            />
          </div>

          {/* Expandable extra fields */}
          <div className="flex flex-wrap gap-4 pt-1">
            <ToggleAddLink label="Add Description" active={showDescription} onClick={() => setShowDescription((s) => !s)} />
            <ToggleAddLink label="Add Tags" active={showTags} onClick={() => setShowTags((s) => !s)} />
            <ToggleAddLink label="Add Vendor Details" active={showVendor} onClick={() => setShowVendor((s) => !s)} />
            <ToggleAddLink label="Add Dimensions" active={showDimensions} onClick={() => setShowDimensions((s) => !s)} />
            <ToggleAddLink label="Add Weights" active={showWeights} onClick={() => setShowWeights((s) => !s)} />
          </div>

          {showDescription && <TextareaInput name="description" label="Description" placeholder="Write a short description..." rows={3} />}

          {showTags && <TagInput name="tags" label="Tags" placeholder="Type and press Enter to add tag..." />}

          {showVendor && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <TextInput name="vendorName" label="Vendor Name" placeholder="e.g. Al-Karam Textiles" />
              <TextInput name="vendorCode" label="Vendor Code" placeholder="e.g. VEN-0042" />
            </div>
          )}

          {showDimensions && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <NumberInput name="dimLength" label="Length" allowDecimal dropdownOptions={["cm", "in"]} dropdownValue="cm" />
              <NumberInput name="dimWidth" label="Width" allowDecimal dropdownOptions={["cm", "in"]} dropdownValue="cm" />
              <NumberInput name="dimHeight" label="Height" allowDecimal dropdownOptions={["cm", "in"]} dropdownValue="cm" />
            </div>
          )}

          {showWeights && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <NumberInput name="weightValue" label="Weight" allowDecimal dropdownOptions={["kg", "lb"]} dropdownValue="kg" />
            </div>
          )}

          <div className="pt-1">
            <ToggleAddLink
              label="Add Custom Fields"
              active={customFieldsArray.fields.length > 0}
              onClick={() => customFieldsArray.append({ key: "", value: "" })}
            />
            {customFieldsArray.fields.map((f, index) => (
              <div key={f.id} className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3 items-end">
                <TextInput name={`customFields.${index}.key`} label="Field Name" placeholder="e.g. Fabric Type" />
                <div className="flex gap-2 items-end">
                  <div className="flex-1">
                    <TextInput name={`customFields.${index}.value`} label="Field Value" placeholder="e.g. Cotton" />
                  </div>
                  <Button type="button" variant="ghost" size="icon" onClick={() => customFieldsArray.remove(index)}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* 2. Accounting Details -------------------------------------------------- */}
        <Section number={2} title="Accounting Details">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <SelectInput
              name="purchaseLedger"
              label="Purchase Ledger"
              helperText="The ledger account where you record the purchase of this item"
              placeholder="Select Ledger"
              options={LEDGER_OPTIONS}
            />
            <SelectInput
              name="salesLedger"
              label="Sales Ledger"
              helperText="The ledger account where you record the sales of this item"
              placeholder="Select Ledger"
              options={LEDGER_OPTIONS}
            />
          </div>
          <SelectInput
            name="inventoryLedger"
            label="Inventory Ledger"
            helperText="The ledger account where you record the inventory of this item"
            placeholder="Select Ledger"
            options={LEDGER_OPTIONS}
          />
        </Section>

        {/* 3. Pricing & Taxation -------------------------------------------------- */}
        <Section number={3} title="Pricing & Taxation">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <SelectInput name="currency" label="Currency" options={CURRENCY_OPTIONS} searchable={false} />
            <CurrencyFormatControl name="currencyFormat" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <NumberInput
              name="buyingPrice"
              label="Buying Price"
              helperText="Rate at which you purchased this item"
              allowDecimal
            />
            <NumberInput
              name="sellingPrice"
              label="Selling Price"
              helperText="Rate at which you are going to sell this item"
              allowDecimal
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <TextInput
              name="landedCost"
              label="Landed Cost"
              helperText="Cost per unit incurred in addition to purchase price"
              placeholder="Transport, delivery, handling etc"
            />
            <NumberInput name="taxRate" label="Tax Rate(in %)" allowDecimal min={0} max={100} />
          </div>

          <CheckboxInput name="priceInclusiveOfTaxes" label="Price is inclusive of taxes" />
        </Section>

        {/* 4. Stock Management -------------------------------------------------- */}
        <Section number={4} title="Stock Management">
          <SwitchInput
            name="strictControl"
            label="Strict Control"
            helperText="Prevent this item from going out of stock and restrict transactions if stock goes below zero."
          />

          <NumberInput
            name="initialStock"
            label="Initial Stock"
            helperText="The stock available for sale at the beginning of accounting period"
          />

          <RadioInput
            name="trackingMethod"
            label="Tracking Method"
            orientation="horizontal"
            options={TRACKING_METHOD_OPTIONS}
          />

          <div className="flex flex-col gap-3">
            {warehouseStockArray.fields.map((f, index) => (
              <div key={f.id} className="grid grid-cols-1 sm:grid-cols-[1fr_1fr_auto] gap-4 items-end">
                <SelectInput
                  name={`warehouseStock.${index}.warehouse`}
                  label={index === 0 ? "Warehouse" : undefined}
                  is_required={index === 0}
                  placeholder="Select a Warehouse"
                  options={WAREHOUSE_OPTIONS}
                />
                <NumberInput
                  name={`warehouseStock.${index}.stock`}
                  label={index === 0 ? "Initial Stock" : undefined}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  disabled={warehouseStockArray.fields.length === 1}
                  onClick={() => warehouseStockArray.remove(index)}
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            ))}
            <div>
              <ToggleAddLink
                label="Add Warehouse"
                active={false}
                onClick={() => warehouseStockArray.append({ warehouse: "", stock: "0" })}
              />
            </div>
          </div>
        </Section>

        {/* 5. Reorder & Overstock -------------------------------------------------- */}
        <Section number={5} title="Reorder & Overstock">
          <div className="flex flex-col gap-2">
            <span className="text-sm font-semibold">Item Level Stock</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <NumberInput name="reorderPoint" label="Reordering Point" />
              <NumberInput name="overstockPoint" label="Overstock Point" />
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-sm font-semibold">Warehouse Level</span>
            {warehouseReorderArray.fields.map((f, index) => (
              <div key={f.id} className="grid grid-cols-1 sm:grid-cols-[1fr_1fr_1fr_auto] gap-4 items-end">
                <SelectInput
                  name={`warehouseReorder.${index}.warehouse`}
                  label={index === 0 ? "Warehouse" : undefined}
                  placeholder="Select a Warehouse"
                  options={WAREHOUSE_OPTIONS}
                />
                <NumberInput
                  name={`warehouseReorder.${index}.reorderPoint`}
                  label={index === 0 ? "Reordering Point" : undefined}
                />
                <NumberInput
                  name={`warehouseReorder.${index}.overstockPoint`}
                  label={index === 0 ? "Overstock Point" : undefined}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  disabled={warehouseReorderArray.fields.length === 1}
                  onClick={() => warehouseReorderArray.remove(index)}
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            ))}
            <div>
              <ToggleAddLink
                label="Add Warehouse"
                active={false}
                onClick={() => warehouseReorderArray.append({ warehouse: "", reorderPoint: "2", overstockPoint: "5" })}
              />
            </div>
          </div>
        </Section>

        <div className="flex justify-end gap-3 pb-8">
          <Button type="button" variant="outline">Cancel</Button>
          <Button type="submit">Save Item</Button>
        </div>
      </form>
    </FormProvider>
  );
}
