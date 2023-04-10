import Link from "next/link";
import { useRouter } from "next/router";

export default function NavBar() {
  const router = useRouter();

  return (
    <nav>
      <Link href="/">
        <span className="link">Home</span>
      </Link>
      <Link href="/about">About</Link>

      <style jsx>{`
        nav {
          background-color: pink;
        }
        .link {
          text-decoration: none;
          color: green;
        }
      `}</style>
    </nav>
  );
}
