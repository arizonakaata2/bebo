"use client";
import { useState } from "react";

export default function Home() {
  const [posts, setPosts] = useState<string[]>([]);
  const [text, setText] = useState("");

  const addPost = () => {
    if (!text) return;
    setPosts([text, ...posts]);
    setText("");
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>BEBO Feed</h1>

      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="What's happening?"
        style={{marginRight:10}}
      />

      <button onClick={addPost}>Post</button>

      {posts.map((post, i) => (
        <Post key={i} text={post} />
      ))}
    </div>
  );
}

function Post({ text }: { text: string }) {
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState<string[]>([]);
  const [commentText, setCommentText] = useState("");

  const addComment = () => {
    if (!commentText) return;
    setComments([...comments, commentText]);
    setCommentText("");
  };

  return (
    <div style={{border:"1px solid #333", padding:20, marginTop:20}}>
      <h3>Arizona</h3>
      <p>{text}</p>

      <button onClick={() => setLikes(likes + 1)}>
        ❤️ Like ({likes})
      </button>

      <div style={{marginTop:15}}>
        <input
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Write a comment..."
        />
        <button onClick={addComment}>Comment</button>

        {comments.map((c, i) => (
          <p key={i}>💬 {c}</p>
        ))}
      </div>
    </div>
  );
}
