"use client";

import React from "react";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import ChatInput from "../components/ChatInput";

const ClientChatWrapper = () => {
  const supabase = createClientComponentClient();

  return (
    <SessionContextProvider supabaseClient={supabase}>
      <ChatInput />
    </SessionContextProvider>
  );
};

export default ClientChatWrapper;
