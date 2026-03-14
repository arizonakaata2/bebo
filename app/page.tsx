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
    if (!image.trim()) {
      alert("Add an image URL first");
      return;
    }

    await supabase.from("posts").insert([
      {
        image: image,
        likes: 0,
      },
    ]);

    setImage("");
    loadPosts();
  }

  async function likePost(id: string, currentLikes: number) {
    await supabase
      .from("posts")
      .update({ likes: currentLikes + 1 })
      .eq("id", id);

    loadPosts();
  }

  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <div style={{ padding: 40 }}>
      <h1>BEBO Feed</h1>

      <div style={{ marginBottom: 20 }}>
        <input
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="Image URL..."
          style={{ width: 300, marginRight: 10 }}
        />

        <button onClick={addPost}>Post</button>
      </div>

      <div style={{ marginTop: 40 }}>
        {posts.map((post) => (
          <div key={post.id} style={{ marginBottom: 40 }}>
            <img
              src={post.image}
              style={{ width: 300, display: "block" }}
            />

            <button
              onClick={() => likePost(post.id, post.likes)}
              style={{ marginTop: 10 }}
            >
              ❤️ {post.likes}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
