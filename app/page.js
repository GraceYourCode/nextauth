"use client"

import Comments from "@/components/Comments";
import Textbox from "@/components/Textbox";
import { useSession } from "next-auth/react";
// import { useEffect, useState } from "react";

export default function Home({ posts }) {
  const { data: session } = useSession();
  // const [allComments, setAllComments] = useState();


  return (
    <></>
  );
}
