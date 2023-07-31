import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="w-full h-96 p-24 bg-black ">
      <div className="grid grid-cols-3 gap-4">
        <div class="col-span-2  ">
          <div className="grid grid-cols-3  text-white font-bold ">
            <Link href={"/"}>Şirket</Link>
            <Link href={"/"}>İletişim</Link>
            <Link href={"/"}>Legal</Link>
          </div>
          <div className="grid grid-cols-3 gap-y-2 text-white font-medium py-12">
            <Link href={"/"}>Şirket</Link>
            <Link href={"/"}>İletişim</Link>
            <Link href={"/"}>Legal</Link>
            <Link href={"/"}>Şirket</Link>
            <Link href={"/"}>İletişim</Link>
            <Link href={"/"}>Legal</Link>
            <Link href={"/"}>Şirket</Link>
            <Link href={"/"}>İletişim</Link>
            <Link href={"/"}>Legal</Link>
          </div>
        </div>
        <div class=" ">
          <div className="flex flex-col ">
            <p className="font-bold text-gray-500"> Bizi Takip Et</p>
            <div>
              <Link href={"/"}>Insta</Link>
              <Link href={"/"}>Twitter </Link>
              <Link href={"/"}>Facebook</Link>
            </div>
            <p className="text-gray-100 font-medium my-6">
              Posta Kutunuza Özel Teklifler alın
            </p>
            <form>
              <div class="mb-6">
                <label
                  for="email"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="örnekemail@gmail.com"
                  required
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
