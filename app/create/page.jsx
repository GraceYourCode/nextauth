"use client"

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const CreatePrompt = () => {
  const router = useRouter();
  const {data: session} = useSession();
  const [submitting, setSubmitting] = useState(false);

  const [post, setPost] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch("/api/prompt/new", {
        method: "POST",
        body: JSON.stringify({
          userId: session?.user.id,
          prompt: post
        })
      })

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-red-50">
      <textarea className="w-64 h-24 resize-none" value={post} required
      onChange={e => setPost(e.target.value)} placeholder="Type something here..." />
      <button disabled={submitting} type="submit" className="px-7 py-1.5 rounded-lg bg-black text-white">
        {submitting ? "Creating..." : "Create"}
      </button>
    </form>
  )
}

export default CreatePrompt
