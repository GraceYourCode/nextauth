"use client"

import dynamic from 'next/dynamic'

const Textbox = dynamic(() => import('@/components/Textbox'), {
  ssr: false,
})
import Comments from "@/components/Comments";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import posts from "@/store/store";
import { io } from 'socket.io-client';
import DeleteModal from '@/components/DeleteModal';


const ChatPage = () => {
  const socket = io("http://localhost:5000");

  const { data: session } = useSession();
  const [allPosts, setAllPosts] = useState();
  const [reply, setReply] = useState();
  const [submitting, setSubmitting] = useState(false);
  const [liked, setLiked] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [toDelete, setToDelete] = useState();

  const postComment = async (e, content) => {
    e.preventDefault();
    setSubmitting(true);


    const newComment = {
      userId: session?.user.id,
      content: content,
      likes: 0,
      dateCreated: new Date(),
    }

    try {
      const response = await fetch("/api/comments/new", {
        method: "POST",
        body: JSON.stringify(newComment)
      });

      const pushData = await response.json();

      await fetch("/api/likes/new", {
        method: "POST",
        body: JSON.stringify(pushData._id)
      })
      //re-routes to home page
      if (response.ok) {
        socket.emit("chat-comment", pushData);
      };

    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  }

  const postReply = async (e, commentId, content) => {
    e.preventDefault();
    setSubmitting(true);

    const newReply = {
      userId: session?.user.id,
      content: content.split(" ").slice(1).join(" ").toString(),
      likes: 0,
      dateCreated: new Date(),
      commentId: commentId,
      replyingTo: content.split(" ")[0].substring(1),
    }

    try {
      const response = await fetch("/api/reply/new", {
        method: "POST",
        body: JSON.stringify(newReply)
      });

      const pushData = await response.json();

      await fetch("/api/likes/new", {
        method: "POST",
        body: JSON.stringify(pushData._id)
      })

      console.log(pushData, response.ok);
      //re-routes to home page
      if (response.ok) {
        setReply(undefined);
        socket.emit("chat-reply", pushData);
      };

    } catch (error) {
      throw error
    } finally {
      setSubmitting(false);
    }
  }

  const likeAndUnlike = async (like, id, reply) => {
    const response = await fetch(`/api/${reply ? "reply" : "comments"}/${id}`, {
      method: "POST",
      body: JSON.stringify(like)
    })

    await fetch(`/api/likes/${id}`, {
      method: "POST",
      body: JSON.stringify({
        userId: session?.user.id,
        like,
      }),
    })

    console.log(JSON.stringify(like))
    const data = await response.json()

    if (response.ok) {
      setLiked(prev => !prev);
      socket.emit("likes", data)
    };
  }

  const popUpDelete = (id) => {
    setShowDelete(prev => !prev);
    console.log(id)
    id && setToDelete(id);
  }

  useEffect(() => {
    socket.connect();

    socket.on("chat-comment", msg => {
      setAllPosts([...allPosts, msg]);
    })

    socket.on("chat-reply", msg => {
      const updatedPosts = allPosts && allPosts.map((post) => {
        if (post._id === msg.commentId) {
          return {
            ...post,
            replies: post.replies ? [...post.replies, msg] : [msg],
          }
        }
        return post;
      })

      setAllPosts(updatedPosts);
    })

    socket.on("likes", msg => {
      let updatedPosts;
      if ("commentId" in msg) {
        updatedPosts = allPosts && allPosts.map(post => {
          if (post._id === msg.commentId) {
            post.replies.map(reply => {
              if (reply._id === msg._id) {
                reply.likes = msg.likes;
                return reply;
              }
              return reply;
            })
          }
          return post;
        })
      } else {
        updatedPosts = allPosts && allPosts.map(post => {
          if (post._id === msg._id) {
            post.likes = msg.likes;
            return post;
          }
          return post
        })
      }
      setAllPosts(updatedPosts);
    })

    return () => socket.disconnect();
  }, [allPosts])

  return (
    <posts.Provider value={{
      allPosts, setAllPosts,
      reply, setReply,
      submitting, setSubmitting,
      postReply, likeAndUnlike,
      liked, setLiked,
      showDelete, setShowDelete,
      toDelete, setToDelete,
      popUpDelete,
    }}>
      <>
        <div className="flex flex-col items-center w-screen bg-background">
          <main className="align-page flex flex-col gap-y-4 items-center pb-3 md:pb-5">
            <Comments posts={posts} />
            {showDelete && <DeleteModal />}
          </main>
          {session?.user && <Textbox submit={postComment} />}
        </div>
      </>
    </posts.Provider>
    // 
  )
}

export default ChatPage
