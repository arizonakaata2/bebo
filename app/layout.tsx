export default function RootLayout({ children }) {
  return (
    <html>
      <body style={{background:"#000",color:"white",fontFamily:"Arial"}}>
        
        <div style={{
          display:"grid",
          gridTemplateColumns:"250px 1fr",
          maxWidth:"1200px",
          margin:"auto"
        }}>

          {/* Sidebar */}
          <div style={{
            borderRight:"1px solid #222",
            padding:20,
            height:"100vh"
          }}>
            <h2>BEBO</h2>

            <p>Home</p>
            <p>Explore</p>
            <p>Profile</p>
            <p>Messages</p>
          </div>

          {/* Main Feed */}
          <div style={{padding:20}}>
            {children}
          </div>

        </div>

      </body>
    </html>
  )
}
