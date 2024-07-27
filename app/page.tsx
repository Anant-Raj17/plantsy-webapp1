"use client";

import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8">
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-6xl mb-16">
        <div className=" text-center md:w-1/2 mb-8 md:mb-0">
          <h1 className="text-4xl font-bold mb-4">Welcome to Plant-Sy</h1>
          <p className="text-xl mb-6">
            Keep your plants healthy and thriving with expert care advice
          </p>
          <Link href="/chat" className="btn btn-primary">
            Get Started
          </Link>
        </div>
        <div className="md:w-1/2">
          <Image
            src="/HeroImg.jpeg"
            alt="Plant care illustration"
            width={500}
            height={500}
            className="rounded-lg"
          />
        </div>
      </div>

      {/* Features Section */}
      <h2 className="text-3xl font-bold mb-8">Our Features</h2>
      <div className="grid md:grid-cols-2 gap-8 w-full max-w-6xl">
        {/* AI Chat Card */}
        <div className="bg-white border-2 p-6 rounded-lg shadow-md text-center">
          <Image
            src="/ChatImg.png"
            alt="AI Chat"
            width={200}
            height={200}
            className="mx-auto mb-4"
          />
          <h3 className="text-2xl font-semibold mb-2">AI Chat</h3>
          <p className="text-gray-600">
            Get instant plant care advice from our AI-powered chatbot. Ask
            questions about watering, sunlight, and more!
          </p>
        </div>

        {/* Plant Care Journal Card */}
        <div className="bg-white border-2 p-6 rounded-lg shadow-md text-center">
          <Image
            src="/JournalImg.png"
            alt="Plant Care Journal"
            width={200}
            height={200}
            className="mx-auto mb-4"
          />
          <h3 className="text-2xl font-semibold mb-2">Plant Care Journal</h3>
          <p className="text-gray-600">
            Keep track of your plants' growth and care routines. Log watering
            schedules, fertilizing, and observations.
          </p>
        </div>
      </div>
    </main>
  );
}
