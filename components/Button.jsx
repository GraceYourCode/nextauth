import { FaReply } from "react-icons/fa";
import { MdOutlineEdit, MdDelete } from "react-icons/md";

const Button = ({ hide, click, id, type }) => {
  return (
    <button className={`${type === "Delete" ? "text-red" : "text-blue"} ${hide && "hidden sm:flex"} flex gap-1 items-center group text-sm font-medium`} onClick={() => click(id)}>
      {
        type === "Reply" ? <FaReply className="group-hover:text-gray-blue" /> : 
          type === "Edit" ? <MdOutlineEdit className="group-hover:text-gray-blue" /> : <MdDelete className="group-hover:text-pale-red" />
        }
        <span className="group-hover:text-gray-blue">{type}</span>
    </button>
  )
}

export default Button
