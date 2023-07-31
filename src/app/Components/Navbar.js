"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Auth, Hub } from "aws-amplify";
import logo from "../images/Logo.png";
import Image from "next/image";
import "flowbite";
import { NavBar } from "../../ui-components";
import { ClientComponent } from "next/client";
import Amplify from "aws-amplify";
const Navbar = () => {
  const [signedUser, setSignedUser] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

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
      const user = await Auth.currentAuthenticatedUser();
      const username = user.username;
      console.log(username);
      setSignedUser(true);

      if (username === "admin") {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    } catch (err) {}
  };

  // Links for regular user
  const userLinks = [
    ["Restorantlar Hepsi", "Screens/list-restaurants"],
    ["Ana-Sayfa", ""],
    ["Profil", "Screens/profile"],
  ];

  // Links for admin
  const adminLinks = [
    ["Create Restaurant", "admin/create-restaurant"],
    ["Manage Restaurant", "admin/"],
    ["Profil", "Screens/profile"],
  ];
  return (
    <nav className="!w-full  !bg-primary px-24 ">
      <div className="flex items-center justify-between  py-2 ">
        <div className="flex space-x-2 items-center">
          <Image
            src={logo}
            width={75}
            height={75}
            alt="Picture of the author"
            className="object-cover"
          />
          <span className="text-2xl font-primary font-extrabold text-white w-52">
            {" "}
            Bir tıkla lezzetin peşine düş
          </span>
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex">
            <p className=" font-thin  font-primary">Current Location </p>{" "}
            <p>--</p>
            <p className="font-semibold font-primary"> Abdülkadir Cami Abi</p>
          </div>
          <div className=" h-10 w-72 bg-white rounded-lg flex justify-center items-center gap-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
            <p>Ara beni</p>
          </div>
        </div>
        <div className="flex flex-col gap-3 pb-3 pl-16">
          <div className="flex text-black font-primary font-medium">
            <p className="">Ana Sayfa</p>
            <p className=""> |</p>
            <p className="">Hakkımızda</p>
          </div>
          <button className="w-18 h-12 bg-white text-secondary shadow-md shadow-secondary hover:shadow-lg hover:shadow-secondary transition duration-900 hover:border-2 border-secondary  rounded-md">
            <div className="flex justify-center items-center gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
              </svg>
              <p>Hesap</p>
            </div>
          </button>
        </div>
      </div>
    </nav>

    // <nav>
    //   <header>
    //     <nav className="z-50 w-full fixed top-0 !bg-primary">
    //       <div className="px-6 md:px-18 xl:px-6">
    //         {/* <div className="flex flex-wrap items-center justify-between py-2 gap-6 md:py-4 md:gap-0 relative">
    //           <div className="relative z-20 w-full flex justify-between lg:w-max md:px-0">
    //             <div aria-label="logo" className="flex space-x-2 items-center">
    //               <Image
    //                 src={logo}
    //                 width={75}
    //                 height={75}
    //                 alt="Picture of the author"
    //                 className="object-cover w-32 h-32"
    //               />
    //               <span className="text-2xl font-primary font-extrabold text-white dark:text-dark w-48">
    //                 Bir tıkla lezzetin peşine düş
    //               </span>
    //             </div>

    //             <div className="w-48 h-12 bg-white rounded-lg flex ">Hello</div>
    //           </div>
    //         </div> */}
    //         <NavBar />
    //       </div>
    //     </nav>
    //   </header>
    // </nav>
  );
};
export default Navbar;
