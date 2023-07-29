"use client";
import Link from "next/link";
import "../../../configureAmplify";
import { useState, useEffect } from "react";
import { Auth, Hub } from "aws-amplify";

import React from "react";

const Navbar = () => {
  const [signedUser, setSignedUser] = useState(false);
  useEffect(() => {
    AuthListener();
  }, []);

  const AuthListener = async () => {
    Hub.listen("auth", (data) => {
      switch (data.payload.event) {
        case "signIn":
          return setSignedUser(true);

        case "signOut":
          return setSignedUser(false);
      }
    });
    try {
      await Auth.currentAuthenticatedUser();
      setSignedUser(true);
    } catch (err) {}
  };

  return (
    <nav>
      <header>
        <nav className="z-50 w-full fixed top-0 !bg-primary">
          <div className="max-w-7xl mx-auto px-6 md:px-18 xl:px-6">
            <div className="flex flex-wrap items-center justify-between py-2 gap-6 md:py-4 md:gap-0 relative">
              <input
                aria-hidden="true"
                type="checkbox"
                name="toggle_nav"
                id="toggle_nav"
                className="hidden peer"
              />
              <div className="relative z-20 w-full flex justify-between lg:w-max md:px-0">
                <p
                  to="/home"
                  aria-label="logo"
                  className="flex space-x-2 items-center"
                >
                  <img src={""} alt="Brand Logo" className="w-14 h-12" />
                  <span className="text-2xl font-komikk font-extrabold text-white dark:text-dark">
                    Next-JS-project
                  </span>
                </p>

                <div className="relative flex items-center lg:hidden max-h-10">
                  <label
                    role="button"
                    htmlFor="toggle_nav"
                    aria-label="humburger"
                    id="hamburger"
                    className="relative  p-6 -mr-6"
                  >
                    <div
                      aria-hidden="true"
                      id="line"
                      className="m-auto h-0.5 w-5 rounded bg-sky-900 dark:bg-gray-300 transition duration-300"
                    ></div>
                    <div
                      aria-hidden="true"
                      id="line2"
                      className="m-auto mt-2 h-0.5 w-5 rounded bg-sky-900 dark:bg-gray-300 transition duration-300"
                    ></div>
                  </label>
                </div>
              </div>
              <div
                aria-hidden="true"
                className="fixed z-10 inset-0 h-screen w-screen !bg-primary/70 backdrop-blur-2xl origin-bottom scale-y-0 transition duration-500 peer-checked:origin-top peer-checked:scale-y-100 lg:hidden dark:bg-gray-900/70"
              ></div>
              <div
                className="flex-col z-20 flex-wrap gap-6 p-8 rounded-3xl border border-secondary bg-third shadow-2xl shadow-gray-600/10 justify-end w-full invisible opacity-0 translate-y-1  absolute top-full left-0 transition-all duration-300 scale-95 origin-top 
                              lg:relative lg:scale-100 lg:peer-checked:translate-y-0 lg:translate-y-0 lg:flex lg:flex-row lg:items-center lg:gap-0 lg:p-0 lg:bg-transparent lg:w-7/12 lg:visible lg:opacity-100 lg:border-none
                              peer-checked:scale-100 peer-checked:opacity-100 peer-checked:visible lg:shadow-none 
                              dark:shadow-none dark:bg-gray-800 dark:border-gray-700"
              >
                <div className="!text-white dark:text-gray-320 lg:pr-4 lg:w-auto w-full lg:pt-0">
                  <ul className="tracking-wide font-medium lg:text-sm flex-col flex lg:flex-row gap-10 <">
                    <Link
                      className="text-2xl rounded-lg py-2 hover:text-secondary transition duration-500"
                      href={"/"}
                    >
                      Home
                    </Link>
                    {[
                      ["Create Post", "/create-post"],
                      ["Profile", "/profile"],
                    ].map(([title, url], index) => {
                      console.log(title, url);
                      return (
                        <Link
                          href={"/Screens/" + url}
                          key={index}
                          className="text-2xl rounded-lg py-2 hover:text-secondary transition duration-500"
                        >
                          {title}
                        </Link>
                      );
                    })}

                    {signedUser && (
                      <Link legacyBehavior href="/Screens/my-posts">
                        <a className="text-2xl rounded-lg py-2 hover:text-secondary transition duration-500">
                          My Posts
                        </a>
                      </Link>
                    )}
                  </ul>
                </div>

                <div className="mt-12 lg:mt-0"></div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </nav>
  );
};
export default Navbar;
