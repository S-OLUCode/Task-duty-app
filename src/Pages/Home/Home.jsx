import { Link } from "react-router";

export default function Home() {
  return (
    <>
     <div className="max-w-[1268px] mx-auto flex md:flex-row flex-col justify-between items-center mt-10 gap-6">
        <div className="md:w-[45%] space-y-2">
            <h1 className="font-medium text-3xl md:text-start text-center">Manage your Tasks on<div className="text-purple-500 text-xl font-medium pt-2">TaskDuty</div></h1>
            <p className="py-3 md:px-0 px-6 text-black md:text-start text-justify">Create, organize, and complete your tasks efficiently. Join thousands of users that efficiently plan their daily tasks with ease.</p>
            <div className="bg-purple-500 shadow-xl rounded-lg md:w-[35%] w-[40%] mx-auto md:mx-0 mt-6 text-white text-center text-md px-2 py-3">
            <Link to="/auth/gotomytasks">Go to my Tasks</Link>
            </div>
        </div>
        <div className="md:w-[45%]">
            <img src="https://task-duty-proj-client.vercel.app/assets/hero-eGcUghao.png" alt="" className="w-full"/>
        </div>
     </div>
    </>
  );
}
