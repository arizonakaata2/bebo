"use client";
import { useState } from "react";

export default function Home() {
  const [posts, setPosts] = useState<string[]>([]);
  const [text, setText] = useState("");

  function addPost() {
    if (text.trim() === "") return;

    setPosts((prev) => [text, ...prev]);
    setText("");
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>BEBO Feed</h1>

      <div style={{ marginBottom: 20 }}>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What's happening?"
          rows={3}
          style={{
            width: 500,
            padding: 10,
            display: "block",
            marginBottom: 10
          }}
        />

        <button onClick={addPost}>Post</button>
      </div>

      {posts.length === 0 && <p>No posts yet.</p>}

      {posts.map((post, i) => (
        <div
          key={i}
          style={{
            border: "1px solid #333",
            padding: 20,
            marginTop: 20
          }}
        >
          <h3>Arizona</h3>
          <p>{post}</p>
        </div>
      ))}
    </div>
  );
}
