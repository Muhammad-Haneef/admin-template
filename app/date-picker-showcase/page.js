"use client";

import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { DatePickerInput } from "@/components/FormElements";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const defaultValues = {
  basic: "",
  withMin: "",
  withMax: "",
  disabled: "2025-06-15",
  required: "",
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

export default function DatePickerShowcase() {
  const form = useForm({ defaultValues });

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-10 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Date Picker — Showcase & Guide</h1>
          <p className="text-muted-foreground mt-2">
            Single date selection with min/max, clearable, error, and required states.
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
                    Pick any date — value stored as ISO string (<code>YYYY-MM-DD</code>).
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <DatePickerInput name="basic" label="Pick a Date" placeholder="Select date..." />
                  <div className="mt-4 bg-muted/50 rounded-lg p-4 text-sm space-y-1">
                    <p><strong>Data IN:</strong> <code>{'{ basic: "" }'}</code></p>
                    <p><strong>Data OUT:</strong> ISO string e.g. <code>"2025-07-16T00:00:00.000Z"</code> or <code>null</code></p>
                  </div>
                </CardContent>
              </Card>

              {/* 2. MIN DATE */}
              <Card>
                <CardHeader>
                  <CardTitle>2. Min Date</CardTitle>
                  <CardDescription>
                    <code>minDate</code> — dates before this are disabled.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <DatePickerInput name="withMin" label="Start Date (min: today)" minDate={new Date().toISOString()} />
                  <div className="mt-4 bg-muted/50 rounded-lg p-4 text-sm">
                    <p><strong>Data IN:</strong> <code>minDate="..."</code></p>
                    <p><strong>Data OUT:</strong> ISO string or <code>null</code></p>
                  </div>
                </CardContent>
              </Card>

              {/* 3. MAX DATE */}
              <Card>
                <CardHeader>
                  <CardTitle>3. Max Date</CardTitle>
                  <CardDescription>
                    <code>maxDate</code> — dates after this are disabled.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <DatePickerInput name="withMax" label="End Date (max: 2025-12-31)" maxDate="2025-12-31" />
                  <div className="mt-4 bg-muted/50 rounded-lg p-4 text-sm">
                    <p><strong>Data IN:</strong> <code>maxDate="2025-12-31"</code></p>
                    <p><strong>Data OUT:</strong> ISO string or <code>null</code></p>
                  </div>
                </CardContent>
              </Card>

              <Separator />

              {/* 4. DISABLED */}
              <Card>
                <CardHeader>
                  <CardTitle>4. Disabled (Pre-filled)</CardTitle>
                  <CardDescription>
                    <code>disabled=true</code> — pre-filled with <code>"2025-06-15"</code>.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <DatePickerInput name="disabled" label="Locked Date" disabled />
                  <div className="mt-4 bg-muted/50 rounded-lg p-4 text-sm">
                    <p><strong>Data IN:</strong> <code>disabled={'{true}'}</code> + <code>default: "2025-06-15"</code></p>
                    <p><strong>Data OUT:</strong> Value stays unchanged</p>
                  </div>
                </CardContent>
              </Card>

              {/* 5. REQUIRED */}
              <Card>
                <CardHeader>
                  <CardTitle>5. Required</CardTitle>
                  <CardDescription>
                    <code>is_required</code> — asterisk on label.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <DatePickerInput name="required" label="Date of Birth" is_required />
                  <div className="mt-4 bg-muted/50 rounded-lg p-4 text-sm">
                    <p><strong>Data IN:</strong> <code>is_required</code> — UI only</p>
                    <p><strong>Data OUT:</strong> ISO string or <code>null</code></p>
                  </div>
                </CardContent>
              </Card>

              {/* 6. CLEARABLE */}
              <Card>
                <CardHeader>
                  <CardTitle>6. Clearable</CardTitle>
                  <CardDescription>
                    <code>clearable=true</code> (default) — X button to reset value.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <DatePickerInput name="_clear1" label="Clearable Date" clearable />
                  <div className="mt-4 bg-muted/50 rounded-lg p-4 text-sm">
                    <p><strong>Data IN:</strong> <code>clearable={'{true}'}</code></p>
                    <p><strong>Data OUT:</strong> ISO string or <code>null</code> when cleared</p>
                  </div>
                </CardContent>
              </Card>

              {/* 7. ERROR */}
              <Card>
                <CardHeader>
                  <CardTitle>7. Error State</CardTitle>
                  <CardDescription>
                    <code>error</code> — red border + message.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <DatePickerInput name="_err1" label="Due Date" error="Due date is required" />
                  <div className="mt-4 bg-muted/50 rounded-lg p-4 text-sm">
                    <p><strong>Data IN:</strong> <code>error="Due date is required"</code></p>
                    <p><strong>Data OUT:</strong> Same — error is UI only</p>
                  </div>
                </CardContent>
              </Card>

              {/* 8. FORM INTEGRATION */}
              <Card>
                <CardHeader>
                  <CardTitle>8. Form Integration</CardTitle>
                  <CardDescription>
                    All pickers in one form — watch payload on the right.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <DatePickerInput name="basic" label="Basic" />
                  <DatePickerInput name="withMin" label="Min Date" minDate={new Date().toISOString()} />
                  <DatePickerInput name="disabled" label="Disabled" disabled />
                  <DatePickerInput name="required" label="Required" is_required />
                  <div className="bg-muted/50 rounded-lg p-4 text-sm">
                    <p><strong>Format:</strong> Each field stores ISO string or <code>null</code></p>
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
