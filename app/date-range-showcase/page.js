"use client";

import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { DateRangePicker } from "@/components/FormElements";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const defaultValues = {
  basic: { from: null, to: null },
  preFilled: { from: "2025-07-01", to: "2025-07-31" },
  disabled: { from: "2025-01-01", to: "2025-12-31" },
  required: { from: null, to: null },
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

export default function DateRangeShowcase() {
  const form = useForm({ defaultValues });

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-10 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Date Range Picker — Showcase & Guide</h1>
          <p className="text-muted-foreground mt-2">
            Select a range with from/to dates — stores <code>{'{ from, to }'}</code> object.
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
                    Empty range — pick any start and end dates.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <DateRangePicker name="basic" label="Select Range" />
                  <div className="mt-4 bg-muted/50 rounded-lg p-4 text-sm space-y-1">
                    <p><strong>Data IN:</strong> <code>{'{ from: null, to: null }'}</code></p>
                    <p><strong>Data OUT:</strong> <code>{'{ from: "ISO...", to: "ISO..." }'}</code> or <code>{'{ from: null, to: null }'}</code></p>
                  </div>
                </CardContent>
              </Card>

              {/* 2. PRE-FILLED */}
              <Card>
                <CardHeader>
                  <CardTitle>2. Pre-filled</CardTitle>
                  <CardDescription>
                    Default range set — <code>July 1 – July 31, 2025</code>.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <DateRangePicker name="preFilled" label="Pre-filled Range" />
                  <div className="mt-4 bg-muted/50 rounded-lg p-4 text-sm">
                    <p><strong>Data IN:</strong> <code>{'{ from: "2025-07-01", to: "2025-07-31" }'}</code></p>
                    <p><strong>Data OUT:</strong> Same object shape with ISO strings</p>
                  </div>
                </CardContent>
              </Card>

              <Separator />

              {/* 3. DISABLED */}
              <Card>
                <CardHeader>
                  <CardTitle>3. Disabled</CardTitle>
                  <CardDescription>
                    <code>disabled=true</code> — pre-filled full year range.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <DateRangePicker name="disabled" label="Locked Range" disabled />
                  <div className="mt-4 bg-muted/50 rounded-lg p-4 text-sm">
                    <p><strong>Data IN:</strong> <code>disabled={'{true}'}</code> + <code>{'{ from: "2025-01-01", to: "2025-12-31" }'}</code></p>
                    <p><strong>Data OUT:</strong> Stays unchanged</p>
                  </div>
                </CardContent>
              </Card>

              {/* 4. REQUIRED */}
              <Card>
                <CardHeader>
                  <CardTitle>4. Required</CardTitle>
                  <CardDescription>
                    <code>is_required</code> — asterisk on label.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <DateRangePicker name="required" label="Required Range" is_required />
                  <div className="mt-4 bg-muted/50 rounded-lg p-4 text-sm">
                    <p><strong>Data IN:</strong> <code>is_required</code> — UI only</p>
                    <p><strong>Data OUT:</strong> <code>{'{ from, to }'}</code> object</p>
                  </div>
                </CardContent>
              </Card>

              {/* 5. MIN/MAX */}
              <Card>
                <CardHeader>
                  <CardTitle>5. Min / Max</CardTitle>
                  <CardDescription>
                    <code>minDate</code> + <code>maxDate</code> boundaries.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <DateRangePicker
                    name="_minmax1"
                    label="Range (2025 only)"
                    minDate="2025-01-01"
                    maxDate="2025-12-31"
                  />
                  <div className="mt-4 bg-muted/50 rounded-lg p-4 text-sm">
                    <p><strong>Data IN:</strong> <code>minDate="2025-01-01"</code> + <code>maxDate="2025-12-31"</code></p>
                    <p><strong>Data OUT:</strong> Same object shape</p>
                  </div>
                </CardContent>
              </Card>

              {/* 6. FORM INTEGRATION */}
              <Card>
                <CardHeader>
                  <CardTitle>6. Form Integration</CardTitle>
                  <CardDescription>
                    All ranges in one form — watch payload on the right.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <DateRangePicker name="basic" label="Basic" />
                  <DateRangePicker name="preFilled" label="Pre-filled" />
                  <DateRangePicker name="disabled" label="Disabled" disabled />
                  <DateRangePicker name="required" label="Required" is_required />
                  <div className="bg-muted/50 rounded-lg p-4 text-sm">
                    <p><strong>Format:</strong> Each field stores <code>{'{ from: string|null, to: string|null }'}</code></p>
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
