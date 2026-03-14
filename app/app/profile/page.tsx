"use client"

import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabaseClient"

export default function Profile(){

  const [user,setUser] = useState<any>(null)
  const [followers,setFollowers] = useState(0)
  const [following,setFollowing] = useState(0)

  async function loadProfile(){

    const {data} = await supabase.auth.getUser()
    const currentUser = data.user

    setUser(currentUser)

    const {count:followersCount} = await supabase
      .from("follows")
      .select("*",{count:"exact",head:true})
      .eq("following",currentUser?.id)

    const {count:followingCount} = await supabase
      .from("follows")
      .select("*",{count:"exact",head:true})
      .eq("follower",currentUser?.id)

    setFollowers(followersCount || 0)
    setFollowing(followingCount || 0)

  }

  useEffect(()=>{
    loadProfile()
  },[])

  return(

    <div>

      <h1>Profile</h1>

      <p><strong>User ID:</strong></p>
      <small>{user?.id}</small>

      <hr/>

      <p>Followers: {followers}</p>
      <p>Following: {following}</p>

    </div>

  )

}
