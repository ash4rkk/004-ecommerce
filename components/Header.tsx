import React from "react";
import Container from "./Container";
import Logo from "./Logo";
import HeaderMenu from "./HeaderMenu";
import SearchBar from "./SearchBar";
import CartIcon from "./CartIcon";
import FavoriteButton from "./FavoriteButton";
import SignIn from "./SignIn";
import MobileMenu from "./MobileMenu";
import { currentUser, auth } from "@clerk/nextjs/server";
import { ClerkLoaded, Show, UserButton } from "@clerk/nextjs";
import OrderButton from "./OrderButton";
import { TooltipProvider } from "./ui/tooltip";
import { getMyOrders } from "@/sanity/queries";
import { MY_ORDERS_QUERY_RESULT } from "@/sanity.types";

async function Header() {
  const user = await currentUser();
  const { userId } = await auth();
  let orders: MY_ORDERS_QUERY_RESULT = [];
  if (userId) {
    const result = await getMyOrders(userId);
    orders = result ?? [];
  }
  return (
    <header className="sticky border-b top-0 z-50 bg-white py-3 border-border">
      <Container className="text-lightColor mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex w-auto shrink-0 items-center justify-start gap-2.5">
          <MobileMenu />
          <Logo />
        </div>

        {/* NavButton */}

        <HeaderMenu />
        <TooltipProvider>
          <div className="flex w-auto shrink-0 items-center justify-end gap-2">
            <SearchBar />
            <CartIcon />
            <FavoriteButton />
            <ClerkLoaded>
              {userId && <OrderButton orders={orders} />}
              <Show when="signed-in">
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox: "size-7.5 md:size-10 rounded-[30%]",
                    },
                  }}
                />
              </Show>
              <Show when="signed-out">
                <SignIn 
                  
                />
              </Show>
            </ClerkLoaded>
          </div>
        </TooltipProvider>

        {/* NavAdmin */}
      </Container>
    </header>
  );
}

export default Header;
