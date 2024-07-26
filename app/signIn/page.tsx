"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import Navbar from "../components/NavBar";

const Auth0Provider = dynamic(
  () => import("@auth0/auth0-react").then((mod) => mod.Auth0Provider),
  { ssr: false }
);

const Auth0Button = dynamic(() => import("../components/Auth0Button"), {
  ssr: false,
});

export default function SignInPage() {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <Auth0Provider
      domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN!}
      clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID!}
      authorizationParams={{
        redirect_uri:
          typeof window !== "undefined"
            ? `${window.location.origin}/chat`
            : undefined,
      }}
    >
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex min-h-screen bg-gray-100">
          <div className="m-auto w-full max-w-md">
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <h2 className="text-2xl font-bold mb-6">Sign In / Sign Up</h2>
              <p className="mb-4 text-gray-600">
                Join our community of plant enthusiasts and get personalized
                advice for your green friends!
              </p>
              <Auth0Button />
            </div>
          </div>
        </div>
      </div>
    </Auth0Provider>
  );
}
