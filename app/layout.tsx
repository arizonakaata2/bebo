export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body style={{ margin: 0, fontFamily: "Arial", background: "#111", color: "white" }}>
        <div style={{ display: "flex", minHeight: "100vh" }}>
          
          {/* Sidebar */}
          <div
            style={{
              width: 250,
              background: "#1a1a1a",
              padding: 20,
              borderRight: "1px solid #333",
            }}
          >
            <h2>Bebo</h2>

            <div style={{ marginTop: 30 }}>
              <p><a href="/" style={{ color: "white" }}>Home</a></p>
              <p><a href="/profile" style={{ color: "white" }}>Profile</a></p>
              <p>Friends</p>
              <p>Messages</p>
              <p>Photos</p>
            </div>
          </div>

          {/* Feed area */}
          <div style={{ flex: 1, padding: 40 }}>
            {children}
          </div>

        </div>
      </body>
    </html>
  );
}
