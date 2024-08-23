"use client";

import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between min-h-screen p-8 bg-gradient-to-b from-green-50 to-white">
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-6xl mb-16">
        <div className="text-center md:text-left md:w-1/2 mb-8 md:mb-0">
          <h1 className="text-5xl font-bold mb-4 text-green-800">
            Welcome to Plant-Sy
          </h1>
          <p className="text-xl mb-6 text-green-600">
            Keep your plants healthy and thriving with expert care advice
          </p>
          <Link
            href="/chat"
            className="text-white bg-green-600 hover:bg-green-700 px-6 py-3 rounded-full transition duration-300 text-lg font-semibold"
          >
            Get Started
          </Link>
        </div>
        <div className="md:w-1/2">
          <Image
            src="/HeroImg.jpeg"
            alt="Plant care illustration"
            width={500}
            height={500}
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>

      {/* Features Section */}
      <h2 className="text-3xl font-bold mb-8 text-green-800">Our Features</h2>
      <div className="grid md:grid-cols-2 gap-8 w-full max-w-6xl">
        {/* AI Chat Card */}
        <div className="bg-white border-2 border-green-200 p-6 rounded-lg shadow-md text-center hover:shadow-lg transition duration-300">
          <Image
            src="/ChatImg.png"
            alt="AI Chat"
            width={200}
            height={200}
            className="mx-auto mb-4"
          />
          <h3 className="text-2xl font-semibold mb-2 text-green-700">
            AI Chat
          </h3>
          <p className="text-gray-600">
            Get instant plant care advice from our AI-powered chatbot. Ask
            questions about watering, sunlight, and more!
          </p>
        </div>

        {/* Plant Care Journal Card */}
        <div className="bg-white border-2 border-green-200 p-6 rounded-lg shadow-md text-center hover:shadow-lg transition duration-300">
          <Image
            src="/JournalImg.png"
            alt="Plant Care Journal"
            width={200}
            height={200}
            className="mx-auto mb-4"
          />
          <h3 className="text-2xl font-semibold mb-2 text-green-700">
            Plant Care Journal
          </h3>
          <p className="text-gray-600">
            Keep track of your plant&apos;s growth and care routines. Log
            watering schedules, fertilizing, and observations.
          </p>
        </div>
      </div>
      <footer className="w-full text-center mt-16 text-sm text-gray-600 bg-green-100 py-4 rounded-t-lg">
        <p className="mb-2">
          This project is still under development. More features and
          improvements coming soon!
        </p>
        <p>
          If you have any feedback, please DM me on{" "}
          <a
            href="https://x.com/The_Anant_Raj"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            Twitter
          </a>{" "}
          or{" "}
          <a
            href="https://www.instagram.com/_plant_sy/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            Instagram
          </a>
          .
        </p>
      </footer>
    </main>
  );
}
