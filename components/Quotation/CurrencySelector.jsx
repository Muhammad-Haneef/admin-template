"use client";

import { Card, CardContent } from "@/components/ui/card";
import { SelectInput } from "@/components/FormElements";
import { CURRENCY_OPTIONS, NUMBER_FORMAT_OPTIONS } from "@/lib/quotation-calculations";

export default function CurrencySelector() {
  return (
    <Card>
      <CardContent className="pt-6 flex flex-wrap items-end gap-6">
        <div className="w-64">
          <SelectInput name="currency" label="Currency" is_required options={CURRENCY_OPTIONS} placeholder="Select currency" />
        </div>
        <div className="w-56">
          <SelectInput name="numberFormat" label="Number Format" options={NUMBER_FORMAT_OPTIONS} placeholder="Select format" />
        </div>
      </CardContent>
    </Card>
  );
}
