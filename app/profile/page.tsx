"use client";
import { useState } from "react";

export default function Home() {
  const [likes, setLikes] = useState(0);

  return (
    <div style={{ padding: 40 }}>
      <h1>Bebo Feed</h1>

      <div style={{border:"1px solid #333", padding:20, marginTop:20}}>
        <h3>Arizona</h3>
        <p>This is my first post!</p>

        <button onClick={() => setLikes(likes + 1)}>
          ❤️ Like ({likes})
        </button>
      </div>
    </div>
  );
}
