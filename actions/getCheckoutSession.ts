"use server";

import stripe from "@/lib/stripe";

export interface CheckoutSessionData {
  id: string;
  amountTotal: number | null;
  currency: string | null;
  customerEmail: string | null;
  customerName: string | null;
  paymentStatus: string;
  orderNumber: string | null;
}

export async function getCheckoutSession(
  sessionId: string
): Promise<CheckoutSessionData | null> {
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    return {
      id: session.id,
      amountTotal: session.amount_total,
      currency: session.currency,
      customerEmail:
        session.customer_details?.email ?? session.customer_email ?? null,
      customerName: session.customer_details?.name ?? null,
      paymentStatus: session.payment_status,
      orderNumber: (session.metadata?.orderNumber as string) ?? null,
    };
  } catch (error) {
    console.error("Error retrieving Stripe session:", error);
    return null;
  }
}
