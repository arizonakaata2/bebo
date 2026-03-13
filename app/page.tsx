import { supabase } from "../lib/supabase"
import { revalidatePath } from "next/cache"

export const dynamic = "force-dynamic"

export default async function Home() {

  const { data: posts } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false })

  async function createPost(formData: FormData) {
    "use server"

    const image = formData.get("image")

    await supabase.from("posts").insert([
      { image }
    ])
  
    revalidatePath("/")
    
  }
  

  return (
  <main style={{
    padding:40,
    background:"#0f0f0f",
    minHeight:"100vh",
    color:"white",
    fontFamily:"Arial"
  }}>
    
    <h1 style={{fontSize:32, marginBottom:20}}>Bebo Feed 🚀</h1>

    <form action={createPost} style={{
      display:"flex",
      gap:10,
      marginBottom:40
    }}>
      <input
        name="image"
        placeholder="Paste image URL..."
        style={{
          padding:10,
          flex:1,
          borderRadius:6,
          border:"1px solid #333",
          background:"#1a1a1a",
          color:"white"
        }}
      />

      <button style={{
        padding:"10px 20px",
        borderRadius:6,
        border:"none",
        background:"#4f46e5",
        color:"white",
        cursor:"pointer"
      }}>
        Post
      </button>
    </form>

    <div style={{
      display:"grid",
      gridTemplateColumns:"repeat(auto-fill, minmax(300px, 1fr))",
      gap:20
    }}>
      {posts?.map((post) => (
        <div key={post.id} style={{
          background:"#1a1a1a",
          borderRadius:10,
          overflow:"hidden",
          border:"1px solid #333"
        }}>
          <img src={post.image} style={{
            width:"100%",
            display:"block"
          }} />
        </div>
      ))}
    </div>

  </main>
)
      ))}

    </main>
  )
}
