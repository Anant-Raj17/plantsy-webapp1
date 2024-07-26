"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Navbar from "../components/NavBar";
import ClientChatWrapper from "./ClientChatWrapper";

export default function Chat() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="min-h-screen bg-base-100">
        <ClientChatWrapper />
      </div>
    </div>
  );
}
