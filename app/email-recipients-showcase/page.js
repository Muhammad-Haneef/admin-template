"use client"

import { useForm, FormProvider, useFormContext } from "react-hook-form"
import { EmailRecipientsSelector } from "@/components/FormElements"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Mail, Users, FileText, Briefcase } from "lucide-react"

const defaultValues = {
  basic: [],
  preSelected: [{ label: "John Doe", value: "user_john_doe", type: "user" }],
  disabled: [],
  required: [],
}

const sampleUsers = [
  { label: "John Doe", value: "user_john_doe" },
  { label: "Jane Smith", value: "user_jane_smith" },
  { label: "Bob Wilson", value: "user_bob_wilson" },
  { label: "Alice Brown", value: "user_alice_brown" },
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

export default function EmailRecipientsShowcasePage() {
  const methods = useForm({ defaultValues })

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-10 max-w-7xl">
        <h1 className="text-3xl font-bold mb-2">EmailRecipientsSelector Showcase</h1>
        <p className="text-muted-foreground mb-8">
          An email recipients selector for adding multiple recipients with type indicators.
        </p>
        <FormProvider {...methods}>
          <div className="flex gap-8">
            <div className="flex-1 space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Basic Usage</CardTitle>
                  <CardDescription>
                    Default email recipients selector with empty initial value.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-xs text-muted-foreground">
                    <strong>Data IN:</strong> name="basic" default=[] (empty array)
                  </div>
                  <EmailRecipientsSelector
                    name="basic"
                    label="Email Recipients"
                    module="Leads"
                  />
                  <div className="text-xs text-muted-foreground">
                    <strong>Data OUT:</strong> Array of &#123;label, value, type&#125; objects
                  </div>
                </CardContent>
              </Card>

              <Separator />

              <Card>
                <CardHeader>
                  <CardTitle>Pre-selected</CardTitle>
                  <CardDescription>
                    An email recipients selector with pre-selected recipients.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-xs text-muted-foreground">
                    <strong>Data IN:</strong> name="preSelected" default=[&#123;label:"John Doe", value:"user_john_doe", type:"user"&#125;]
                  </div>
                  <EmailRecipientsSelector
                    name="preSelected"
                    label="Pre-selected Recipients"
                    module="Leads"
                  />
                  <div className="text-xs text-muted-foreground">
                    <strong>Data OUT:</strong> Array with pre-selected user
                  </div>
                </CardContent>
              </Card>

              <Separator />

              <Card>
                <CardHeader>
                  <CardTitle>Different Modules</CardTitle>
                  <CardDescription>
                    The selector works with different modules like Leads, Contacts, and Deals.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-xs text-muted-foreground">
                    <strong>Data IN:</strong> module="Leads" | module="Contacts" | module="Deals"
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm font-medium mb-2">Leads Module</p>
                      <EmailRecipientsSelector
                        name="basic"
                        label="Leads Recipients"
                        module="Leads"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-2">Contacts Module</p>
                      <EmailRecipientsSelector
                        name="basic"
                        label="Contacts Recipients"
                        module="Contacts"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-2">Deals Module</p>
                      <EmailRecipientsSelector
                        name="basic"
                        label="Deals Recipients"
                        module="Deals"
                      />
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    <strong>Data OUT:</strong> Array of recipient objects
                  </div>
                </CardContent>
              </Card>

              <Separator />

              <Card>
                <CardHeader>
                  <CardTitle>Disabled</CardTitle>
                  <CardDescription>
                    A disabled email recipients selector that cannot be changed.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-xs text-muted-foreground">
                    <strong>Data IN:</strong> name="disabled" default=[] + disabled
                  </div>
                  <EmailRecipientsSelector
                    name="disabled"
                    label="Disabled Recipients"
                    module="Leads"
                    disabled
                  />
                  <div className="text-xs text-muted-foreground">
                    <strong>Data OUT:</strong> Empty array (unchanged)
                  </div>
                </CardContent>
              </Card>

              <Separator />

              <Card>
                <CardHeader>
                  <CardTitle>Required</CardTitle>
                  <CardDescription>
                    A required email recipients selector with validation indicator.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-xs text-muted-foreground">
                    <strong>Data IN:</strong> name="required" default=[] + is_required
                  </div>
                  <EmailRecipientsSelector
                    name="required"
                    label="Required Recipients"
                    module="Leads"
                    is_required
                  />
                  <div className="text-xs text-muted-foreground">
                    <strong>Data OUT:</strong> Array of recipient objects
                  </div>
                </CardContent>
              </Card>

              <Separator />

              <Card>
                <CardHeader>
                  <CardTitle>Error State</CardTitle>
                  <CardDescription>
                    Email recipients selector with an error message displayed.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-xs text-muted-foreground">
                    <strong>Data IN:</strong> name="basic" + error="Please add at least one recipient"
                  </div>
                  <EmailRecipientsSelector
                    name="basic"
                    label="Recipients with Error"
                    module="Leads"
                    error="Please add at least one recipient"
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
                    Submit the form to see all email recipient values.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-xs text-muted-foreground">
                    <strong>Data IN:</strong> Multiple email recipient fields in a form
                  </div>
                  <EmailRecipientsSelector
                    name="basic"
                    label="Recipients"
                    module="Leads"
                  />
                  <EmailRecipientsSelector
                    name="preSelected"
                    label="Pre-selected"
                    module="Leads"
                  />
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
