"use client";

import { createAddress } from "@/actions/createAddress";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Address } from "@/sanity.types";
import { useState } from "react";
import { toast } from "sonner";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: (address: Address) => void;
};

export function AddAddressDialog({ open, onOpenChange, onSuccess }: Props) {
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState<"home" | "office" | "other">("home");
  const [isDefault, setIsDefault] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = new FormData(e.currentTarget);
    const result = await createAddress({
      name: String(form.get("name")),
      phone: String(form.get("phone") || ""),
      address: String(form.get("address")),
      city: String(form.get("city")),
      state: String(form.get("state")),
      zip: String(form.get("zip")),
      type,
      default: isDefault,
    });

    setLoading(false);

    if (!result.success) {
      toast.error(result.error);
      return;
    }

    toast.success("Address added");
    onSuccess(result.address);
    onOpenChange(false);
    e.currentTarget.reset();
    setType("home");
    setIsDefault(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Address</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
    <div className="space-y-2">
      <Label htmlFor="address-name">Address label</Label>
      <Input
        id="address-name"
        name="name"
        placeholder="Home, Work..."
        required
        maxLength={50}
        className="h-10 bg-white"
      />
    </div>
    <div className="space-y-2">
      <Label htmlFor="phone">Phone (optional)</Label>
      <Input
        id="phone"
        name="phone"
        type="tel"
        placeholder="555-123-4567"
        className="h-10 bg-white"
      />
    </div>
  </div>
  <div className="space-y-2">
    <Label htmlFor="address">Street address</Label>
    <Input
      id="address"
      name="address"
      placeholder="123 Main St, Apt 4"
      required
      minLength={5}
      maxLength={200}
      className="h-10 bg-white"
    />
  </div>
  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
    <div className="space-y-2">
      <Label htmlFor="city">City</Label>
      <Input
        id="city"
        name="city"
        placeholder="New York"
        required
        maxLength={50}
        className="h-10 bg-white"
      />
    </div>
    <div className="space-y-2">
      <Label htmlFor="state">State</Label>
      <Input
        id="state"
        name="state"
        placeholder="NY"
        required
        maxLength={50}
        className="h-10 bg-white"
      />
    </div>
    <div className="space-y-2">
      <Label htmlFor="zip">ZIP code</Label>
      <Input
        id="zip"
        name="zip"
        placeholder="12345"
        required
        pattern="^\d{5}(-\d{4})?$"
        title="Format: 12345 or 12345-6789"
        className="h-10 bg-white"
      />
    </div>
  </div>
  <div className="space-y-2">
    <Label htmlFor="address-type">Address type</Label>
    <Select
      value={type}
      onValueChange={(value) =>
        setType(value as "home" | "office" | "other")
      }
    >
      <SelectTrigger id="address-type" className="h-10 w-full bg-white">
        <SelectValue placeholder="Select type" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="home">Home</SelectItem>
        <SelectItem value="office">Office</SelectItem>
        <SelectItem value="other">Other</SelectItem>
      </SelectContent>
    </Select>
  </div>
  <div className="flex items-center gap-2">
    <Checkbox
      id="default-address"
      checked={isDefault}
      onCheckedChange={(checked) => setIsDefault(checked === true)}
    />
    <Label htmlFor="default-address" className="cursor-pointer font-normal">
      Set as default delivery address
    </Label>
  </div>
  <Button type="submit" disabled={loading} className="w-full">
    {loading ? "Saving..." : "Save Address"}
  </Button>
</form>
      </DialogContent>
    </Dialog>
  );
}