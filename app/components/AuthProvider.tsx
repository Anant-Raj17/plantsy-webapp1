"use client";
import React from "react";
import { Auth0Provider } from "@auth0/auth0-react";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Auth0Provider
      domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN || ""}
      clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID || ""}
      authorizationParams={{
        redirect_uri:
          typeof window !== "undefined" ? window.location.origin : "",
      }}
    >
      {children}
    </Auth0Provider>
  );
};

export default AuthProvider;
