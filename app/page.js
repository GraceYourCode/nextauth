import Comment from "@/components/Comment";
import Textbox from "@/components/Textbox";

export default function Home() {
  return (
    <div className="flex justify-center w-screen">
      <main className=" w-1/2 flex items-center py-5">
        <Comment />
        <Textbox />
      </main>
    </div>
  );
}
