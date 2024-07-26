import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Image from "next/image";

const AuthenticatedContent = () => {
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();

  const handleSignOut = () => {
    if (typeof window !== "undefined") {
      logout({ logoutParams: { returnTo: window.location.origin } });
    }
  };

  return (
    <>
      {isAuthenticated ? (
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <Image
                src={user?.picture || "/vercel.svg"}
                alt="User Profile Picture"
                width={40}
                height={40}
                className="rounded-full"
              />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52 z-50"
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
      ) : (
        <button
          onClick={() => loginWithRedirect()}
          className="btn btn-ghost text-white"
        >
          Login
        </button>
      )}
    </>
  );
};

export default AuthenticatedContent;
