"use client"

import { useEffect, useState } from "react"
import { supabase } from "../lib/supabaseClient"

export default function Home() {

  const [posts, setPosts] = useState<any[]>([])
  const [content, setContent] = useState("")

  async function getPosts() {
    const { data } = await supabase
      .from("posts")
      .select("*, profiles(username), likes(count)")
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

  async function likePost(postId: any) {

    const user = await supabase.auth.getUser()

    await supabase.from("likes").insert({
      post_id: postId,
      user_id: user.data.user?.id
    })

    getPosts()
  }

  useEffect(() => {
    getPosts()
  }, [])

  return (
    <div style={{ maxWidth: 600, margin: "40px auto", color: "white" }}>

      <h2>BEBO Feed</h2>

      <textarea
        placeholder="What's happening?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        style={{
          width: "100%",
          padding: 10,
          background: "#111",
          color: "white"
        }}
      />

      <button
        onClick={createPost}
        style={{ marginTop: 10 }}
      >
        Post
      </button>

      <div style={{ marginTop: 30 }}>

        {posts.map((post: any) => (

          <div
            key={post.id}
            style={{
              borderBottom: "1px solid #333",
              padding: "16px 0"
            }}
          >

            <strong>
              @{post.profiles?.username || "user"}
            </strong>

            <p>{post.content}</p>

            <small style={{ color: "#888" }}>
              {new Date(post.created_at).toLocaleString()}
            </small>

            <br />

            <button
              onClick={() => likePost(post.id)}
              style={{ marginTop: 6 }}
            >
              ❤️ Like ({post.likes?.[0]?.count || 0})
            </button>

          </div>

        ))}

      </div>

    </div>
  )
}
