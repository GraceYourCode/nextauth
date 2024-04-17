import Link from "next/link"

const Contents = ({ content, replyingTo }) => {
  return (
    <p className="text-sm text-contents">
      {replyingTo && <Link href="/chat" className="text-blue font-bold">{`@${replyingTo}  `}</Link>}
      {content}
    </p>
  )
}

export default Contents
