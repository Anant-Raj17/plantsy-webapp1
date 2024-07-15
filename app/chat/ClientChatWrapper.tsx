"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";
import ChatInput from "../components/ChatInput";
import type { AppProps } from "next/app";

const ClientChatWrapper = () => {
  return (
    <SessionProvider>
      <ChatInput />
    </SessionProvider>
  );
};

export default ClientChatWrapper;
