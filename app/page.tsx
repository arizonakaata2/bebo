"use client"

import { useEffect, useState } from "react"
import { supabase } from "../lib/supabaseClient"

export default function Home() {
  const [posts, setPosts] = useState<any[]>([])
  const [content, setContent] = useState("")

  async function getPosts() {
    const { data } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false })

    setPosts(data || [])
  }

  async function createPost() {
    if (!content) return

    const user = await supabase.auth.getUser()

    await supabase.from("posts").insert({
      content,
      user_id: user.data.user?.id
    })

    setContent("")
    getPosts()
  }

  useEffect(() => {
    getPosts()
  }, [])

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
      <h1>BEBO Feed</h1>

      <textarea
        placeholder="What's happening?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        style={{ width: "100%", padding: 10 }}
      />

      <button onClick={createPost} style={{ marginTop: 10 }}>
        Post
      </button>

      <hr />

      {posts.map((post) => (
        <div key={post.id} style={{ marginBottom: 20 }}>
          <p>{post.content}</p>
          <small>{post.created_at}</small>
        </div>
      ))}
    </div>
  )
}
