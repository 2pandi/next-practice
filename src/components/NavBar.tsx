import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./NavBar.module.scss";

export default function NavBar() {
  const router = useRouter();

  return (
    <nav className={styles.nav}>
      <Link
        className={`${styles.link} ${
          router.pathname === "/" ? styles.active : ""
        }`}
        href="/"
      >
        Home
      </Link>
      <Link
        className={[
          styles.link,
          router.pathname === "/about" ? styles.active : "",
        ].join(" ")}
        href="/about"
      >
        About
      </Link>
    </nav>
  );
}
