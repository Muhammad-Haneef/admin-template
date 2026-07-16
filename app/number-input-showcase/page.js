"use client";

import { useForm, FormProvider, useFormContext } from "react-hook-form";
import NumberInput from "@/components/FormElements/number-input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { DollarSign, Hash, Percent, CreditCard } from "lucide-react";
import { useState } from "react";

const defaultValues = {
  basic: "",
  withMin: 5,
  withMax: 50,
  withStep: 0,
  disabled: 10,
  required: "",
  withDropdown: 0,
};

function LiveJsonPanel() {
  const { watch } = useFormContext();
  const watched = watch();
  return (
    <div className="w-80 shrink-0 hidden lg:block">
      <div className="sticky top-24 space-y-4">
        <Card>
          <CardHeader className="py-3">
            <CardTitle className="text-sm">Default Values</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="text-xs bg-muted p-3 rounded-lg overflow-auto max-h-64">
              {JSON.stringify(defaultValues, null, 2)}
            </pre>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="py-3">
            <CardTitle className="text-sm">Live Payload</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="text-xs bg-muted p-3 rounded-lg overflow-auto max-h-64">
              {JSON.stringify(watched, null, 2)}
            </pre>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function NumberInputShowcase() {
  const form = useForm({ defaultValues });
  const [currency, setCurrency] = useState("USD");

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-10 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Number Input — Showcase & Guide</h1>
          <p className="text-muted-foreground mt-2">
            Har example mein aik feature. Right side pe live JSON dekho.
          </p>
        </div>

        <FormProvider {...form}>
          <div className="flex gap-8 items-start">
            <div className="flex-1 space-y-8 min-w-0">

            {/* 1. BASIC */}
            <Card>
              <CardHeader>
                <CardTitle>1. Basic Usage</CardTitle>
                <CardDescription>
                  Simple number input — <code>string</code> value (numeric string).
                </CardDescription>
              </CardHeader>
              <CardContent>
                <NumberInput name="basic" label="Quantity" placeholder="Enter quantity" />
                <div className="mt-4 bg-muted/50 rounded-lg p-4 text-sm space-y-1">
                  <p><strong>Data IN:</strong> <code>&#123; basic: "" &#125;</code></p>
                  <p><strong>Data OUT:</strong> <code>"5"</code> (numeric string)</p>
                </div>
              </CardContent>
            </Card>

            <Separator />

            {/* 2. MIN / MAX */}
            <Card>
              <CardHeader>
                <CardTitle>2. Min / Max</CardTitle>
                <CardDescription>
                  <code>min</code> aur <code>max</code> — spinner buttons bhi limits follow karte hain.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium mb-3">Min: 5</p>
                  <NumberInput name="withMin" label="Min Value" placeholder="Min 5" min={5} />
                </div>
                <Separator />
                <div>
                  <p className="text-sm font-medium mb-3">Max: 50</p>
                  <NumberInput name="withMax" label="Max Value" placeholder="Max 50" max={50} />
                </div>
                <div className="bg-muted/50 rounded-lg p-4 text-sm space-y-1">
                  <p><strong>Data IN:</strong> <code>min=&#123;5&#125;</code>, <code>max=&#123;50&#125;</code></p>
                  <p><strong>Data OUT:</strong> String — number within range</p>
                </div>
              </CardContent>
            </Card>

            {/* 3. STEP */}
            <Card>
              <CardHeader>
                <CardTitle>3. Step</CardTitle>
                <CardDescription>
                  <code>step</code> — spinner se kitna increment/decrement hoga.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <NumberInput name="withStep" label="Step by 10" placeholder="Start at 0" step={10} />
                <div className="mt-4 bg-muted/50 rounded-lg p-4 text-sm">
                  <p><strong>Data IN:</strong> <code>step=&#123;10&#125;</code></p>
                  <p><strong>Data OUT:</strong> String — multiples of 10</p>
                </div>
              </CardContent>
            </Card>

            <Separator />

            {/* 4. ALLOW DECIMAL */}
            <Card>
              <CardHeader>
                <CardTitle>4. Allow Decimal</CardTitle>
                <CardDescription>
                  <code>allowDecimal</code> — decimal points allow karo.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <NumberInput label="Price" placeholder="0.00" allowDecimal icon={DollarSign} />
                <div className="mt-4 bg-muted/50 rounded-lg p-4 text-sm">
                  <p><strong>Data IN:</strong> <code>allowDecimal=&#123;true&#125;</code></p>
                  <p><strong>Data OUT:</strong> String — <code>"19.99"</code></p>
                </div>
              </CardContent>
            </Card>

            {/* 5. ALLOW NEGATIVE */}
            <Card>
              <CardHeader>
                <CardTitle>5. Allow Negative</CardTitle>
                <CardDescription>
                  <code>allowNegative</code> — minus sign allow karo.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <NumberInput label="Temperature" placeholder="-10" allowNegative />
                <div className="mt-4 bg-muted/50 rounded-lg p-4 text-sm">
                  <p><strong>Data IN:</strong> <code>allowNegative=&#123;true&#125;</code></p>
                  <p><strong>Data OUT:</strong> String — <code>"-5"</code></p>
                </div>
              </CardContent>
            </Card>

            <Separator />

            {/* 6. DISABLED */}
            <Card>
              <CardHeader>
                <CardTitle>6. Disabled</CardTitle>
                <CardDescription>
                  <code>disabled=true</code> — spinner bhi band.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <NumberInput name="disabled" label="Locked Amount" placeholder="10" disabled />
                <div className="mt-4 bg-muted/50 rounded-lg p-4 text-sm">
                  <p><strong>Data IN:</strong> <code>disabled=&#123;true&#125;</code></p>
                  <p><strong>Data OUT:</strong> Value change nahi hogi</p>
                </div>
              </CardContent>
            </Card>

            {/* 7. REQUIRED */}
            <Card>
              <CardHeader>
                <CardTitle>7. Required</CardTitle>
                <CardDescription>
                  <code>is_required</code> — asterisk (*) label pe.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <NumberInput name="required" label="Age" placeholder="Enter age" is_required icon={Hash} />
                <div className="mt-4 bg-muted/50 rounded-lg p-4 text-sm">
                  <p><strong>Data IN:</strong> <code>is_required=&#123;true&#125;</code> — sirf UI asterisk</p>
                  <p><strong>Data OUT:</strong> Same string</p>
                </div>
              </CardContent>
            </Card>

            <Separator />

            {/* 8. WITH DROPDOWN */}
            <Card>
              <CardHeader>
                <CardTitle>8. With Dropdown (Currency Selector)</CardTitle>
                <CardDescription>
                  <code>dropdownOptions</code> + <code>dropdownValue</code> + <code>onDropdownChange</code> — right side pe unit selector.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <NumberInput
                  name="withDropdown"
                  label="Amount"
                  placeholder="0.00"
                  icon={CreditCard}
                  dropdownOptions={["USD", "EUR", "GBP", "PKR"]}
                  dropdownValue={currency}
                  onDropdownChange={setCurrency}
                />
                <div className="mt-4 bg-muted/50 rounded-lg p-4 text-sm space-y-1">
                  <p><strong>Data IN:</strong> <code>dropdownOptions=&#123;["USD","EUR","GBP","PKR"]&#125;</code></p>
                  <p><strong>Data IN:</strong> <code>dropdownValue=&#123;"USD"&#125;</code>, <code>onDropdownChange=&#123;fn&#125;</code></p>
                  <p><strong>Data OUT:</strong> Number value string + separate currency state</p>
                </div>
              </CardContent>
            </Card>

            <Separator />

            {/* 9. FORM INTEGRATION */}
            <Card>
              <CardHeader>
                <CardTitle>9. Form Integration</CardTitle>
                <CardDescription>
                  Submit karke live payload dekho. Sab fields react-hook-form se connected.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={form.handleSubmit((data) => alert(JSON.stringify(data, null, 2)))} className="space-y-4">
                  <NumberInput name="basic" label="Quantity" placeholder="Enter quantity" />
                  <NumberInput name="withMin" label="Min Value" placeholder="Min 5" min={5} />
                  <NumberInput name="withStep" label="Step by 10" placeholder="0" step={10} />
                  <Button type="submit">Submit Form</Button>
                </form>
                <div className="mt-4 bg-muted/50 rounded-lg p-4 text-sm">
                  <p><strong>Data IN:</strong> All field values in <code>defaultValues</code> format</p>
                  <p><strong>Data OUT:</strong> <code>&#123; basic: "...", withMin: 5, ... &#125;</code></p>
                </div>
              </CardContent>
            </Card>

            </div>

            <LiveJsonPanel />
          </div>
        </FormProvider>
      </div>
    </div>
  );
}
