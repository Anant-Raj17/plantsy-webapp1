"use client";

import React from "react";
import { Auth0Provider } from "@auth0/auth0-react";
import { useRouter } from "next/navigation";

export const Auth0ProviderWithNavigate = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const router = useRouter();

  const onRedirectCallback = (appState: any) => {
    router.push(appState?.returnTo || "/chat");
  };

  if (typeof window === "undefined") return null;

  return (
    <Auth0Provider
      domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN!}
      clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID!}
      authorizationParams={{
        redirect_uri:
          typeof window !== "undefined" ? window.location.origin : undefined,
      }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};
