import React from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body style={{ background: "#000", color: "white", fontFamily: "Arial" }}>

        <nav style={{ padding:20, borderBottom:"1px solid #333" }}>
          <a href="/" style={{marginRight:20}}>Home</a>
          <a href="/profile">Profile</a>
        </nav>

        {children}

      </body>
    </html>
  );
}
