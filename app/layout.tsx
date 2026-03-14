import React from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body style={{ background: "#000", color: "white", fontFamily: "Arial" }}>
        {children}
      </body>
    </html>
  );
}
