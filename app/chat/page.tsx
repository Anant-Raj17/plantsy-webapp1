"use client";

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
