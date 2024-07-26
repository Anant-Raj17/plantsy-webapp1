"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useAuth0 } from "@auth0/auth0-react";
import Navbar from "../components/NavBar";
import ClientChatWrapper from "./ClientChatWrapper";

const ChatPage = () => {
  const { isAuthenticated, isLoading } = useAuth0();
  const router = useRouter();

  React.useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/signIn");
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-base-100">
      <Navbar />
      <ClientChatWrapper />
    </div>
  );
};

export default ChatPage;
