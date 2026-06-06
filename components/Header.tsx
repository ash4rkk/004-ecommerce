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
    <header className="sticky border-b top-0 z-50 bg-white py-5 backdrop-blur-md shadow">
      <Container className="text-lightColor flex items-center justify-between">
        {/* Logo */}
        <div className="flex w-auto items-center justify-start gap-2.5 md:w-1/3 md:gap-0">
          <MobileMenu />
          <Logo />
        </div>

        {/* NavButton */}
        <HeaderMenu />
        <TooltipProvider>
          <div className="flex w-auto items-center justify-end gap-2 md:w-1/3">
            <SearchBar />
            <CartIcon />
            <FavoriteButton />
            <ClerkLoaded>
              {userId && <OrderButton orders={orders} />}
              <Show when="signed-in">
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox: {
                        width: "40px",
                        height: "40px",
                        borderRadius: "30%",
                        backgroundColor: "",
                      },
                    },
                  }}
                />
              </Show>
              <Show when="signed-out">
                <SignIn />
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
