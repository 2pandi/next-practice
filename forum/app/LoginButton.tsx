"use client";

import { signIn } from "next-auth/react";

export default function LoginButton() {
  const handleClick = () => signIn();

  return <button onClick={handleClick}>로그인</button>;
}
