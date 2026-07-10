"use client";

import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { SelectInput } from "@/components/FormElements";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Settings2, Columns } from "lucide-react";
import { TextInput, NumberInput, CheckboxInput } from "@/components/FormElements";

const currencyOptions = [
  { label: "PKR - Pakistani Rupee", value: "PKR" },
  { label: "USD - US Dollar", value: "USD" },
  { label: "EUR - Euro", value: "EUR" },
  { label: "GBP - British Pound", value: "GBP" },
  { label: "INR - Indian Rupee", value: "INR" },
  { label: "AED - UAE Dirham", value: "AED" }
];

const numberFormatOptions = [
  { label: "1,234.00", value: "1,234.00" },
  { label: "1.234,00", value: "1.234,00" },
  { label: "1234.00", value: "1234.00" }
];

export default function CurrencySelector() {
  const { watch } = useFormContext();
  const [isTaxModalOpen, setIsTaxModalOpen] = useState(false);
  const [isColumnsModalOpen, setIsColumnsModalOpen] = useState(false);

  return (
    <>
      <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
        <h3 className="text-base font-semibold mb-4 pb-3 border-b border-border">
          Currency & Configuration
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <SelectInput
            name="currency"
            label="Currency"
            placeholder="Select currency"
            options={currencyOptions}
            is_required={true}
          />

          <SelectInput
            name="numberFormat"
            label="Number Format"
            placeholder="Select format"
            options={numberFormatOptions}
          />
        </div>

        <div className="flex gap-3 flex-wrap">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setIsTaxModalOpen(true)}
            className="text-xs"
          >
            <Settings2 className="w-3 h-3 mr-1" />
            Configure Tax
          </Button>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setIsColumnsModalOpen(true)}
            className="text-xs"
          >
            <Columns className="w-3 h-3 mr-1" />
            Edit Columns
          </Button>
        </div>
      </div>

      {/* Tax Configuration Modal */}
      <TaxConfiguratorModal 
        isOpen={isTaxModalOpen} 
        onClose={() => setIsTaxModalOpen(false)} 
      />

      {/* Columns Configuration Modal */}
      <ColumnsConfigModal 
        isOpen={isColumnsModalOpen} 
        onClose={() => setIsColumnsModalOpen(false)} 
      />
    </>
  );
}

// Tax Configurator Modal Component
function TaxConfiguratorModal({ isOpen, onClose }) {
  const { watch, setValue } = useFormContext();
  const [taxes, setTaxes] = useState([
    { id: "1", name: "GST", rate: 18, isDefault: true },
    { id: "2", name: "VAT", rate: 15, isDefault: false }
  ]);
  const [newTax, setNewTax] = useState({ name: "", rate: 0 });

  const handleAddTax = () => {
    if (newTax.name && newTax.rate) {
      setTaxes([...taxes, { 
        id: String(taxes.length + 1), 
        ...newTax, 
        isDefault: false 
      }]);
      setNewTax({ name: "", rate: 0 });
    }
  };

  const handleDeleteTax = (id) => {
    setTaxes(taxes.filter(t => t.id !== id));
  };

  const handleSetDefault = (id) => {
    setTaxes(taxes.map(t => ({ ...t, isDefault: t.id === id })));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Configure Tax Rates</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Existing Taxes */}
          <div className="space-y-2">
            <p className="text-sm font-medium">Existing Tax Rates</p>
            {taxes.map(tax => (
              <div key={tax.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    checked={tax.isDefault}
                    onChange={() => handleSetDefault(tax.id)}
                    className="cursor-pointer"
                  />
                  <div>
                    <p className="font-medium">{tax.name}</p>
                    <p className="text-xs text-muted-foreground">{tax.rate}%</p>
                  </div>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDeleteTax(tax.id)}
                  className="text-destructive hover:text-destructive"
                >
                  Delete
                </Button>
              </div>
            ))}
          </div>

          {/* Add New Tax */}
          <div className="border-t pt-4">
            <p className="text-sm font-medium mb-3">Add New Tax</p>
            <div className="flex gap-3">
              <input
                type="text"
                value={newTax.name}
                onChange={(e) => setNewTax({ ...newTax, name: e.target.value })}
                placeholder="Tax Name"
                className="flex-1 px-3 py-2 border border-input rounded-md text-sm"
              />
              <input
                type="number"
                value={newTax.rate}
                onChange={(e) => setNewTax({ ...newTax, rate: parseFloat(e.target.value) })}
                placeholder="Rate %"
                className="w-24 px-3 py-2 border border-input rounded-md text-sm"
              />
              <Button type="button" onClick={handleAddTax}>
                Add
              </Button>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button type="button" onClick={onClose}>
            Done
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// Columns Configuration Modal Component
function ColumnsConfigModal({ isOpen, onClose }) {
  const { watch, setValue } = useFormContext();
  
  const columnOptions = [
    { name: "description", label: "Description", enabled: true },
    { name: "sku", label: "SKU", enabled: false },
    { name: "unit", label: "Unit", enabled: true },
    { name: "quantity", label: "Quantity", enabled: true },
    { name: "rate", label: "Rate", enabled: true },
    { name: "discount", label: "Discount", enabled: true },
    { name: "tax", label: "Tax", enabled: true },
    { name: "amount", label: "Amount", enabled: true }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Configure Table Columns</DialogTitle>
        </DialogHeader>

        <div className="space-y-3 py-4">
          {columnOptions.map(column => (
            <div key={column.name} className="flex items-center justify-between p-3 border border-border rounded-lg">
              <span className="text-sm font-medium">{column.label}</span>
              <input
                type="checkbox"
                defaultChecked={column.enabled}
                className="cursor-pointer w-4 h-4"
              />
            </div>
          ))}
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="button" onClick={onClose}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
