"use client";

import Link from "next/link";
import { useAuth } from "@clerk/nextjs";

export default function GetStartedButton() {
  const { isSignedIn } = useAuth();

  return (
    <Link
      href={isSignedIn ? "/chat" : "/sign-up"}
      className="text-white bg-green-600 hover:bg-green-700 px-6 py-3 rounded-full transition duration-300 text-lg font-semibold"
    >
      {isSignedIn ? "Go to Chat" : "Get Started"}
    </Link>
  );
}
