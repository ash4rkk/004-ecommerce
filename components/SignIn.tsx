import { SignInButton } from "@clerk/nextjs";
import React from "react";

const SignIn = () => {
  return (
    <SignInButton mode="modal">
      <button className="bg-surface active:scale-95 hover:text-accent-p hoverEffect hover:bg-surface-2 rounded-xl p-2 font-bold hover:cursor-pointer">
        Login
      </button>
    </SignInButton>
  );
};

export default SignIn;
