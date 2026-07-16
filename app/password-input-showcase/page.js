"use client";

import { useForm, FormProvider, useFormContext } from "react-hook-form";
import PasswordInput from "@/components/FormElements/password-input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Lock, Shield, Key } from "lucide-react";

const defaultValues = {
  basic: "",
  withStrength: "",
  disabled: "secret123",
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

export default function PasswordInputShowcase() {
  const form = useForm({ defaultValues });

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-10 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Password Input — Showcase & Guide</h1>
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
                  Password input with eye toggle — <code>string</code> value. Default Lock icon aur show/hide button.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <PasswordInput name="basic" label="Password" placeholder="Enter password" />
                <div className="mt-4 bg-muted/50 rounded-lg p-4 text-sm space-y-1">
                  <p><strong>Data IN:</strong> <code>&#123; basic: "" &#125;</code></p>
                  <p><strong>Data OUT:</strong> <code>"mypassword"</code> (string)</p>
                </div>
              </CardContent>
            </Card>

            <Separator />

            {/* 2. STRENGTH INDICATOR */}
            <Card>
              <CardHeader>
                <CardTitle>2. Strength Indicator</CardTitle>
                <CardDescription>
                  <code>showStrengthIndicator</code> — 5-bar strength meter. Very Weak se Very Strong tak.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <PasswordInput name="withStrength" label="Secure Password" placeholder="Type a strong password" showStrengthIndicator helperText="Try: uppercase, numbers, symbols" />
                <div className="mt-4 bg-muted/50 rounded-lg p-4 text-sm space-y-1">
                  <p><strong>Data IN:</strong> <code>showStrengthIndicator=&#123;true&#125;</code></p>
                  <p><strong>Data OUT:</strong> Same string — strength bar sirf UI</p>
                  <p className="text-muted-foreground text-xs mt-2">Strength: length &ge; 8 (+1), lowercase (+1), uppercase (+1), digit (+1), symbol (+1)</p>
                </div>
              </CardContent>
            </Card>

            {/* 3. DISABLED */}
            <Card>
              <CardHeader>
                <CardTitle>3. Disabled</CardTitle>
                <CardDescription>
                  <code>disabled=true</code> — password dikhta hai but edit nahi hoga. Eye toggle bhi band.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <PasswordInput name="disabled" label="Locked Password" placeholder="Cannot edit" disabled />
                <div className="mt-4 bg-muted/50 rounded-lg p-4 text-sm">
                  <p><strong>Data IN:</strong> <code>disabled=&#123;true&#125;</code> + <code>defaultValues: &#123; disabled: "secret123" &#125;</code></p>
                  <p><strong>Data OUT:</strong> <code>"secret123"</code> — unchanged</p>
                </div>
              </CardContent>
            </Card>

            <Separator />

            {/* 4. REQUIRED */}
            <Card>
              <CardHeader>
                <CardTitle>4. Required</CardTitle>
                <CardDescription>
                  <code>is_required</code> — asterisk (*) label ke saath.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <PasswordInput name="required" label="New Password" placeholder="Enter new password" is_required />
                <div className="mt-4 bg-muted/50 rounded-lg p-4 text-sm">
                  <p><strong>Data IN:</strong> <code>is_required=&#123;true&#125;</code> — sirf UI asterisk</p>
                  <p><strong>Data OUT:</strong> Same string</p>
                </div>
              </CardContent>
            </Card>

            {/* 5. ERROR */}
            <Card>
              <CardHeader>
                <CardTitle>5. Error</CardTitle>
                <CardDescription>
                  <code>error</code> — red border + red text. <code>helperText</code> — grey hint text.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <PasswordInput label="With Error" placeholder="Invalid password" error="Password must be at least 8 characters" />
                <PasswordInput label="With Helper" placeholder="Enter password" helperText="Must contain uppercase and numbers" />
                <div className="bg-muted/50 rounded-lg p-4 text-sm">
                  <p><strong>Data IN:</strong> <code>error="..."</code> — sirf UI</p>
                  <p><strong>Data OUT:</strong> Same string — error display only</p>
                </div>
              </CardContent>
            </Card>

            <Separator />

            {/* 6. FORM INTEGRATION */}
            <Card>
              <CardHeader>
                <CardTitle>6. Form Integration</CardTitle>
                <CardDescription>
                  Submit karke live payload dekho. Sab fields react-hook-form se connected.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={form.handleSubmit((data) => alert(JSON.stringify(data, null, 2)))} className="space-y-4">
                  <PasswordInput name="basic" label="Password" placeholder="Enter password" showStrengthIndicator />
                  <PasswordInput name="required" label="Confirm Password" placeholder="Re-enter password" is_required />
                  <Button type="submit">Submit Form</Button>
                </form>
                <div className="mt-4 bg-muted/50 rounded-lg p-4 text-sm">
                  <p><strong>Data IN:</strong> All field values in <code>defaultValues</code> format</p>
                  <p><strong>Data OUT:</strong> <code>&#123; basic: "...", required: "...", ... &#125;</code></p>
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
