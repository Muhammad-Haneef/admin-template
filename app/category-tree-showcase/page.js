"use client";

import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { CategoryTreeSelect } from "@/components/FormElements";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const categories = [
  {
    label: "Electronics",
    children: [
      { label: "Mobile Phones", children: [{ label: "Android" }, { label: "iOS" }, { label: "Other" }] },
      { label: "Laptops", children: [{ label: "Gaming" }, { label: "Business" }, { label: "Ultrabook" }] },
      { label: "Accessories", children: [{ label: "Chargers" }, { label: "Cases" }, { label: "Headphones" }] },
    ],
  },
  {
    label: "Fashion",
    children: [
      { label: "Men", children: [{ label: "Shirts" }, { label: "Pants" }, { label: "Shoes" }] },
      { label: "Women", children: [{ label: "Dresses" }, { label: "Tops" }, { label: "Bags" }] },
    ],
  },
  { label: "Home & Garden", children: [{ label: "Furniture" }, { label: "Lighting" }, { label: "Plants" }] },
  { label: "Sports", children: [{ label: "Cricket" }, { label: "Football" }, { label: "Tennis" }] },
];

const smallCategories = [
  { label: "Fruits", children: [{ label: "Apple" }, { label: "Banana" }, { label: "Mango" }] },
  { label: "Vegetables", children: [{ label: "Potato" }, { label: "Tomato" }, { label: "Onion" }] },
];

const defaultValues = {
  basic: "",
  shallow: "",
  preselected: "Electronics > Mobile Phones > Android",
  search: "",
  disabledEmpty: "",
  disabledPre: "Sports > Cricket",
  productCategory: "",
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

export default function CategoryTreeShowcase() {
  const form = useForm({ defaultValues });

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-10 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Category Tree Select — Showcase & Guide</h1>
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
                <CardDescription><code>name</code> + <code>categories</code> do. Leaf node select = full path.</CardDescription>
              </CardHeader>
              <CardContent>
                <CategoryTreeSelect name="basic" label="Select Category" placeholder="Browse categories..." categories={categories} helperText="Drill down karo, leaf select karo" />
                <div className="mt-4 bg-muted/50 rounded-lg p-4 text-sm space-y-1">
                  <p><strong>Data IN:</strong> <code>categories=&#123;[...]&#125;</code></p>
                  <p><strong>Data OUT:</strong> <code>"Electronics &gt; Mobile Phones &gt; Android"</code></p>
                </div>
              </CardContent>
            </Card>

            {/* 2. SHALLOW */}
            <Card>
              <CardHeader>
                <CardTitle>2. Shallow (No Children)</CardTitle>
                <CardDescription>Direct select — koi nesting nahi.</CardDescription>
              </CardHeader>
              <CardContent>
                <CategoryTreeSelect name="shallow" label="Pick a Fruit" placeholder="Choose..." categories={smallCategories} helperText="Direct select" />
                <div className="mt-4 bg-muted/50 rounded-lg p-4 text-sm">
                  <p><strong>Data OUT:</strong> Sirf label — <code>"Apple"</code> (no separator)</p>
                </div>
              </CardContent>
            </Card>

            <Separator />

            {/* 3. PRE-SELECTED */}
            <Card>
              <CardHeader>
                <CardTitle>3. Pre-selected Value</CardTitle>
                <CardDescription><code>defaultValues</code> mein path do.</CardDescription>
              </CardHeader>
              <CardContent>
                <CategoryTreeSelect name="preselected" label="Product Category" placeholder="Select..." categories={categories} />
                <div className="mt-4 bg-muted/50 rounded-lg p-4 text-sm">
                  <p><strong>Default:</strong> <code>"Electronics &gt; Mobile Phones &gt; Android"</code> — input mein dikhega</p>
                </div>
              </CardContent>
            </Card>

            {/* 4. SEARCH */}
            <Card>
              <CardHeader>
                <CardTitle>4. Search</CardTitle>
                <CardDescription>Top-level categories filter hotay hain.</CardDescription>
              </CardHeader>
              <CardContent>
                <CategoryTreeSelect name="search" label="Search & Select" placeholder="Type to search..." categories={categories} />
              </CardContent>
            </Card>

            <Separator />

            {/* 5. STATES */}
            <Card>
              <CardHeader>
                <CardTitle>5. States</CardTitle>
                <CardDescription>Disabled, Error, Required, Tooltip</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <p className="text-sm font-medium mb-3">Disabled</p>
                  <div className="flex flex-wrap items-end gap-8">
                    <CategoryTreeSelect name="disabledEmpty" label="Empty" categories={categories} disabled placeholder="Can't select" />
                    <CategoryTreeSelect name="disabledPre" label="Pre-selected" categories={categories} disabled />
                  </div>
                </div>
                <Separator />
                <div>
                  <p className="text-sm font-medium mb-3">Error</p>
                  <CategoryTreeSelect name="errorDemo" label="With Error" categories={categories} error="Ye field lazmi hai" />
                </div>
                <Separator />
                <div>
                  <p className="text-sm font-medium mb-3">Required + Tooltip</p>
                  <CategoryTreeSelect name="requiredTooltip" label="Category" categories={categories} is_required tooltip="Select the most specific category" helperText="Asterisk = required" />
                </div>
              </CardContent>
            </Card>

            {/* 6. FORM SUBMIT */}
            <Card>
              <CardHeader>
                <CardTitle>6. Form Submit</CardTitle>
                <CardDescription>Submit karo — live payload right panel mein dekho.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={form.handleSubmit((d) => alert(JSON.stringify(d, null, 2)))} className="space-y-6">
                  <CategoryTreeSelect name="productCategory" label="Product Category" placeholder="Select..." categories={categories} is_required helperText="Lazmi field" />
                  <div className="flex justify-end">
                    <Button type="submit">Submit</Button>
                  </div>
                </form>
                <div className="mt-4 bg-muted/50 rounded-lg p-4 text-sm">
                  <p><strong>Data OUT:</strong> <code>data.productCategory</code> — full path string</p>
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
