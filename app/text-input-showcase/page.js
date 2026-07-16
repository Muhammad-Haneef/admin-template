"use client";

import { useForm, FormProvider, useFormContext } from "react-hook-form";
import TextInput from "@/components/FormElements/text-input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Mail, Search, User, Lock } from "lucide-react";

const defaultValues = {
  basic: "",
  withIcon: "",
  disabled: "",
  required: "",
  maxLength: "",
  withError: "",
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

export default function TextInputShowcase() {
  const form = useForm({ defaultValues });

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-10 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Text Input — Showcase & Guide</h1>
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
                  Simple text input — <code>string</code> value.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <TextInput name="basic" label="Full Name" placeholder="Enter your name" />
                <div className="mt-4 bg-muted/50 rounded-lg p-4 text-sm space-y-1">
                  <p><strong>Data IN:</strong> <code>&#123; basic: "" &#125;</code></p>
                  <p><strong>Data OUT:</strong> <code>"John Doe"</code> (string)</p>
                </div>
              </CardContent>
            </Card>

            <Separator />

            {/* 2. WITH ICON */}
            <Card>
              <CardHeader>
                <CardTitle>2. With Icon</CardTitle>
                <CardDescription>
                  <code>icon</code> prop — Lucide icon input ke andar left side pe.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <TextInput name="withIcon" label="Email Address" placeholder="you@example.com" icon={Mail} />
                <TextInput label="Search" placeholder="Search..." icon={Search} />
                <div className="bg-muted/50 rounded-lg p-4 text-sm">
                  <p><strong>Data IN:</strong> <code>icon=&#123;Mail&#125;</code> — sirf UI</p>
                  <p><strong>Data OUT:</strong> Same string</p>
                </div>
              </CardContent>
            </Card>

            {/* 3. DISABLED */}
            <Card>
              <CardHeader>
                <CardTitle>3. Disabled</CardTitle>
                <CardDescription>
                  <code>disabled=true</code> — input edit nahi hoga.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <TextInput name="disabled" label="Disabled Field" placeholder="Cannot edit" disabled />
                <div className="bg-muted/50 rounded-lg p-4 text-sm">
                  <p><strong>Data IN:</strong> <code>disabled=&#123;true&#125;</code></p>
                  <p><strong>Data OUT:</strong> Value change nahi hogi</p>
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
                <TextInput name="required" label="Username" placeholder="Enter username" is_required />
                <div className="mt-4 bg-muted/50 rounded-lg p-4 text-sm">
                  <p><strong>Data IN:</strong> <code>is_required=&#123;true&#125;</code> — sirf UI asterisk</p>
                  <p><strong>Data OUT:</strong> Same string</p>
                </div>
              </CardContent>
            </Card>

            {/* 5. MAX LENGTH */}
            <Card>
              <CardHeader>
                <CardTitle>5. Max Length</CardTitle>
                <CardDescription>
                  <code>maxLength</code> — character count + limit. Counter right side pe dikhta hai.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <TextInput name="maxLength" label="Short Bio" placeholder="Write about yourself..." maxLength={100} helperText="Max 100 characters" />
                <div className="mt-4 bg-muted/50 rounded-lg p-4 text-sm">
                  <p><strong>Data IN:</strong> <code>maxLength=&#123;100&#125;</code></p>
                  <p><strong>Data OUT:</strong> String — max 100 chars</p>
                </div>
              </CardContent>
            </Card>

            <Separator />

            {/* 6. ERROR */}
            <Card>
              <CardHeader>
                <CardTitle>6. Error</CardTitle>
                <CardDescription>
                  <code>error</code> — red border + red text. <code>helperText</code> — grey text.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <TextInput name="withError" label="Email" placeholder="Invalid email" error="Email address is not valid" />
                <TextInput label="Helper Example" placeholder="With helper text" helperText="This is a helpful hint" />
                <div className="bg-muted/50 rounded-lg p-4 text-sm">
                  <p><strong>Data IN:</strong> <code>error="..."</code> — sirf UI</p>
                  <p><strong>Data OUT:</strong> Same string — error display only</p>
                </div>
              </CardContent>
            </Card>

            <Separator />

            {/* 7. FORM INTEGRATION */}
            <Card>
              <CardHeader>
                <CardTitle>7. Form Integration</CardTitle>
                <CardDescription>
                  Submit karke live payload dekho. Sab fields react-hook-form se connected.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={form.handleSubmit((data) => alert(JSON.stringify(data, null, 2)))} className="space-y-4">
                  <TextInput name="basic" label="Full Name" placeholder="Enter your name" />
                  <TextInput name="withIcon" label="Email" placeholder="you@example.com" icon={Mail} />
                  <Button type="submit">Submit Form</Button>
                </form>
                <div className="mt-4 bg-muted/50 rounded-lg p-4 text-sm">
                  <p><strong>Data IN:</strong> All field values in <code>defaultValues</code> format</p>
                  <p><strong>Data OUT:</strong> <code>&#123; basic: "...", withIcon: "...", ... &#125;</code></p>
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
