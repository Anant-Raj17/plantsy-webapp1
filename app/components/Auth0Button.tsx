import { useAuth0 } from "@auth0/auth0-react";

export default function Auth0Button() {
  const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isAuthenticated) {
    return <div>You are already signed in.</div>;
  }

  return (
    <button
      onClick={() => loginWithRedirect()}
      className="btn btn-primary w-full mb-4"
    >
      Sign in with Auth0
    </button>
  );
}
