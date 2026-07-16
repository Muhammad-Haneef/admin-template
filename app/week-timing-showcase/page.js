"use client"

import { useForm, FormProvider, useFormContext } from "react-hook-form"
import { WeekTimingInput } from "@/components/FormElements"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Clock, Calendar, Plus } from "lucide-react"

const defaultValues = {
  basic: {
    monday:    { enabled: false, slots: [{ start: "09:00", end: "17:00" }] },
    tuesday:   { enabled: true, slots: [{ start: "10:00", end: "18:00" }] },
    wednesday: { enabled: false, slots: [{ start: "09:00", end: "17:00" }] },
    thursday:  { enabled: false, slots: [{ start: "09:00", end: "17:00" }] },
    friday:    { enabled: false, slots: [{ start: "09:00", end: "17:00" }] },
    saturday:  { enabled: false, slots: [{ start: "09:00", end: "17:00" }] },
    sunday:    { enabled: false, slots: [{ start: "09:00", end: "17:00" }] },
  },
}

const multiSlotValues = {
  monday:    { enabled: true, slots: [{ start: "09:00", end: "12:00" }, { start: "14:00", end: "18:00" }] },
  tuesday:   { enabled: true, slots: [{ start: "08:00", end: "12:00" }, { start: "13:00", end: "17:00" }, { start: "19:00", end: "21:00" }] },
  wednesday: { enabled: false, slots: [{ start: "09:00", end: "17:00" }] },
  thursday:  { enabled: false, slots: [{ start: "09:00", end: "17:00" }] },
  friday:    { enabled: false, slots: [{ start: "09:00", end: "17:00" }] },
  saturday:  { enabled: false, slots: [{ start: "09:00", end: "17:00" }] },
  sunday:    { enabled: false, slots: [{ start: "09:00", end: "17:00" }] },
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

export default function WeekTimingShowcasePage() {
  const methods = useForm({ defaultValues })

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-10 max-w-7xl">
        <h1 className="text-3xl font-bold mb-2">WeekTimingInput Showcase</h1>
        <p className="text-muted-foreground mb-8">
          A week timing input for setting daily time slots with enable/disable toggles.
        </p>
        <FormProvider {...methods}>
          <div className="flex gap-8">
            <div className="flex-1 space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Basic Usage</CardTitle>
                  <CardDescription>
                    Default week timing with standard 9AM-5PM slots.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-xs text-muted-foreground">
                    <strong>Data IN:</strong> name="basic" default=&#123;monday:&#123;enabled:false, slots:&#123;start:"09:00", end:"17:00"&#125;&#125;, ...&#125;
                  </div>
                  <WeekTimingInput name="basic" label="Week Schedule" />
                  <div className="text-xs text-muted-foreground">
                    <strong>Data OUT:</strong> Object with day keys containing enabled + slots
                  </div>
                </CardContent>
              </Card>

              <Separator />

              <Card>
                <CardHeader>
                  <CardTitle>Pre-filled</CardTitle>
                  <CardDescription>
                    Week timing with pre-filled business hours.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-xs text-muted-foreground">
                    <strong>Data IN:</strong> default=&#123;monday:&#123;enabled:true, slots:&#123;start:"09:00", end:"17:00"&#125;&#125;, ...&#125;
                  </div>
                  <WeekTimingInput name="basic" label="Pre-filled Schedule" />
                  <div className="text-xs text-muted-foreground">
                    <strong>Data OUT:</strong> Updated schedule object
                  </div>
                </CardContent>
              </Card>

              <Separator />

              <Card>
                <CardHeader>
                  <CardTitle>Multiple Slots</CardTitle>
                  <CardDescription>
                    Week timing with multiple time slots per day.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-xs text-muted-foreground">
                    <strong>Data IN:</strong> default=&#123;monday:&#123;enabled:true, slots:&#91;&#123;start:"09:00", end:"12:00"&#125;, &#123;start:"14:00", end:"18:00"&#125;&#93;&#125;, ...&#125;
                  </div>
                  <WeekTimingInput
                    name="basic"
                    label="Multiple Slots Schedule"
                    allowMultipleSlots
                  />
                  <div className="text-xs text-muted-foreground">
                    <strong>Data OUT:</strong> Object with multiple slots per day
                  </div>
                </CardContent>
              </Card>

              <Separator />

              <Card>
                <CardHeader>
                  <CardTitle>Disabled</CardTitle>
                  <CardDescription>
                    A disabled week timing input that cannot be changed.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-xs text-muted-foreground">
                    <strong>Data IN:</strong> disabled + default schedule
                  </div>
                  <WeekTimingInput name="basic" label="Disabled Schedule" disabled />
                  <div className="text-xs text-muted-foreground">
                    <strong>Data OUT:</strong> Schedule object (unchanged)
                  </div>
                </CardContent>
              </Card>

              <Separator />

              <Card>
                <CardHeader>
                  <CardTitle>Form Integration</CardTitle>
                  <CardDescription>
                    Submit the form to see the week timing value.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-xs text-muted-foreground">
                    <strong>Data IN:</strong> Week timing field in a form
                  </div>
                  <WeekTimingInput name="basic" label="Schedule" />
                  <Button
                    type="button"
                    onClick={methods.handleSubmit((data) => {
                      alert(JSON.stringify(data, null, 2))
                    })}
                  >
                    Submit Form
                  </Button>
                  <div className="text-xs text-muted-foreground">
                    <strong>Data OUT:</strong> Object with all day schedules
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
