import { supabase } from "../lib/supabase"

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
  }

  return (
    <main style={{padding:40, color:"white", background:"#0f0f0f", minHeight:"100vh"}}>
      <h1 style={{fontSize:32}}>Bebo Feed</h1>

      <form action={createPost} style={{marginTop:20}}>
        <input
          name="image"
          placeholder="Image URL"
          style={{padding:10, marginRight:10}}
        />
        <button type="submit">Post</button>
      </form>

      {posts?.map((post) => (
        <div key={post.id} style={{marginTop:20, padding:20, border:"1px solid #333"}}>
          <p>{post.image}</p>
        </div>
      ))}

    </main>
  )
}
