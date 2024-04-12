import Image from "next/image";
import dp from "@/public/assets/image-amyrobson.png";

const Textbox = () => {
  return (
    <form className="bg-white rounded-md fixed w-1/2 bottom-5 flex gap-3 items-start p-5">
      <Image
      alt="dp"
      src={dp}
      height={30}
      width={30} />

      <textarea className="resize-none p-2.5 text-sm w-full h-20 border border-solid border-light-gray rounded-md" />

      <button className="text-white px-5 py-2 bg-blue rounded-md text-sm hover:bg-gray-blue">
        SEND
      </button>
    </form>
  )
}

export default Textbox
