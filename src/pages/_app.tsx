import NavBar from "@/components/NavBar";
import { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <NavBar />
      <Component {...pageProps} />
      <style jsx global>
        {`
          nav {
            font-weight: 700;
          }
        `}
      </style>
    </>
  );
}
