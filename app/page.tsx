"use client";
import { useState } from "react";

type PostType = {
  text: string;
  likes: number;
  comments: string[];
};

export default function Home() {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [text, setText] = useState("");

  function addPost() {
    if (text.trim() === "") return;

    const newPost: PostType = {
      text,
      likes: 0,
      comments: []
    };

    setPosts([newPost, ...posts]);
    setText("");
  }

  function likePost(index: number) {
    const updated = [...posts];
    updated[index].likes += 1;
    setPosts(updated);
  }

  function addComment(index: number, comment: string) {
    if (!comment.trim()) return;

    const updated = [...posts];
    updated[index].comments.push(comment);
    setPosts(updated);
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
        <Post
          key={i}
          post={post}
          index={i}
          likePost={likePost}
          addComment={addComment}
        />
      ))}
    </div>
  );
}

function Post({
  post,
  index,
  likePost,
  addComment
}: {
  post: PostType;
  index: number;
  likePost: (index: number) => void;
  addComment: (index: number, comment: string) => void;
}) {
  const [commentText, setCommentText] = useState("");

  return (
    <div
      style={{
        border: "1px solid #333",
        padding: 20,
        marginTop: 20
      }}
    >
      <h3>Arizona</h3>

      <p>{post.text}</p>

      <button onClick={() => likePost(index)}>
        ❤️ Like ({post.likes})
      </button>

      <div style={{ marginTop: 15 }}>
        <input
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Write a comment..."
        />

        <button
          onClick={() => {
            addComment(index, commentText);
            setCommentText("");
          }}
        >
          Comment
        </button>

        {post.comments.map((c, i) => (
          <p key={i}>💬 {c}</p>
        ))}
      </div>
    </div>
  );
}
