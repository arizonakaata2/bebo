"use client"

import { useEffect, useState } from "react"
import { supabase } from "../lib/supabaseClient"

export default function Home() {

  const [session, setSession] = useState<any>(null)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
    })

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session)
      }
    )

    return () => listener.subscription.unsubscribe()
  }, [])

  const signUp = async () => {
    const { error } = await supabase.auth.signUp({
      email,
      password
    })

    if (error) {
      alert(error.message)
    } else {
      alert("Signup successful. Check your email.")
    }
  }

  const signIn = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      alert(error.message)
    }
  }

  const logout = async () => {
    await supabase.auth.signOut()
  }

  if (!session) {
    return (
      <div style={{ padding: 40 }}>
        <h1>BEBO</h1>

        <input
          placeholder="Email"
          onChange={(e)=>setEmail(e.target.value)}
        />

        <br/><br/>

        <input
          type="password"
          placeholder="Password"
          onChange={(e)=>setPassword(e.target.value)}
        />

        <br/><br/>

        <button onClick={signUp}>Sign Up</button>
        <button onClick={signIn}>Login</button>
      </div>
    )
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Welcome to BEBO 🎉</h1>

      <p>You are logged in.</p>

      <button onClick={logout}>Logout</button>
    </div>
  )
}
