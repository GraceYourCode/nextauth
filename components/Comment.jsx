import { FaPlus, FaMinus } from "react-icons/fa";
import Identifier from "./Identifier";
import Button from "./Button";
import Contents from "./Contents";

const Comment = () => {
  return (
    <div className="bg-white p-5 rounded-md flex gap-4 items-center">

      {/* this aside tag below is meant for desktop view */}
      <aside className="bg-background px-3 rounded-md py-3">
        <button className="flex flex-col gap-3 items-center">
          <FaPlus className="icons" />

          <p className="font-medium text-blue">12</p>

          <FaMinus className="icons" />
        </button>
      </aside>

      <main className="flex flex-col w-full gap-y-3">
        <div className="flex justify-between w-full">
          <Identifier />
          <Button />
        </div>
        <Contents />
      </main>
    </div>
  )
}

export default Comment
