"use client"
import { authClient } from "@/lib/auth-client";

export default function Home() {

  const { data: session } = authClient.useSession()
  const user = session?.user

  return (
    <>
      <h1 className="text-center text-2xl font-bold">Welcome {user?.name}!</h1>
    </>
  );
}
