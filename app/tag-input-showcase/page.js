"use client";

import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { TagInput } from "@/components/FormElements";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const defaultValues = {
  basic: [],
  withDefaults: ["react", "nextjs", "typescript"],
  maxTags: [],
  disabled: ["locked"],
  required: [],
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

export default function TagInputShowcase() {
  const form = useForm({ defaultValues });

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-10 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Tag Input — Showcase & Guide</h1>
          <p className="text-muted-foreground mt-2">
            Add/remove tags with Enter key, configurable limits, and duplicate control.
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
                    Empty tag input — type and press Enter to add tags. Value is a string array.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <TagInput name="basic" label="Add Tags" placeholder="Type a tag and press Enter..." />
                  <div className="mt-4 bg-muted/50 rounded-lg p-4 text-sm space-y-1">
                    <p><strong>Data IN:</strong> <code>{'{ basic: [] }'}</code></p>
                    <p><strong>Data OUT:</strong> Array e.g. <code>["react", "node"]</code></p>
                  </div>
                </CardContent>
              </Card>

              {/* 2. DEFAULT VALUES */}
              <Card>
                <CardHeader>
                  <CardTitle>2. Default Values</CardTitle>
                  <CardDescription>
                    Pre-populated with <code>["react", "nextjs", "typescript"]</code>.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <TagInput name="withDefaults" label="Tech Stack" />
                  <div className="mt-4 bg-muted/50 rounded-lg p-4 text-sm">
                    <p><strong>Data IN:</strong> <code>{'{ withDefaults: ["react", "nextjs", "typescript"] }'}</code></p>
                    <p><strong>Data OUT:</strong> Array — modified as user adds/removes</p>
                  </div>
                </CardContent>
              </Card>

              <Separator />

              {/* 3. MAX TAGS */}
              <Card>
                <CardHeader>
                  <CardTitle>3. Max Tags</CardTitle>
                  <CardDescription>
                    <code>maxTags=3</code> — limit to 3 tags with counter.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <TagInput name="maxTags" label="Skills (max 3)" maxTags={3} placeholder="Add up to 3 skills..." />
                  <div className="mt-4 bg-muted/50 rounded-lg p-4 text-sm">
                    <p><strong>Data IN:</strong> <code>maxTags=3</code> + empty array</p>
                    <p><strong>Data OUT:</strong> Array — max 3 items</p>
                  </div>
                </CardContent>
              </Card>

              {/* 4. ALLOW DUPLICATES */}
              <Card>
                <CardHeader>
                  <CardTitle>4. Allow Duplicates</CardTitle>
                  <CardDescription>
                    <code>allowDuplicates=true</code> — same tag can be added multiple times.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <TagInput name="_dup1" label="Colors" allowDuplicates placeholder="e.g. red, red, blue..." />
                  <div className="mt-4 bg-muted/50 rounded-lg p-4 text-sm">
                    <p><strong>Data IN:</strong> <code>allowDuplicates={'{true}'}</code></p>
                    <p><strong>Data OUT:</strong> Array — duplicates allowed</p>
                  </div>
                </CardContent>
              </Card>

              <Separator />

              {/* 5. DISABLED */}
              <Card>
                <CardHeader>
                  <CardTitle>5. Disabled</CardTitle>
                  <CardDescription>
                    <code>disabled=true</code> — pre-filled with <code>["locked"]</code>.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <TagInput name="disabled" label="Locked Tags" disabled />
                  <div className="mt-4 bg-muted/50 rounded-lg p-4 text-sm">
                    <p><strong>Data IN:</strong> <code>disabled={'{true}'}</code> + <code>["locked"]</code></p>
                    <p><strong>Data OUT:</strong> Stays <code>["locked"]</code></p>
                  </div>
                </CardContent>
              </Card>

              {/* 6. REQUIRED */}
              <Card>
                <CardHeader>
                  <CardTitle>6. Required</CardTitle>
                  <CardDescription>
                    <code>is_required</code> — asterisk on label.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <TagInput name="required" label="Required Tags" is_required />
                  <div className="mt-4 bg-muted/50 rounded-lg p-4 text-sm">
                    <p><strong>Data IN:</strong> <code>is_required</code> — UI only</p>
                    <p><strong>Data OUT:</strong> Array of strings</p>
                  </div>
                </CardContent>
              </Card>

              {/* 7. FORM INTEGRATION */}
              <Card>
                <CardHeader>
                  <CardTitle>7. Form Integration</CardTitle>
                  <CardDescription>
                    All inputs in one form — watch payload on the right.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <TagInput name="basic" label="Basic" />
                  <TagInput name="withDefaults" label="Default Tags" />
                  <TagInput name="maxTags" label="Max 3" maxTags={3} />
                  <TagInput name="disabled" label="Locked" disabled />
                  <TagInput name="required" label="Required" is_required />
                  <div className="bg-muted/50 rounded-lg p-4 text-sm">
                    <p><strong>Format:</strong> Each field stores <code>string[]</code></p>
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
