"use client";
import Image from "next/image";

import { supabase } from "../lib/supabaseClient";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/signin");
  };
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
        <div className="flex-none">
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <Image
                  src="/vercel.svg"
                  alt="User Profile Picture"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52 z-50 "
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                backdropFilter: "blur(5px)",
              }}
            >
              <li>
                <a className="justify-between">Profile</a>
              </li>
              <li>
                <a onClick={handleSignOut}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
