import { createClient } from "@supabase/supabase-js"

export default async function Home() {

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

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
    <main style={{padding:40}}>
      <h1>Bebo Feed 🚀</h1>

      <form action={createPost}>
        <input name="image" placeholder="Image URL" />
        <button type="submit">Post</button>
      </form>

      {posts?.map((post) => (
        <div key={post.id} style={{marginTop:20}}>
          <img src={post.image} width="300" />
        </div>
      ))}

    </main>
  )
}
