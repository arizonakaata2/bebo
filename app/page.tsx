"use client"

import { useState } from "react"
import { supabase } from "../lib/supabaseClient"

export default function Home() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const signUp = async () => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
      alert(error.message)
    } else {
      alert("Signup successful! Check your email.")
    }
  }

  const signIn = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      alert(error.message)
    } else {
      alert("Logged in!")
    }
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>BEBO</h1>

      <input
        placeholder="email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <br /><br />

      <input
        type="password"
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <br /><br />

      <button onClick={signUp}>Sign Up</button>
      <button onClick={signIn}>Sign In</button>
    </div>
  )
}
