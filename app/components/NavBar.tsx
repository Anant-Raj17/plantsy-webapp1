"use client";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

const NavBar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <nav className="py-4 relative">
      <div className="container mx-auto px-6">
        <div className="bg-green-100 rounded-lg shadow-md flex justify-between items-center p-4">
          <Link
            href="/"
            className="flex items-center text-green-800 text-3xl font-bold"
          >
            <Image
              src="/logo-plantsy.png"
              alt="Plant-Sy Logo"
              width={50}
              height={50}
              className="mr-3"
            />
            Plant-Sy
          </Link>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="text-white bg-green-600 hover:bg-green-700 px-6 py-3 rounded-full transition duration-300 text-lg font-semibold"
          >
            Menu
          </button>
        </div>
      </div>
      {isDropdownOpen && (
        <div className="absolute right-6 mt-2 w-48 bg-white rounded-lg shadow-lg border border-green-200 z-10">
          <Link
            href="/chat"
            className="block px-4 py-3 text-green-700 hover:bg-green-100 rounded-t-lg"
          >
            Chat
          </Link>
          <Link
            href="/journal"
            className="block px-4 py-3 text-green-700 hover:bg-green-100 rounded-b-lg"
          >
            Journal
          </Link>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
