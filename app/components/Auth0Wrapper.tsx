"use client";

import { Auth0Provider } from "@auth0/auth0-react";
import AuthenticatedContent from "./AuthenticatedContent";

const Auth0Wrapper = () => {
  return (
    <Auth0Provider
      domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN!}
      clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID!}
      authorizationParams={{
        redirect_uri:
          typeof window !== "undefined" ? window.location.origin : undefined,
      }}
    >
      <AuthenticatedContent />
    </Auth0Provider>
  );
};

export default Auth0Wrapper;
