"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Navbar from "../components/NavBar";
import ClientChatWrapper from "./ClientChatWrapper";

const ChatPage = () => {
  const { status } = useSession();
  const router = useRouter();

  React.useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin");
    }
  }, [status, router]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "unauthenticated") {
    return null; // We're redirecting, so we don't need to render anything
  }

  return (
    <div className="min-h-screen bg-base-100">
      <Navbar />
      <ClientChatWrapper />
    </div>
  );
};

export default ChatPage;
