"use client";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

const NavBar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <nav className="bg-primary m-4 p-4 rounded-lg shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          href="/"
          className="flex items-center text-white text-2xl font-bold"
        >
          <Image
            src="/logo-plantsy.png"
            alt="Plant-Sy Logo"
            width={40}
            height={40}
            className="mr-2"
          />
          Plant-Sy
        </Link>
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="text-white bg-primary-focus px-4 py-2 rounded-md border-2"
          >
            Menu
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg">
              <Link
                href="/chat"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
              >
                Chat
              </Link>
              <Link
                href="/journal"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
              >
                Journal
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
