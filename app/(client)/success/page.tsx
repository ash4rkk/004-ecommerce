"use client";

import { getCheckoutSession, CheckoutSessionData } from "@/actions/getCheckoutSession";
import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import useStore from "@/store";
import { useUser } from "@clerk/nextjs";
import { CheckCircle, Package, ShoppingBag, ReceiptText } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const SuccessPage = () => {
  const { user } = useUser();
  const { resetCart } = useStore();
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("orderNumber");
  const session_id = searchParams.get("session_id");

  const [sessionData, setSessionData] = useState<CheckoutSessionData | null>(null);
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
        <div className="max-w-2xl mx-auto">
          {/* Success icon */}
          <div className="flex justify-center mb-8">
            <div className="w-24 h-24 rounded-full bg-shop_dark_green/10 flex items-center justify-center animate-pulse">
              <CheckCircle
                className="w-14 h-14 text-shop_dark_green/80"
                strokeWidth={1.5}
              />
            </div>
          </div>

          {/* Heading */}
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-darkColor mb-2">
              Thank you for your order!
            </h1>
            <p className="text-lightColor text-base">
              {user?.firstName ? `Hi ${user.firstName}! ` : ""}
              Your payment has been confirmed. We&apos;ll send you a confirmation
              email with your order details shortly.
            </p>
          </div>

          {/* Order details card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
            {/* Status bar */}
            <div className="bg-shop_dark_green/80 px-6 py-3 flex items-center gap-2">
              <ReceiptText className="w-4 h-4 text-white" />
              <span className="text-white text-sm font-medium">
                Order Confirmation
              </span>
            </div>

            <div className="p-6 space-y-1">
              {/* Order number */}
              {orderNumber && (
                <div className="flex items-center justify-between py-3 border-b border-gray-50">
                  <div className="flex items-center gap-3">
                    <Package className="w-5 h-5 text-gray-400" />
                    <span className="text-sm text-lightColor">Order Number</span>
                  </div>
                  <span className="text-sm font-mono font-semibold text-darkColor bg-gray-50 px-3 py-1 rounded-lg">
                    {orderNumber}
                  </span>
                </div>
              )}

              {/* Stripe session data */}
              {loading ? (
                <div className="space-y-3 py-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-4 bg-gray-100 rounded animate-pulse" />
                  ))}
                </div>
              ) : sessionData ? (
                <>
                  {sessionData.customerEmail && (
                    <div className="flex items-center justify-between py-3 border-b border-gray-50">
                      <span className="text-sm text-lightColor">Email</span>
                      <span className="text-sm font-medium text-darkColor">
                        {sessionData.customerEmail}
                      </span>
                    </div>
                  )}

                  <div className="flex items-center justify-between py-3 border-b border-gray-50">
                    <span className="text-sm text-lightColor">Payment Status</span>
                    <span className="text-xs font-semibold text-shop_dark_green bg-shop_dark_green/10 px-3 py-1 rounded-full uppercase tracking-wide">
                      {sessionData.paymentStatus === "paid" ? "Paid" : sessionData.paymentStatus}
                    </span>
                  </div>

                  {formattedAmount && (
                    <div className="flex items-center justify-between py-3">
                      <span className="text-sm text-lightColor">Total Amount</span>
                      <span className="text-lg font-bold text-darkColor">
                        {formattedAmount}
                      </span>
                    </div>
                  )}
                </>
              ) : null}
            </div>
          </div>

          {/* Info banner */}
          <div className="bg-shop_dark_green/5 border border-shop_dark_green/20 rounded-xl p-4 mb-8 flex gap-3">
            <ShoppingBag className="w-5 h-5 text-shop_dark_green/80 mt-0.5 shrink-0" />
            <p className="text-sm text-shop_dark_green/80">
              A confirmation email has been sent to your address. You can track
              your order status in your account dashboard.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              asChild
              className="flex-1 bg-shop_dark_green/80 hover:bg-shop_dark_green text-white h-11"
            >
              <Link href="/">Back to Home</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="flex-1 h-11 border-shop_dark_green/30 text-shop_dark_green hover:bg-shop_dark_green/5"
            >
              <Link href="/shop">Continue Shopping</Link>
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default SuccessPage;
