import Link from "next/link";
import "./globals.css";

export const metadata = {
  title: "Forum",
  description: "next.js practice",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="navbar">
          <Link href="/" className="logo">
            Appleforum
          </Link>
          <Link href="/list">List</Link>
        </div>
        {children}
      </body>
    </html>
  );
}
