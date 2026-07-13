"use client";

import { useFormContext, useWatch } from "react-hook-form";
import { UserPlus } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SelectInput } from "@/components/FormElements";

const CLIENT_OPTIONS = [
  { value: "c1", label: "Al Rehman Traders" },
  { value: "c2", label: "Karachi Auto Spares" },
  { value: "c3", label: "Bilal Enterprises" },
];

export default function ClientSelector() {
  const { control, setValue } = useFormContext();
  const clientId = useWatch({ control, name: "clientId" });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quotation For</CardTitle>
        <CardDescription>Client's details</CardDescription>
      </CardHeader>
      <CardContent>
        <SelectInput
          name="clientId"
          label="Client"
          placeholder="Select a client"
          options={CLIENT_OPTIONS}
          is_required
          onValueChange={(val) => setValue("client", CLIENT_OPTIONS.find((c) => c.value === val) || null)}
        />

        {!clientId && (
          <div className="mt-4 rounded-lg border border-dashed p-6 text-center flex flex-col items-center gap-3">
            <p className="text-sm text-muted-foreground">Select a client from the list</p>
            <p className="text-xs text-muted-foreground">OR</p>
            <button
              type="button"
              onClick={() => {
                setValue("clientId", "c1");
                setValue("client", CLIENT_OPTIONS[0]);
              }}
              className="inline-flex items-center gap-1.5 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-medium px-4 py-2"
            >
              <UserPlus className="w-4 h-4" /> Add New Client
            </button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
