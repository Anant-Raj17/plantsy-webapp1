import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <html lang="en">
      <body>
        <meta
          name="google-site-verification"
          content="K5tPxXbeG-Yy5g8jvaqgWIZ1bfbq1OENGQWMb40Qk9U"
        />
        <main>{children}</main>
      </body>
    </html>
  );
}
