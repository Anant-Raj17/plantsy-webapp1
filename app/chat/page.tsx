"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useSessionContext } from "@supabase/auth-helpers-react";
import Navbar from "../components/NavBar";
import ClientChatWrapper from "./ClientChatWrapper";

const ChatPage = () => {
  const { isLoading, session } = useSessionContext();
  const router = useRouter();

  React.useEffect(() => {
    if (!isLoading && !session) {
      router.push("/signIn");
    }
  }, [isLoading, session, router]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!session) {
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
