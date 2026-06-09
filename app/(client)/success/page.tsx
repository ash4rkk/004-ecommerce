"use client";

import {
  getCheckoutSession,
  CheckoutSessionData,
} from "@/actions/getCheckoutSession";
import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import useStore from "@/store";
import { useUser } from "@clerk/nextjs";
import { CheckCircle, Package, ReceiptText, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

function SuccessFallback() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-linear-to-b from-gray-100 to-white py-16 px-4">
      <Container>
        <div className="mx-auto max-w-2xl space-y-4">
          <div className="mx-auto h-24 w-24 animate-pulse rounded-full bg-gray-200" />
          <div className="mx-auto h-8 w-64 animate-pulse rounded bg-gray-200" />
          <div className="mx-auto h-4 w-96 animate-pulse rounded bg-gray-100" />
        </div>
      </Container>
    </div>
  );
}

function SuccessContent() {
  const { user } = useUser();
  const { resetCart } = useStore();
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("orderNumber");
  const session_id = searchParams.get("session_id");

  const [sessionData, setSessionData] = useState<CheckoutSessionData | null>(
    null,
  );
  const [loading, setLoading] = useState(!!session_id);

  useEffect(() => {
    if (!session_id) return;
    resetCart();
    getCheckoutSession(session_id).then((data) => {
      setSessionData(data);
      setLoading(false);
    });
  }, [session_id, resetCart]);

  const formattedAmount =
    sessionData?.amountTotal != null
      ? new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: sessionData.currency?.toUpperCase() ?? "USD",
        }).format(sessionData.amountTotal / 100)
      : null;

  return (
    <div className="min-h-[80vh] bg-linear-to-b from-gray-100 to-white py-16 px-4">
      <Container>
        <div className="mx-auto max-w-2xl">
          <div className="mb-8 flex justify-center">
            <div className="flex h-24 w-24 animate-pulse items-center justify-center rounded-full bg-accent-p/10">
              <CheckCircle
                className="h-14 w-14 text-accent-p/80"
                strokeWidth={1.5}
              />
            </div>
          </div>

          <div className="mb-10 text-center">
            <h1 className="mb-2 text-3xl font-bold text-darkColor">
              Thank you for your order!
            </h1>
            <p className="text-base text-lightColor">
              {user?.firstName ? `Hi ${user.firstName}! ` : ""}
              Your payment has been confirmed. We&apos;ll send you a
              confirmation email with your order details shortly.
            </p>
          </div>

          <div className="mb-6 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
            <div className="flex items-center gap-2 bg-accent-p/80 px-6 py-3">
              <ReceiptText className="h-4 w-4 text-white" />
              <span className="text-sm font-medium text-white">
                Order Confirmation
              </span>
            </div>

            <div className="space-y-1 p-6">
              {orderNumber && (
                <div className="flex items-center justify-between border-b border-gray-50 py-3">
                  <div className="flex items-center gap-3">
                    <Package className="h-5 w-5 text-gray-400" />
                    <span className="text-sm text-lightColor">Order Number</span>
                  </div>
                  <span className="rounded-lg bg-gray-50 px-3 py-1 font-mono text-sm font-semibold text-darkColor">
                    {orderNumber}
                  </span>
                </div>
              )}

              {loading ? (
                <div className="space-y-3 py-4">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="h-4 animate-pulse rounded bg-gray-100"
                    />
                  ))}
                </div>
              ) : sessionData ? (
                <>
                  {sessionData.customerEmail && (
                    <div className="flex items-center justify-between border-b border-gray-50 py-3">
                      <span className="text-sm text-lightColor">Email</span>
                      <span className="text-sm font-medium text-darkColor">
                        {sessionData.customerEmail}
                      </span>
                    </div>
                  )}

                  <div className="flex items-center justify-between border-b border-gray-50 py-3">
                    <span className="text-sm text-lightColor">
                      Payment Status
                    </span>
                    <span className="rounded-full bg-accent-p/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-accent-p">
                      {sessionData.paymentStatus === "paid"
                        ? "Paid"
                        : sessionData.paymentStatus}
                    </span>
                  </div>

                  {formattedAmount && (
                    <div className="flex items-center justify-between py-3">
                      <span className="text-sm text-lightColor">
                        Total Amount
                      </span>
                      <span className="text-lg font-bold text-darkColor">
                        {formattedAmount}
                      </span>
                    </div>
                  )}
                </>
              ) : null}
            </div>
          </div>

          <div className="mb-8 flex gap-3 rounded-xl border border-accent-p/20 bg-accent-p/5 p-4">
            <ShoppingBag className="mt-0.5 h-5 w-5 shrink-0 text-accent-p/80" />
            <p className="text-sm text-accent-p/80">
              A confirmation email has been sent to your address. You can track
              your order status in your account dashboard.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              asChild
              className="h-11 flex-1 bg-accent-p/80 text-white hover:bg-accent-p"
            >
              <Link href="/">Back to Home</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-11 flex-1 border-accent-p/30 text-accent-p hover:bg-accent-p/5"
            >
              <Link href="/shop">Continue Shopping</Link>
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}

const SuccessPage = () => {
  return (
    <Suspense fallback={<SuccessFallback />}>
      <SuccessContent />
    </Suspense>
  );
};

export default SuccessPage;
