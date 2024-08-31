import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 flex justify-center items-center">
      <div className="w-full max-w-md">
        <SignIn
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "bg-white shadow-lg rounded-lg",
              headerTitle: "text-green-800",
              headerSubtitle: "text-green-600",
              formButtonPrimary: "bg-green-600 hover:bg-green-700",
              formFieldInput:
                "border-green-200 focus:ring-green-500 focus:border-green-500",
              footerActionLink: "text-green-600 hover:text-green-700",
            },
          }}
        />
      </div>
    </div>
  );
}
