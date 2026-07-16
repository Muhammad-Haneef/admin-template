"use client";

import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { DateTimePickerInput } from "@/components/FormElements";
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
  preFilled: "2025-07-15T14:30:00",
  disabled: "2025-06-15T09:00:00",
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

export default function DateTimePickerShowcase() {
  const form = useForm({ defaultValues });

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-10 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Date Time Picker — Showcase & Guide</h1>
          <p className="text-muted-foreground mt-2">
            Combined date + time selection — stores full ISO datetime string.
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
                    Pick date and time — value stored as ISO string.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <DateTimePickerInput name="basic" label="Schedule Date" />
                  <div className="mt-4 bg-muted/50 rounded-lg p-4 text-sm space-y-1">
                    <p><strong>Data IN:</strong> <code>{'{ basic: "" }'}</code></p>
                    <p><strong>Data OUT:</strong> Full ISO string e.g. <code>"2025-07-16T14:30:00.000Z"</code> or <code>null</code></p>
                  </div>
                </CardContent>
              </Card>

              {/* 2. PRE-FILLED */}
              <Card>
                <CardHeader>
                  <CardTitle>2. Pre-filled</CardTitle>
                  <CardDescription>
                    Default datetime set — <code>July 15, 2025 @ 2:30 PM</code>.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <DateTimePickerInput name="preFilled" label="Pre-filled DateTime" />
                  <div className="mt-4 bg-muted/50 rounded-lg p-4 text-sm">
                    <p><strong>Data IN:</strong> <code>"2025-07-15T14:30:00"</code></p>
                    <p><strong>Data OUT:</strong> Full ISO string</p>
                  </div>
                </CardContent>
              </Card>

              <Separator />

              {/* 3. DISABLED */}
              <Card>
                <CardHeader>
                  <CardTitle>3. Disabled</CardTitle>
                  <CardDescription>
                    <code>disabled=true</code> — pre-filled with <code>June 15 @ 9:00 AM</code>.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <DateTimePickerInput name="disabled" label="Locked DateTime" disabled />
                  <div className="mt-4 bg-muted/50 rounded-lg p-4 text-sm">
                    <p><strong>Data IN:</strong> <code>disabled={'{true}'}</code> + <code>"2025-06-15T09:00:00"</code></p>
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
                  <DateTimePickerInput name="required" label="Appointment Time" is_required />
                  <div className="mt-4 bg-muted/50 rounded-lg p-4 text-sm">
                    <p><strong>Data IN:</strong> <code>is_required</code> — UI only</p>
                    <p><strong>Data OUT:</strong> Full ISO string or <code>null</code></p>
                  </div>
                </CardContent>
              </Card>

              {/* 5. FORM INTEGRATION */}
              <Card>
                <CardHeader>
                  <CardTitle>5. Form Integration</CardTitle>
                  <CardDescription>
                    All pickers in one form — watch payload on the right.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <DateTimePickerInput name="basic" label="Basic" />
                  <DateTimePickerInput name="preFilled" label="Pre-filled" />
                  <DateTimePickerInput name="disabled" label="Disabled" disabled />
                  <DateTimePickerInput name="required" label="Required" is_required />
                  <div className="bg-muted/50 rounded-lg p-4 text-sm">
                    <p><strong>Format:</strong> Each field stores full ISO string or <code>null</code></p>
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
