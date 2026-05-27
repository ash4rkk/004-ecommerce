import React from 'react';
import Container from './Container';
import Logo from './Logo';
import HeaderMenu from './HeaderMenu';
import SearchBar from './SearchBar';
import CartIcon from './CartIcon';
import FavoriteButton from './FavoriteButton';
import SignIn from './SignIn';
import MobileMenu from './MobileMenu';
import { currentUser } from '@clerk/nextjs/server';
import { ClerkLoaded, Show, UserButton } from '@clerk/nextjs';

async function Header() {
  const user = await currentUser();

  return (
    <header className='bg-white70 backdrop-blur-md top-0 sticky z-50 py-5'>
      <Container className='flex items-center justify-between text-lightColor'>
        {/* Logo */}
        <div className='w-auto md:w-1/3 flex items-center gap-2.5 justify-start md:gap-0'>
          <MobileMenu />
          <Logo />
        </div>

        {/* NavButton */}
        <HeaderMenu />

        <div className='w-auto md:w-1/3 flex items-center justify-end gap-5'>
          <SearchBar />
          <CartIcon />
          <FavoriteButton />
          <ClerkLoaded>
            <Show when='signed-in'>
              <UserButton />
            </Show>
            <Show when='signed-out'>
              <SignIn />
            </Show>
          </ClerkLoaded>
        </div>

        {/* NavAdmin */}
      </Container>
    </header>
  );
}

export default Header;
