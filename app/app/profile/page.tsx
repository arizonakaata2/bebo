"use client"

import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabaseClient"

export default function Profile() {

  const [user,setUser] = useState<any>(null)
  const [followers,setFollowers] = useState(0)

  async function loadProfile(){

    const {data:userData} = await supabase.auth.getUser()

    setUser(userData.user)

    const {count} = await supabase
      .from("follows")
      .select("*",{count:"exact",head:true})
      .eq("following",userData.user?.id)

    setFollowers(count || 0)

  }

  async function followUser(){

    const {data:userData} = await supabase.auth.getUser()

    await supabase.from("follows").insert({
      follower:userData.user?.id,
      following:userData.user?.id
    })

    loadProfile()

  }

  useEffect(()=>{
    loadProfile()
  },[])

  return (

    <div>

      <h1>Profile</h1>

      <p>User ID:</p>
      <small>{user?.id}</small>

      <p style={{marginTop:20}}>
        Followers: {followers}
      </p>

      <button onClick={followUser}>
        Follow
      </button>

    </div>

  )

}
