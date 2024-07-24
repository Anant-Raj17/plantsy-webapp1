"use client";

import React from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import ChatInput from "../components/ChatInput";

const ClientChatWrapper = () => {
  const supabase = createClientComponentClient();

  return (
    <div>
      <ChatInput />
    </div>
  );
};

export default ClientChatWrapper;
