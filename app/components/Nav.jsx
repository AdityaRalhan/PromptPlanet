"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import "@styles/globals.css";

const Nav = () => {
  
  const {data: session } = useSession();


  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    const fetchProviders = async () => {
      const response = await getProviders(); // getProviders is a function in next-auth
      setProviders(response);
    };

    fetchProviders();
  }, []);

  return (
    <nav className="flex-between w-full mb-16 pt-4">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.png"
          width={30}
          height={30}
          className="object-contain"
          alt="website logo"
        />
        <p className="logo_text"> PromptPlanet </p>
      </Link>

      {/* mobile navigation */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              {" "}
              Create Post
            </Link>

            <Link href="/Trending" className="black_btn">
              {" "}
              Trending Prompts
            </Link>

            <Link href="/yourLikedPrompts" className="black_btn">
              {" "}
              Your Likes
            </Link>

            <button type="button" onClick={signOut} className="outline_btn">
              {" "}
              Sign Out
            </button>

            <Link href="/profile">
              {" "}
              <Image
                src={session?.user.image}
                width={47}
                height={47}
                className="rounded-full"
                alt="profile"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>

      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image
              src={session?.user.image}
              width={30}
              height={30}
              className="object-contain"
              alt="website logo"
              onClick={() => {
                setToggleDropdown((prev) => !prev); // Toggle the dropdown
              }}
            />

            {toggleDropdown && (
                <div className="dropdown">
                    <Link href="/create-prompt" className="dropdown_link" onClick={() => setToggleDropdown(false)}> 
                        My Profile
                    </Link>

                    <Link href="/profile" className="dropdown_link" onClick={() => setToggleDropdown(false)}> 
                        Create prompt
                    </Link>
                    <button
                    className="mt-5 w-full black_btn"
                     type="button"
                     onClick={() => {
                        setToggleDropdown(false);
                        signOut();
                     }}>
                            Sign out
                    </button>
                </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
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

export default Nav;
