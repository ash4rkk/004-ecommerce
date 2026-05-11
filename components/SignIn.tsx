import { SignInButton } from '@clerk/nextjs';
import React from 'react';

const SignIn = () => {
  return (
    <SignInButton mode='modal'>
      <button className='text-sm font-semibold text-lightColor hover:text-darkColor hover:cursor-pointer hoverEffect'>
        {' '}
        Login
      </button>
    </SignInButton>
  );
};

export default SignIn;
