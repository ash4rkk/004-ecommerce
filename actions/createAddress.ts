"use server";

import { Address } from "@/sanity.types";
import { backendClient } from "@/sanity/lib/backendClient";
import { currentUser } from "@clerk/nextjs/server";

export type CreateAddressInput = {
  name: string;
  phone?: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  type: "home" | "office" | "other";
  default?: boolean;
};
export async function createAddress(
  input: CreateAddressInput,
): Promise<
  { success: true; address: Address } | { success: false; error: string }
> {
  const user = await currentUser();
  const email = user?.emailAddresses[0]?.emailAddress;

  if (!user || !email) {
    return { success: false, error: "You need to be logged!" };
  }

  if (!input.name.trim())
    return { success: false, error: "Address field required" };
  if (!/^\d{5}(-\d{4})?$/.test(input.zip)) {
    return { success: false, error: "Wrong ZIP CODE" };
  }

  if (input.default) {
    const existing = await backendClient.fetch<{ _id: string }[]>(
      `*[_type == 'address' && email == $email && default == true]{ _id }`,
      { email },
    );
    for (const addr of existing) {
      await backendClient.patch(addr._id).set({ default: false }).commit();
    }
  }
  const created = await backendClient.create({
    _type: "address",
    name: input.name.trim(),
    email, //From Cleark security
    phone: input.phone?.trim() || undefined,
    address: input.address.trim(),
    city: input.city.trim(),
    state: input.state.trim(),
    zip: input.zip.trim(),
    type: input.type,
    default: input.default ?? false,
    createdAt: new Date().toISOString(),  
  })
  return { success: true, address: created as Address}
}
