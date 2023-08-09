import Link from "next/link";
import "./globals.css";
import LoginButton from "./LoginButton";
import { getServerSession } from "next-auth";
import { authOptions } from "../pages/api/auth/[...nextauth]";
import LogoutButton from "./LogoutButton";

export const metadata = {
  title: "Forum",
  description: "next.js practice",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 로그인 유저 정보 불러오기 (server component)
  const loginSession = await getServerSession(authOptions);
  // client component에서 로그인 유저 정보 불러오려면
  // layout 같은데서 <SessionProvider>로 감싼 다음
  // 내부에서 useSession()을 사용하면 된다.
  //   -> html 다 보여준 다음에 한 박자 늦게 실행될 수도 있음(server component에서 부르는게 낫다.)

  return (
    <html lang="en">
      <body>
        <div className="navbar">
          <Link href="/" className="logo">
            Appleforum
          </Link>
          <Link href="/list">List</Link>
          {loginSession ? (
            <>
              <span>{loginSession.user?.name}</span>
              <LogoutButton />
            </>
          ) : (
            <LoginButton />
          )}
        </div>
        {children}
      </body>
    </html>
  );
}
