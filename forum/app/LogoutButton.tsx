"use client";

import { signOut } from "next-auth/react";

export default function LogoutButton() {
  const handleClick = () => signOut();

  return <button onClick={handleClick}>로그아웃</button>;
}
