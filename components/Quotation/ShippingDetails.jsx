"use client";

import { useFormContext, useWatch } from "react-hook-form";
import { Card, CardContent } from "@/components/ui/card";
import { CheckboxInput, TextInput, TextareaInput, PhoneInput } from "@/components/FormElements";

export default function ShippingDetails() {
  const { control } = useFormContext();
  const shippingEnabled = useWatch({ control, name: "shippingEnabled" });

  return (
    <Card>
      <CardContent className="pt-6">
        <CheckboxInput name="shippingEnabled" label="Add Shipping Details" helperText="Ship to a different address than the client's billing address" />

        {shippingEnabled && (
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <TextInput name="shippingDetails.name" label="Recipient Name" placeholder="Full name" />
            <PhoneInput name="shippingDetails.phone" label="Phone" placeholder="+92 3xx xxxxxxx" />
            <div className="sm:col-span-2">
              <TextareaInput name="shippingDetails.address" label="Address" rows={2} placeholder="Street address" />
            </div>
            <TextInput name="shippingDetails.city" label="City" placeholder="City" />
            <TextInput name="shippingDetails.state" label="State / Province" placeholder="State" />
            <TextInput name="shippingDetails.postalCode" label="Postal Code" placeholder="Postal code" />
            <TextInput name="shippingDetails.country" label="Country" placeholder="Country" />
            <div className="sm:col-span-2">
              <TextareaInput name="shippingDetails.notes" label="Delivery Notes" rows={2} placeholder="Any special delivery instructions" />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
