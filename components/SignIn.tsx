import { SignInButton } from "@clerk/nextjs";
import React from "react";

const SignIn = () => {
  return (
    <SignInButton mode="modal">
      <button className="bg-surface hover:text-accent-p hoverEffect hover:bg-surface-2 rounded-md p-1 font-bold hover:cursor-pointer active:scale-95 md:rounded-xl md:p-2">
        Login
      </button>
    </SignInButton>
  );
};

export default SignIn;
