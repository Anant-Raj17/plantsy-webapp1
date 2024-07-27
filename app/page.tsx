import Link from "next/link";
import NavBar from "./components/NavBar";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Welcome to Plant-Sy</h1>
      <p className="text-xl mb-8">Keep your plants healthy and alive</p>
      <Link href="/chat" className="btn btn-primary">
        Get Started
      </Link>
    </main>
  );
}
