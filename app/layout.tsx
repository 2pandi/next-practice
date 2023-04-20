import Link from "next/link";
import "styles/globals.scss";

export const metadata = {
  title: "Apple Fresh",
  description: "Next.js 뿌수자",
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
          <Link href="/">home</Link>
          <Link href="/list">list</Link>
        </div>
        {children}
      </body>
    </html>
  );
}

/**
 * page.js를 보여줄 때
 * 1. 옆에 layout.js가 있으면 그걸로 page.js를 감싼다.
 * 2. 상위 폴더에 layout.js가 있으면 그걸로 1번을 감싼다.
 * 3. 상위 폴더에 또 layout.js가 있으면 그걸로 2번을 감싼다.
 */
