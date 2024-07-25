"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Navbar from "../components/NavBar";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleGoogleSignIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex min-h-screen bg-gray-100">
        <div className="m-auto w-full max-w-md">
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h2 className="text-2xl font-bold mb-6">
              {isLogin ? "Login" : "Register"}
            </h2>
            <p className="mb-4 text-gray-600">
              Join our community of plant enthusiasts and get personalized
              advice for your green friends!
            </p>
            <button
              onClick={handleGoogleSignIn}
              className="btn btn-primary w-full mb-4"
            >
              Sign in with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
