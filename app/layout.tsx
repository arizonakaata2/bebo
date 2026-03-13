import "./globals.css";
import { SessionProvider } from "next-auth/react"

export const metadata = {
  title: "Bebo",
  description: "Next generation social network"
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{margin:0, background:"#000", color:"#fff", fontFamily:"Arial"}}>
        
        {/* Top Bar */}
        <header style={{
          display:"flex",
          justifyContent:"space-between",
          alignItems:"center",
          padding:"15px 30px",
          borderBottom:"1px solid #222"
        }}>
          <h2 style={{
            background:"linear-gradient(90deg,#9333ea,#06b6d4)",
            WebkitBackgroundClip:"text",
            color:"transparent"
          }}>
            BEBO
          </h2>

          <nav style={{display:"flex", gap:"20px"}}>
            <a href="/" style={{color:"white", textDecoration:"none"}}>Home</a>
            <a href="#" style={{color:"white", textDecoration:"none"}}>Explore</a>
            <a href="#" style={{color:"white", textDecoration:"none"}}>Messages</a>
            <a href="#" style={{color:"white", textDecoration:"none"}}>Profile</a>
          </nav>
        </header>

        {/* Page Content */}
        <SessionProvider>
        <main>
          {children}
        </main>
          </SessionProvider>

      </body>
    </html>
  );
}
