import { Link } from "react-router";

export default function Home() {
  return (
    <>
     <div className="max-w-[1268px] mx-auto flex md:flex-row flex-col justify-between items-center lg:mt-10 md:mt-70 mt-12 gap-6">
        <div className="lg:w-[45%] md:w-[60%] space-y-2 md:p-4 ">
            <h1 className="font-semibold lg:text-4xl md:text-3xl text-2xl lg:text-start md:text-start text-center">Manage your Tasks on<div className="text-purple-500 lg:text-3xl md:text-3xl text-2xl  font-semibold pt-2">TaskDuty</div></h1>
            <p className="py-1 md:px-0 px-6 text-gray-600 md:text-start lg:text-xl md:text-2xl text-sm text-center lg:leading-7 md:leading-9 leading-6">Create, organize, and complete your tasks efficiently. Join thousands of users that efficiently plan their daily tasks with ease.</p>
            <div className="bg-purple-500 shadow-xl rounded-lg lg:w-[35%] md:w-[40%] w-[40%] mx-auto md:mx-0 mt-6 text-white text-center text-md px-2 py-3">
            <Link to="/auth/gotomytasks" className="lg:text-lg md:text-xl lg:px-0 md:p-2">Go to my Tasks</Link>
            </div>
        </div>
        <div className="md:w-[45%]">
            <img src="https://task-duty-proj-client.vercel.app/assets/hero-eGcUghao.png" alt="" className="w-full"/>
        </div>
     </div>
    </>
  );
}
