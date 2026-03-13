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

  async function likePost(postId:any) {
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
    <div style={{maxWidth:600,margin:"auto",padding:20,fontFamily:"Arial"}}>
      
      <h1>BEBO</h1>

      <textarea
        placeholder="What's happening?"
        value={content}
        onChange={(e)=>setContent(e.target.value)}
        style={{width:"100%",padding:10}}
      />

      <button onClick={createPost} style={{marginTop:10}}>
        Post
      </button>

      <hr/>

      {posts.map((post)=>(
        <div key={post.id} style={{marginBottom:20}}>

          <strong>
            @{post.profiles?.username || "user"}
          </strong>

          <p>{post.content}</p>

          <button onClick={()=>likePost(post.id)}>
            ❤️ Like ({post.likes?.[0]?.count || 0})
          </button>

        </div>
      ))}
    </div>
  )
}
