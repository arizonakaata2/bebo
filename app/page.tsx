"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function Home() {
  const [posts, setPosts] = useState<any[]>([]);
  const [image, setImage] = useState("");

  async function loadPosts() {
    const { data } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (data) setPosts(data);
  }

  async function addPost() {
    if (!image) return;

    await supabase.from("posts").insert([
      {
        image: image,
      },
    ]);

    setImage("");
    loadPosts();
  }

  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <div style={{ padding: 40 }}>
      <h1>BEBO Feed</h1>

      <input
        value={image}
        onChange={(e) => setImage(e.target.value)}
        placeholder="Image URL..."
        style={{ width: 300, marginRight: 10 }}
      />

      <button onClick={addPost}>Post</button>

      <div style={{ marginTop: 40 }}>
        {posts.map((post) => (
          <div key={post.id} style={{ marginBottom: 30 }}>
            <img src={post.image} width="300" />
            <p>❤️ {post.likes}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
