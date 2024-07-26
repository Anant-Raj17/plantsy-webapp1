import "../globals.css";
import { Inter } from "next/font/google";
import NavBar from "../components/NavBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Plant-Sy Chat",
  description: "Chat with our AI to keep your plants healthy and alive",
};

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavBar />
        <div className="flex flex-col min-h-screen">
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
