"use client"

import { useParams } from "next/navigation"
import { useEffect } from "react"

const Profile = () => {
  const {id} = useParams();
  console.log(id)
useEffect(() => {
  const response = fetch(`/api/comments/all/${id}`);
})

  return (
    <div>
      
    </div>
  )
}

export default Profile
