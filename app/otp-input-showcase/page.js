"use client";

import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { OtpInput } from "@/components/FormElements";
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
  fourDigit: "",
  disabled: "123456",
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

export default function OtpInputShowcase() {
  const form = useForm({ defaultValues });

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-10 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">OTP Input — Showcase & Guide</h1>
          <p className="text-muted-foreground mt-2">
            One-time password input with configurable length, paste support, and auto-focus.
          </p>
        </div>

        <FormProvider {...form}>
          <div className="flex gap-8 items-start">
            <div className="flex-1 space-y-8 min-w-0">
              {/* 1. BASIC (6 digit) */}
              <Card>
                <CardHeader>
                  <CardTitle>1. Basic Usage (6 digits)</CardTitle>
                  <CardDescription>
                    Default <code>length=6</code> — numeric only. Value is a concatenated string.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <OtpInput name="basic" label="Enter OTP" />
                  <div className="mt-4 bg-muted/50 rounded-lg p-4 text-sm space-y-1">
                    <p><strong>Data IN:</strong> <code>{'{ basic: "" }'}</code></p>
                    <p><strong>Data OUT:</strong> String e.g. <code>"123456"</code></p>
                  </div>
                </CardContent>
              </Card>

              {/* 2. CUSTOM LENGTH (4) */}
              <Card>
                <CardHeader>
                  <CardTitle>2. Custom Length (4 digits)</CardTitle>
                  <CardDescription>
                    <code>length=4</code> — shorter OTP field.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <OtpInput name="fourDigit" label="4-digit Code" length={4} />
                  <div className="mt-4 bg-muted/50 rounded-lg p-4 text-sm">
                    <p><strong>Data IN:</strong> <code>length=4</code></p>
                    <p><strong>Data OUT:</strong> String e.g. <code>"1234"</code></p>
                  </div>
                </CardContent>
              </Card>

              <Separator />

              {/* 3. DISABLED */}
              <Card>
                <CardHeader>
                  <CardTitle>3. Disabled</CardTitle>
                  <CardDescription>
                    <code>disabled=true</code> — pre-filled with <code>"123456"</code>.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <OtpInput name="disabled" label="Verified OTP" disabled />
                  <div className="mt-4 bg-muted/50 rounded-lg p-4 text-sm">
                    <p><strong>Data IN:</strong> <code>disabled={'{true}'}</code> + <code>"123456"</code></p>
                    <p><strong>Data OUT:</strong> Stays <code>"123456"</code></p>
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
                  <OtpInput name="required" label="Verification Code" is_required />
                  <div className="mt-4 bg-muted/50 rounded-lg p-4 text-sm">
                    <p><strong>Data IN:</strong> <code>is_required</code> — UI only</p>
                    <p><strong>Data OUT:</strong> Concatenated string</p>
                  </div>
                </CardContent>
              </Card>

              {/* 5. ERROR */}
              <Card>
                <CardHeader>
                  <CardTitle>5. Error State</CardTitle>
                  <CardDescription>
                    <code>error</code> — red border + message below inputs.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <OtpInput name="_err1" label="OTP" error="Invalid code. Please try again." />
                  <div className="mt-4 bg-muted/50 rounded-lg p-4 text-sm">
                    <p><strong>Data IN:</strong> <code>error="Invalid code..."</code></p>
                    <p><strong>Data OUT:</strong> Same string — error is UI only</p>
                  </div>
                </CardContent>
              </Card>

              {/* 6. FORM INTEGRATION */}
              <Card>
                <CardHeader>
                  <CardTitle>6. Form Integration</CardTitle>
                  <CardDescription>
                    All inputs in one form — watch payload on the right.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <OtpInput name="basic" label="Basic (6)" />
                  <OtpInput name="fourDigit" label="Custom (4)" length={4} />
                  <OtpInput name="disabled" label="Disabled" disabled />
                  <OtpInput name="required" label="Required" is_required />
                  <div className="bg-muted/50 rounded-lg p-4 text-sm">
                    <p><strong>Format:</strong> Each field stores the concatenated OTP string</p>
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
