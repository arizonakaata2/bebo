"use client";
import { useState } from "react";

export default function Home() {
  const [posts, setPosts] = useState<string[]>([]);
  const [text, setText] = useState("");

  const addPost = () => {
    setPosts([text, ...posts]);
    setText("");
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Bebo Feed</h1>

      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="What's on your mind?"
      />

      <button onClick={addPost}>Post</button>

      {posts.map((post, i) => (
        <div key={i} style={{border:"1px solid #333", padding:20, marginTop:20}}>
          <h3>Arizona</h3>
          <p>{post}</p>
        </div>
      ))}
    </div>
  );
}
