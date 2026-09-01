"use client";
import { redirect } from "next/navigation";
import { useCustomHook } from "./utils/hook";

export default function Home() {
  const { loginId } = useCustomHook();
  const isLoggedIn = Boolean(loginId);

  if (!isLoggedIn) {
    redirect("/login");
  }

  return <></>;
}
