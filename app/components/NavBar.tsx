"use client";
import React from "react";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

const Auth0Wrapper = dynamic(() => import("./Auth0Wrapper"), { ssr: false });

const Navbar = () => {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="p-4 bg-base-100">
      <nav className="navbar bg-primary p-3 rounded-2xl shadow-xl">
        <div className="flex-1">
          <a className="btn btn-ghost text-3xl text-white">
            <Image
              src="/logo-plantsy.png"
              alt="Plant-sy Logo"
              width={40}
              height={40}
              className="mr-2 font-bold"
            />
            Plant-Sy
          </a>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
