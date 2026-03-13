export default function Page() {
  const posts = [
    { id: 1, image: "https://picsum.photos/400/300", likes: 3 },
    { id: 2, image: "https://picsum.photos/400/301", likes: 7 },
  ]

  return (
    <main style={{ padding: 20 }}>
      <h1>Bebo Feed</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))",
          gap: 20,
        }}
      >
        {posts.map((post) => (
          <div
            key={post.id}
            style={{
              border: "1px solid #333",
              padding: 10,
              borderRadius: 10,
            }}
          >
            <img
              src={post.image}
              style={{ width: "100%", borderRadius: 6 }}
            />

            <button
              style={{
                marginTop: 10,
                padding: "6px 10px",
                background: "#444",
                color: "white",
                border: "none",
                borderRadius: 6,
              }}
            >
              ❤️ {post.likes}
            </button>
          </div>
        ))}
      </div>
    </main>
  )
}
   
