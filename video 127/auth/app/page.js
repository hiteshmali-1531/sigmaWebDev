"use client"
import { useSession } from "next-auth/react";
import Image from "next/image";
import { signIn, signOut } from "next-auth/react";
export default function Home() {
  const {data: session} = useSession();
  // console.log(session);
  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <h1>name : {session.user.name}</h1>
        <button onClick={() => signOut("github")}>Sign out</button>
        {session&&  <img src={`${session.user.image}`} alt="no" />}
       
      </>
    )
  }
  return (
    <>
      Not signed in <br />
      <button className="p-4 border border-blue-500" onClick={() => signIn("github")}>Sign in</button>
      <button className="p-4 border border-blue-500" onClick={() => signIn("google")}>Sign in</button>
    </>
  )
}

