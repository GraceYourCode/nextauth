import { FaReply } from "react-icons/fa";

const Button = ({ hide, click, id }) => {
  return (
    <button className={`text-blue ${hide && "hidden sm:flex"} flex gap-1 items-center group text-sm font-medium`} onClick={()=>click(id)}>
      <FaReply className="group-hover:text-gray-blue" />
      <span className="group-hover:text-gray-blue">Reply</span>
    </button>
  )
}

export default Button
