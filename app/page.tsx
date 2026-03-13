"use client"

import { useEffect, useState } from "react"
import { supabase } from "../lib/supabaseClient"

export default function Home() {
  const [posts, setPosts] = useState<any[]>([])
  const [content, setContent] = useState("")

  async function getPosts() {
    const { data } = await supabase
      .from("posts")
      .select("*, profiles(username)")
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
    <div style={{
      maxWidth: 600,
      margin: "auto",
      padding: 20,
      fontFamily: "Arial"
    }}>
      
      <h1 style={{marginBottom:20}}>BEBO</h1>

      <div style={{
        border:"1px solid #333",
        padding:15,
        marginBottom:20
      }}>
        <textarea
          placeholder="What's happening?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={{
            width:"100%",
            padding:10,
            background:"#111",
            color:"white",
            border:"1px solid #333"
          }}
        />

        <button
          onClick={createPost}
          style={{
            marginTop:10,
            padding:"8px 20px",
            background:"#2563eb",
            color:"white",
            border:"none",
            cursor:"pointer"
          }}
        >
          Post
        </button>
      </div>

      {posts.map((post) => (
        <div
          key={post.id}
          style={{
            border:"1px solid #333",
            padding:15,
            marginBottom:10
          }}
        >
          <strong>
            @{post.profiles?.username || "user"}
          </strong>

          <p style={{marginTop:5}}>
            {post.content}
          </p>

          <small style={{color:"#888"}}>
            {new Date(post.created_at).toLocaleString()}
          </small>
        </div>
      ))}
    </div>
  )
}
