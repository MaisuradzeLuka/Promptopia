"use client";

import "./Navbar.scss";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Navbar = () => {
  const isLoggedIn = true;
  const signOut = () => {};

  const [provider, setProvider] = useState(null);
  const [toggleDropDown, setToggleDropDown] = useState(false);

  useEffect(() => {
    const setProviders = async () => {
      const res = await getProviders();

      setProvider(res);
    };

    setProviders();
  }, []);

  console.log(toggleDropDown);

  return (
    <nav className="navBar">
      <Link href="/">
        <Image
          src="/assets/images/logo.svg"
          alt="Promptopia Logo"
          width={30}
          height={30}
        />
        <p className="logo_text">Promptopia</p>
      </Link>

      <div>
        {isLoggedIn ? (
          <div className="navBar__userBtns flex-between">
            <Link href="/create-prompt" className="black_btn">
              Create Post
            </Link>

            <button onClick={signOut} className="outline_btn">
              Sign Out
            </button>

            <Link href="profile">
              <Image
                src="/assets/images/logo.svg"
                alt="profile"
                width={37}
                height={37}
              />
            </Link>
          </div>
        ) : (
          <>
            {provider &&
              Object.values(provider).map((provider) => (
                <button
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="back_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>

      <div className="navBar__mobileView">
        {isLoggedIn ? (
          <div>
            <Image
              src="/assets/images/logo.svg"
              alt="profile"
              width={37}
              height={37}
              onClick={() => setToggleDropDown((prev) => !prev)}
            />
            {toggleDropDown && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="drowpdown_link"
                  onClick={() => setToggleDropDown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href="/create-prompt"
                  className="drowpdown_link"
                  onClick={() => setToggleDropDown(false)}
                >
                  Create Prompmt
                </Link>
                <button
                  className="black_btn"
                  onClick={() => {
                    setToggleDropDown(false);
                    signOut();
                  }}
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {provider &&
              Object.values(provider).map((provider) => (
                <button
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="bacl_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
