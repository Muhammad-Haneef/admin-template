"use client";

import { useForm, FormProvider, useFormContext } from "react-hook-form";
import TextareaInput from "@/components/FormElements/textarea-input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { FileText, MessageSquare } from "lucide-react";

const defaultValues = {
  basic: "",
  withRows: "",
  autoResize: "",
  disabled: "Fixed size",
  maxLength: "",
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

export default function TextareaInputShowcase() {
  const form = useForm({ defaultValues });

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-10 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Textarea Input — Showcase & Guide</h1>
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
                  Simple textarea — <code>string</code> value. Default 3 rows, auto-resize on.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <TextareaInput name="basic" label="Description" placeholder="Write something..." />
                <div className="mt-4 bg-muted/50 rounded-lg p-4 text-sm space-y-1">
                  <p><strong>Data IN:</strong> <code>&#123; basic: "" &#125;</code></p>
                  <p><strong>Data OUT:</strong> <code>"Hello world"</code> (string)</p>
                </div>
              </CardContent>
            </Card>

            <Separator />

            {/* 2. CUSTOM ROWS */}
            <Card>
              <CardHeader>
                <CardTitle>2. Custom Rows</CardTitle>
                <CardDescription>
                  <code>rows</code> — initial visible lines set karo.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <TextareaInput name="withRows" label="Long Message" placeholder="Write a detailed message..." rows={8} autoResize={false} />
                <div className="mt-4 bg-muted/50 rounded-lg p-4 text-sm">
                  <p><strong>Data IN:</strong> <code>rows=&#123;8&#125;</code>, <code>autoResize=&#123;false&#125;</code></p>
                  <p><strong>Data OUT:</strong> Same string — fixed 8 rows</p>
                </div>
              </CardContent>
            </Card>

            {/* 3. AUTO RESIZE */}
            <Card>
              <CardHeader>
                <CardTitle>3. Auto Resize</CardTitle>
                <CardDescription>
                  <code>autoResize</code> — content ke according height badhegi. Default <code>true</code>.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <TextareaInput name="autoResize" label="Auto Growing" placeholder="Type multiple lines and watch the height grow..." />
                <div className="mt-4 bg-muted/50 rounded-lg p-4 text-sm">
                  <p><strong>Data IN:</strong> <code>autoResize=&#123;true&#125;</code> (default)</p>
                  <p><strong>Data OUT:</strong> Same string — height auto</p>
                </div>
              </CardContent>
            </Card>

            <Separator />

            {/* 4. DISABLED */}
            <Card>
              <CardHeader>
                <CardTitle>4. Disabled</CardTitle>
                <CardDescription>
                  <code>disabled=true</code> — textarea edit nahi hoga.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <TextareaInput name="disabled" label="Disabled Field" placeholder="Cannot edit" disabled />
                <div className="mt-4 bg-muted/50 rounded-lg p-4 text-sm">
                  <p><strong>Data IN:</strong> <code>disabled=&#123;true&#125;</code> + <code>defaultValues: &#123; disabled: "Fixed size" &#125;</code></p>
                  <p><strong>Data OUT:</strong> <code>"Fixed size"</code> — unchanged</p>
                </div>
              </CardContent>
            </Card>

            {/* 5. MAX LENGTH */}
            <Card>
              <CardHeader>
                <CardTitle>5. Max Length</CardTitle>
                <CardDescription>
                  <code>maxLength</code> — character count + limit.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <TextareaInput name="maxLength" label="Short Bio" placeholder="Tell us about yourself..." maxLength={200} helperText="Max 200 characters" />
                <div className="mt-4 bg-muted/50 rounded-lg p-4 text-sm">
                  <p><strong>Data IN:</strong> <code>maxLength=&#123;200&#125;</code></p>
                  <p><strong>Data OUT:</strong> String — max 200 chars</p>
                </div>
              </CardContent>
            </Card>

            <Separator />

            {/* 6. REQUIRED */}
            <Card>
              <CardHeader>
                <CardTitle>6. Required</CardTitle>
                <CardDescription>
                  <code>is_required</code> — asterisk (*) label ke saath.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <TextareaInput name="required" label="Comments" placeholder="Write your comments..." is_required icon={MessageSquare} />
                <div className="mt-4 bg-muted/50 rounded-lg p-4 text-sm">
                  <p><strong>Data IN:</strong> <code>is_required=&#123;true&#125;</code> — sirf UI asterisk</p>
                  <p><strong>Data OUT:</strong> Same string</p>
                </div>
              </CardContent>
            </Card>

            {/* 7. ERROR */}
            <Card>
              <CardHeader>
                <CardTitle>7. Error</CardTitle>
                <CardDescription>
                  <code>error</code> — red border + text. <code>helperText</code> — grey hint.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <TextareaInput label="With Error" placeholder="Enter text" error="This field is required" />
                <TextareaInput label="With Helper" placeholder="Enter text" helperText="Markdown is supported" />
                <div className="bg-muted/50 rounded-lg p-4 text-sm">
                  <p><strong>Data IN:</strong> <code>error="..."</code> — sirf UI</p>
                  <p><strong>Data OUT:</strong> Same string — error display only</p>
                </div>
              </CardContent>
            </Card>

            <Separator />

            {/* 8. FORM INTEGRATION */}
            <Card>
              <CardHeader>
                <CardTitle>8. Form Integration</CardTitle>
                <CardDescription>
                  Submit karke live payload dekho. Sab fields react-hook-form se connected.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={form.handleSubmit((data) => alert(JSON.stringify(data, null, 2)))} className="space-y-4">
                  <TextareaInput name="basic" label="Description" placeholder="Write something..." />
                  <TextareaInput name="required" label="Comments" placeholder="Write comments..." is_required />
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
