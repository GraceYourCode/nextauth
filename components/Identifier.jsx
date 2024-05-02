"use client"

import Image from "next/image";
import dp from "@/public/assets/image-amyrobson.png"
import { useSession } from "next-auth/react";
import Link from "next/link";

const Identifier = ({ username, date, image, id }) => {
  const { data: session } = useSession();

  return (
    <div className="flex gap-3 text-xs xs:text-sm items-center text-dark-blue">
      <Link href={`/profile/${id}`}>
        <Image
          className="rounded-full"
          alt="profile"
          src={image ? image : dp}
          width={28}
          height={28} />
      </Link>

      <Link href={`/profile/${id}`}>
        <p className="font-semibold">{username}</p>
      </Link>

      {
        session?.user.name.replace(" ", "").toLocaleLowerCase() === username &&
        <span className="bg-blue text-white px-1.5 py-0.5 rounded">you</span>
      }


      <p>{date}</p>
    </div>
  )
}

export default Identifier
