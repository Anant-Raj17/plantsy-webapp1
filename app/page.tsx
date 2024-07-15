"use client";

import React from "react";
import Link from "next/link";
import Navbar from "./components/NavBar";
import { motion } from "framer-motion";

const LandingPage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="hero min-h-screen bg-base-100">
        <div className="hero-content text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-md"
          >
            <h1 className="text-5xl font-bold mb-8">
              AI chatbot to make your plants healthy and alive
            </h1>
            <Link href="/signIn" passHref>
              <button className="btn btn-primary btn-lg rounded-full">
                Get Started
              </button>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
