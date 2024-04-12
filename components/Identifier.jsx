"use client"

import Image from "next/image";
import dp from "@/public/assets/image-amyrobson.png"
import { useSession } from "next-auth/react";

const Identifier = () => {
  const { data: session } = useSession();

  return (
    <div className="flex gap-3 text-sm items-center text-dark-blue ">
      <Image
        alt="profile"
        src={dp}
        width={24}
        height={24} />

      <p className="font-semibold">{session?.user.username}</p>

      <p>2 weeks ago</p>
    </div>
  )
}

export default Identifier
