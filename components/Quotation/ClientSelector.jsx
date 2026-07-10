"use client";

import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { SelectInput, TextInput, TextareaInput, PhoneInput } from "@/components/FormElements";
import { UserPlus, User } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

// Mock client data - in real app, this would come from API
const mockClients = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    phone: "+923001234567",
    address: "123 Main Street, Karachi",
    city: "Karachi",
    country: "Pakistan"
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "+923009876543",
    address: "456 Business Ave, Lahore",
    city: "Lahore",
    country: "Pakistan"
  }
];

export default function ClientSelector() {
  const { setValue, watch } = useFormContext();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [clientsList, setClientsList] = useState(mockClients);
  const [newClientData, setNewClientData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: ""
  });

  const client = watch("client");

  const clientOptions = clientsList.map(c => ({
    label: c.name,
    value: c.id
  }));

  const handleClientSelect = (clientId) => {
    const selectedClient = clientsList.find(c => c.id === clientId);
    if (selectedClient) {
      setValue("client", selectedClient, { shouldValidate: true });
    }
  };

  const handleCreateClient = () => {
    // Generate new ID
    const newId = String(clientsList.length + 1);
    const newClient = {
      id: newId,
      ...newClientData
    };

    // Add to clients list
    setClientsList(prev => [...prev, newClient]);

    // Auto-select the newly created client
    setValue("client", newClient, { shouldValidate: true });

    // Reset form and close modal
    setNewClientData({
      name: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      country: ""
    });
    setIsCreateModalOpen(false);
  };

  const handleFieldChange = (field, value) => {
    setNewClientData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <>
      <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-border">
          <h3 className="text-base font-semibold flex items-center gap-2">
            <User className="w-5 h-5 text-primary" />
            Quotation For
          </h3>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setIsCreateModalOpen(true)}
            className="text-xs"
          >
            <UserPlus className="w-3 h-3 mr-1" />
            Add New Client
          </Button>
        </div>

        {/* Client Selector Dropdown */}
        <div className="mb-4">
          <SelectInput
            name="clientId"
            label="Select Client"
            placeholder="Search and select client..."
            options={clientOptions}
            onChange={handleClientSelect}
            is_required={true}
          />
        </div>

        {/* Display Selected Client Details */}
        {client && client.name ? (
          <div className="space-y-2 text-sm bg-muted/30 p-4 rounded-lg">
            <p className="font-semibold text-base">{client.name}</p>
            {client.email && (
              <p className="text-muted-foreground flex items-center gap-2">
                <span className="font-medium">Email:</span> {client.email}
              </p>
            )}
            {client.phone && (
              <p className="text-muted-foreground flex items-center gap-2">
                <span className="font-medium">Phone:</span> {client.phone}
              </p>
            )}
            {client.address && <p className="text-muted-foreground">{client.address}</p>}
            {(client.city || client.country) && (
              <p className="text-muted-foreground">
                {[client.city, client.country].filter(Boolean).join(", ")}
              </p>
            )}
          </div>
        ) : (
          <div className="text-center py-6 text-muted-foreground bg-muted/20 rounded-lg">
            <User className="w-10 h-10 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No client selected</p>
          </div>
        )}
      </div>

      {/* Create Client Modal */}
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Client</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <TextInput
              value={newClientData.name}
              onChange={(e) => handleFieldChange("name", e.target.value)}
              label="Client Name"
              placeholder="Enter client name"
              is_required={true}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TextInput
                value={newClientData.email}
                onChange={(e) => handleFieldChange("email", e.target.value)}
                label="Email"
                placeholder="client@example.com"
              />
              <PhoneInput
                value={newClientData.phone}
                onChange={(value) => handleFieldChange("phone", value)}
                label="Phone Number"
                defaultCountry="PK"
              />
            </div>

            <TextareaInput
              value={newClientData.address}
              onChange={(e) => handleFieldChange("address", e.target.value)}
              label="Address"
              placeholder="Enter complete address"
              rows={3}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TextInput
                value={newClientData.city}
                onChange={(e) => handleFieldChange("city", e.target.value)}
                label="City"
                placeholder="Enter city"
              />
              <TextInput
                value={newClientData.country}
                onChange={(e) => handleFieldChange("country", e.target.value)}
                label="Country"
                placeholder="Enter country"
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsCreateModalOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              type="button" 
              onClick={handleCreateClient}
              disabled={!newClientData.name}
            >
              Create & Select Client
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
