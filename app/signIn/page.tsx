"use client";

import React, { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Navbar from "../components/NavBar";
import { motion } from "framer-motion";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/chat");
    }
  }, [status, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (isRegistering) {
      // Handle registration
      try {
        const response = await fetch("/api/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
          // If registration is successful, attempt to sign in
          await handleSignIn();
        } else {
          const data = await response.json();
          setError(data.message || "Registration failed");
        }
      } catch (error) {
        console.error("An error occurred during registration:", error);
        setError("An error occurred. Please try again.");
      }
    } else {
      // Handle sign in
      await handleSignIn();
    }
  };

  const handleSignIn = async () => {
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        setError("Invalid email or password");
      } else {
        // Successful sign-in
        router.push("/chat");
      }
    } catch (error) {
      console.error("An error occurred during sign in:", error);
      setError("An error occurred. Please try again.");
    }
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "authenticated") {
    return null; // This will prevent any flash of the sign-in page
  }

  return (
    <div className="min-h-screen bg-base-100">
      <Navbar />
      <div className="hero min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">
              {isRegistering ? "Register" : "Login"}
            </h1>
            <p className="py-6">
              Join our community of plant enthusiasts<br></br> and get
              personalized advice for your green friends!
            </p>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleSubmit} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  className="input input-bordered"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {error && <div className="text-error mt-2">{error}</div>}
              <div className="form-control mt-6">
                <button type="submit" className="btn btn-primary">
                  {isRegistering ? "Register" : "Login"}
                </button>
              </div>
              <div className="text-center mt-4">
                <button
                  type="button"
                  className="btn btn-link"
                  onClick={() => setIsRegistering(!isRegistering)}
                >
                  {isRegistering
                    ? "Already have an account? Login"
                    : "Don't have an account? Register"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
