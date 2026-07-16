"use client";

import { useForm, FormProvider, useFormContext } from "react-hook-form";
import MultiSelectInput from "@/components/FormElements/multi-select-input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Apple, Cherry, Grape, Citrus, Banana as BananaIcon, Tag } from "lucide-react";

const fruits = [
  { id: "apple", title: "Apple", icon: <Apple className="h-4 w-4" /> },
  { id: "banana", title: "Banana", icon: <BananaIcon className="h-4 w-4" /> },
  { id: "mango", title: "Mango", icon: <Cherry className="h-4 w-4" /> },
  { id: "grapes", title: "Grapes", icon: <Grape className="h-4 w-4" /> },
  { id: "orange", title: "Orange", icon: <Citrus className="h-4 w-4" /> },
];

const tags = [
  { id: "react", title: "React" },
  { id: "nextjs", title: "Next.js" },
  { id: "typescript", title: "TypeScript" },
  { id: "tailwind", title: "Tailwind CSS" },
  { id: "prisma", title: "Prisma" },
];

const defaultValues = {
  basic: ["apple"],
  tags: [],
  disabled: ["banana"],
  required: [],
  clearable: [],
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

export default function MultiSelectInputShowcase() {
  const form = useForm({ defaultValues });

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-10 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Multi Select Input — Showcase & Guide</h1>
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
                  Multi-select dropdown — <code>array</code> of strings. Ek se zyada select karo.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <MultiSelectInput name="basic" label="Fruits" placeholder="Pick fruits" options={fruits} />
                <div className="mt-4 bg-muted/50 rounded-lg p-4 text-sm space-y-1">
                  <p><strong>Data IN:</strong> <code>&#123; basic: ["apple"] &#125;</code></p>
                  <p><strong>Data OUT:</strong> <code>["apple", "banana"]</code> (array of strings)</p>
                  <p className="text-muted-foreground text-xs mt-2">Options: <code>[&#123; id: "apple", title: "Apple" &#125;, ...]</code></p>
                </div>
              </CardContent>
            </Card>

            <Separator />

            {/* 2. DEFAULT VALUES */}
            <Card>
              <CardHeader>
                <CardTitle>2. Default Values</CardTitle>
                <CardDescription>
                  <code>defaultValues</code> mein <code>array</code> do — pehle se selected.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <MultiSelectInput name="basic" label="Pre-selected" placeholder="Pick fruits" options={fruits} />
                <div className="mt-4 bg-muted/50 rounded-lg p-4 text-sm">
                  <p><strong>Data IN:</strong> <code>defaultValues: &#123; basic: ["apple"] &#125;</code></p>
                  <p><strong>Data OUT:</strong> Array — badges dikhte hain pre-selected</p>
                </div>
              </CardContent>
            </Card>

            {/* 3. SEARCHABLE */}
            <Card>
              <CardHeader>
                <CardTitle>3. Searchable</CardTitle>
                <CardDescription>
                  <code>searchable=true</code> — dropdown mein search box. Default <code>true</code>.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <MultiSelectInput name="tags" label="Tech Stack" placeholder="Search technologies..." options={tags} searchable />
                <div className="mt-4 bg-muted/50 rounded-lg p-4 text-sm">
                  <p><strong>Data IN:</strong> <code>searchable=&#123;true&#125;</code> + <code>defaultValues: &#123; tags: [] &#125;</code></p>
                  <p><strong>Data OUT:</strong> <code>["react", "nextjs"]</code></p>
                </div>
              </CardContent>
            </Card>

            <Separator />

            {/* 4. CLEARABLE */}
            <Card>
              <CardHeader>
                <CardTitle>4. Clearable</CardTitle>
                <CardDescription>
                  <code>clearable=true</code> — X button se sab selections clear. Default <code>true</code>.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <MultiSelectInput name="clearable" label="Clearable" placeholder="Pick and clear..." options={fruits} clearable />
                <div className="mt-4 bg-muted/50 rounded-lg p-4 text-sm">
                  <p><strong>Data IN:</strong> <code>clearable=&#123;true&#125;</code> (default)</p>
                  <p><strong>Data OUT:</strong> <code>[]</code> (cleared) ya <code>["apple","mango"]</code></p>
                </div>
              </CardContent>
            </Card>

            {/* 5. DISABLED */}
            <Card>
              <CardHeader>
                <CardTitle>5. Disabled</CardTitle>
                <CardDescription>
                  <code>disabled=true</code> — poori multi-select band.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <MultiSelectInput name="disabled" label="Disabled Select" placeholder="Cannot change" options={fruits} disabled />
                <div className="mt-4 bg-muted/50 rounded-lg p-4 text-sm">
                  <p><strong>Data IN:</strong> <code>disabled=&#123;true&#125;</code> + <code>defaultValues: &#123; disabled: ["banana"] &#125;</code></p>
                  <p><strong>Data OUT:</strong> <code>["banana"]</code> — unchanged, badges visible</p>
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
                <MultiSelectInput name="required" label="Required Selection" placeholder="Must select at least one" options={fruits} is_required />
                <div className="mt-4 bg-muted/50 rounded-lg p-4 text-sm">
                  <p><strong>Data IN:</strong> <code>is_required=&#123;true&#125;</code> — sirf UI asterisk</p>
                  <p><strong>Data OUT:</strong> Array of strings</p>
                </div>
              </CardContent>
            </Card>

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
                  <MultiSelectInput name="basic" label="Fruits" placeholder="Pick fruits" options={fruits} />
                  <MultiSelectInput name="tags" label="Tech Stack" placeholder="Pick technologies" options={tags} searchable />
                  <MultiSelectInput name="required" label="Required" placeholder="Must select" options={fruits} is_required />
                  <Button type="submit">Submit Form</Button>
                </form>
                <div className="mt-4 bg-muted/50 rounded-lg p-4 text-sm">
                  <p><strong>Data IN:</strong> All field values in <code>defaultValues</code> format</p>
                  <p><strong>Data OUT:</strong> <code>&#123; basic: ["apple"], tags: ["react"], required: [...] &#125;</code></p>
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
