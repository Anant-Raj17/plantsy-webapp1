import Link from "next/link";

export default function GetStartedButton() {
  return (
    <Link
      href="/chat"
      className="text-white bg-green-600 hover:bg-green-700 px-6 py-3 rounded-full transition duration-300 text-lg font-semibold"
    >
      Get Started
    </Link>
  );
}
