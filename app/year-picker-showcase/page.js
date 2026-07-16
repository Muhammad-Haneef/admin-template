"use client"

import { useForm, FormProvider, useFormContext } from "react-hook-form"
import { YearPicker } from "@/components/FormElements"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Calendar, ChevronDown } from "lucide-react"

const defaultValues = {
  basic: "",
  preSelected: 2024,
  disabled: 2023,
  required: "",
}

function LiveJsonPanel() {
  const { watch } = useFormContext()
  const watchedValues = watch()

  return (
    <div className="w-80 shrink-0">
      <div className="sticky top-10 space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Default Values (Data IN)</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="text-xs bg-muted p-3 rounded-md overflow-auto max-h-60">
              {JSON.stringify(defaultValues, null, 2)}
            </pre>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Live Watched Values (Data OUT)</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="text-xs bg-muted p-3 rounded-md overflow-auto max-h-60">
              {JSON.stringify(watchedValues, null, 2)}
            </pre>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function YearPickerShowcasePage() {
  const methods = useForm({ defaultValues })

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-10 max-w-7xl">
        <h1 className="text-3xl font-bold mb-2">YearPicker Showcase</h1>
        <p className="text-muted-foreground mb-8">
          A year picker component for selecting a year from a dropdown.
        </p>
        <FormProvider {...methods}>
          <div className="flex gap-8">
            <div className="flex-1 space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Basic Usage</CardTitle>
                  <CardDescription>
                    Default year picker with standard year range.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-xs text-muted-foreground">
                    <strong>Data IN:</strong> name="basic" default="" (empty string)
                  </div>
                  <YearPicker name="basic" label="Select Year" />
                  <div className="text-xs text-muted-foreground">
                    <strong>Data OUT:</strong> Year number like 2024 or ""
                  </div>
                </CardContent>
              </Card>

              <Separator />

              <Card>
                <CardHeader>
                  <CardTitle>Pre-selected</CardTitle>
                  <CardDescription>
                    A year picker with a pre-selected year.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-xs text-muted-foreground">
                    <strong>Data IN:</strong> name="preSelected" default=2024
                  </div>
                  <YearPicker
                    name="preSelected"
                    label="Pre-selected Year"
                  />
                  <div className="text-xs text-muted-foreground">
                    <strong>Data OUT:</strong> Year number 2024
                  </div>
                </CardContent>
              </Card>

              <Separator />

              <Card>
                <CardHeader>
                  <CardTitle>Custom Range (minYear / maxYear)</CardTitle>
                  <CardDescription>
                    Limiting the available years with minYear and maxYear.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-xs text-muted-foreground">
                    <strong>Data IN:</strong> minYear=2020 maxYear=2030
                  </div>
                  <YearPicker
                    name="basic"
                    label="Custom Range"
                    minYear={2020}
                    maxYear={2030}
                  />
                  <div className="text-xs text-muted-foreground">
                    <strong>Data OUT:</strong> Year number between 2020-2030
                  </div>
                </CardContent>
              </Card>

              <Separator />

              <Card>
                <CardHeader>
                  <CardTitle>Disabled</CardTitle>
                  <CardDescription>
                    A disabled year picker that cannot be changed.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-xs text-muted-foreground">
                    <strong>Data IN:</strong> name="disabled" default=2023 + disabled
                  </div>
                  <YearPicker
                    name="disabled"
                    label="Disabled Year"
                    disabled
                  />
                  <div className="text-xs text-muted-foreground">
                    <strong>Data OUT:</strong> Year number 2023 (unchanged)
                  </div>
                </CardContent>
              </Card>

              <Separator />

              <Card>
                <CardHeader>
                  <CardTitle>Required</CardTitle>
                  <CardDescription>
                    A required year picker with validation indicator.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-xs text-muted-foreground">
                    <strong>Data IN:</strong> name="required" default="" + is_required
                  </div>
                  <YearPicker
                    name="required"
                    label="Required Year"
                    is_required
                  />
                  <div className="text-xs text-muted-foreground">
                    <strong>Data OUT:</strong> Year number
                  </div>
                </CardContent>
              </Card>

              <Separator />

              <Card>
                <CardHeader>
                  <CardTitle>Error State</CardTitle>
                  <CardDescription>
                    Year picker with an error message displayed.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-xs text-muted-foreground">
                    <strong>Data IN:</strong> name="basic" + error="Please select a year"
                  </div>
                  <YearPicker
                    name="basic"
                    label="Year with Error"
                    error="Please select a year"
                  />
                  <div className="text-xs text-muted-foreground">
                    <strong>Data OUT:</strong> Validation state
                  </div>
                </CardContent>
              </Card>

              <Separator />

              <Card>
                <CardHeader>
                  <CardTitle>Form Integration</CardTitle>
                  <CardDescription>
                    Submit the form to see all year picker values.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-xs text-muted-foreground">
                    <strong>Data IN:</strong> Multiple year picker fields in a form
                  </div>
                  <YearPicker name="basic" label="Select Year" />
                  <YearPicker name="preSelected" label="Pre-selected" />
                  <Button
                    type="button"
                    onClick={methods.handleSubmit((data) => {
                      alert(JSON.stringify(data, null, 2))
                    })}
                  >
                    Submit Form
                  </Button>
                  <div className="text-xs text-muted-foreground">
                    <strong>Data OUT:</strong> Object with all field values
                  </div>
                </CardContent>
              </Card>
            </div>
            <LiveJsonPanel />
          </div>
        </FormProvider>
      </div>
    </div>
  )
}
