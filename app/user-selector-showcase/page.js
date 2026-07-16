"use client"

import { useForm, FormProvider, useFormContext } from "react-hook-form"
import { UserSelector } from "@/components/FormElements"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { User } from "lucide-react"

const defaultValues = {
  basic: null,
  preSelected: 1,
  disabled: 2,
  required: null,
}

const sampleUsers = [
  { id: 1, first_name: "John", last_name: "Doe", email: "john@example.com", profile_image: null },
  { id: 2, first_name: "Jane", last_name: "Smith", email: "jane@example.com", profile_image: null },
  { id: 3, first_name: "Bob", last_name: "Wilson", email: "bob@example.com", profile_image: null },
  { id: 4, first_name: "Alice", last_name: "Brown", email: "alice@example.com", profile_image: null },
]

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

export default function UserSelectorShowcasePage() {
  const methods = useForm({ defaultValues })

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-10 max-w-7xl">
        <h1 className="text-3xl font-bold mb-2">UserSelector Showcase</h1>
        <p className="text-muted-foreground mb-8">
          A user selector component for picking users from a searchable dropdown.
        </p>
        <FormProvider {...methods}>
          <div className="flex gap-8">
            <div className="flex-1 space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Basic Usage</CardTitle>
                  <CardDescription>
                    Default user selector with searchable dropdown.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-xs text-muted-foreground">
                    <strong>Data IN:</strong> name="basic" default=null
                  </div>
                  <UserSelector name="basic" label="Select User" />
                  <div className="text-xs text-muted-foreground">
                    <strong>Data OUT:</strong> User ID (number) or null
                  </div>
                </CardContent>
              </Card>

              <Separator />

              <Card>
                <CardHeader>
                  <CardTitle>Pre-selected</CardTitle>
                  <CardDescription>
                    A user selector with a pre-selected user.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-xs text-muted-foreground">
                    <strong>Data IN:</strong> name="preSelected" default=1
                  </div>
                  <UserSelector
                    name="preSelected"
                    label="Pre-selected User"
                  />
                  <div className="text-xs text-muted-foreground">
                    <strong>Data OUT:</strong> User ID 1
                  </div>
                </CardContent>
              </Card>

              <Separator />

              <Card>
                <CardHeader>
                  <CardTitle>Disabled</CardTitle>
                  <CardDescription>
                    A disabled user selector that cannot be changed.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-xs text-muted-foreground">
                    <strong>Data IN:</strong> name="disabled" default=2 + disabled
                  </div>
                  <UserSelector
                    name="disabled"
                    label="Disabled User"
                    disabled
                  />
                  <div className="text-xs text-muted-foreground">
                    <strong>Data OUT:</strong> User ID 2 (unchanged)
                  </div>
                </CardContent>
              </Card>

              <Separator />

              <Card>
                <CardHeader>
                  <CardTitle>Required</CardTitle>
                  <CardDescription>
                    A required user selector with validation indicator.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-xs text-muted-foreground">
                    <strong>Data IN:</strong> name="required" default=null + is_required
                  </div>
                  <UserSelector
                    name="required"
                    label="Required User"
                    is_required
                  />
                  <div className="text-xs text-muted-foreground">
                    <strong>Data OUT:</strong> User ID (number)
                  </div>
                </CardContent>
              </Card>

              <Separator />

              <Card>
                <CardHeader>
                  <CardTitle>Error State</CardTitle>
                  <CardDescription>
                    User selector with an error message displayed.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-xs text-muted-foreground">
                    <strong>Data IN:</strong> name="basic" + error="Please select a user"
                  </div>
                  <UserSelector
                    name="basic"
                    label="User with Error"
                    error="Please select a user"
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
                    Submit the form to see all user selector values.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-xs text-muted-foreground">
                    <strong>Data IN:</strong> Multiple user selector fields in a form
                  </div>
                  <UserSelector name="basic" label="Select User" />
                  <UserSelector name="preSelected" label="Pre-selected" />
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
