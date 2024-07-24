"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Navbar from "../components/NavBar";
import ClientChatWrapper from "./ClientChatWrapper";

const ChatPage = () => {
  const [loading, setLoading] = React.useState(true);
  const [session, setSession] = React.useState(null);
  const router = useRouter();
  const supabase = createClientComponentClient();

  React.useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);
      setLoading(false);
      if (!session) {
        router.push("/signin");
      }
    };

    checkSession();
  }, [router, supabase]);

  if (loading) {
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
