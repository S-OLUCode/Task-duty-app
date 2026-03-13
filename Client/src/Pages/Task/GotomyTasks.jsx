import { Link  } from "react-router-dom";

export default function GotomyTasks() {
  return (
    <div className="max-w-[1268px] mx-auto space-y-10 lg:px-0 md:px-5 px-3">
      <div className="flex justify-between my-10">
        <div>
          <h1 className="text-4xl">My Tasks</h1>
        </div>
        <Link to="/auth/newtask">
        <div className="pt-3">
          <p className="text-xl text-purple-600">+ Add new task</p>
        </div>
        </Link>
      </div>
      <div className="border border-gray-300 rounded-md px-3">
        <div className="flex justify-between py-4">
          <p className="mt-3 text-[17px] text-red-300">Urgent</p>
          <div className="flex gap-2">
            <div className="">
              <Link to="/auth/alltask" className="bg-purple-600 py-1 px-4 border-purple-600 text-white rounded-sm flex gap-2"><img src="/clarity.png" alt="" />
                Edit
              </Link>
            </div>
            <div  >
              <button className="py-1 px-2 border border-purple-600 text-purple-600 rounded-sm flex gap-2"><img src="/trashIcon.jpg" alt="" />Delete</button>
            </div>
          </div>
        </div>
        <hr className="text-gray-300" />
        <h2 className="py-3 text-3xl font-medium">Fintech Website Update</h2>
        <p className="text-justify text-gray-700 pb-6">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ut dui varius turpis facilisis ultricies a id elit. Pellentesque at ante in tortor pharetra finibus. In volutpat, risus vitae fringilla porttitor, ipsum ante porta ex, ut pellentesque tellus ipsum non orci. Donec sit amet euismod mi. Ut vel eros in ipsum congue porttitor.</p>
      </div>

      <div className="border border-gray-300 rounded-md px-3">
        <div className="flex justify-between py-4">
          <p className="mt-3 text-[17px] text-green-300">Important</p>
          <div className="flex gap-2">
            <div className="">
             <Link to="/auth/alltask" className="bg-purple-600 py-1 px-4 border-purple-600 text-white rounded-sm flex gap-2"><img src="/clarity.png" alt="" />
                Edit
              </Link>
            </div>
            <div  >
              <button className="py-1 px-2 border border-purple-600 text-purple-600 rounded-sm flex gap-2"><img src="/trashIcon.jpg" alt="" />Delete</button>
            </div>
          </div>
        </div>
        <hr className="text-gray-300" />
        <h2 className="py-3 text-3xl font-medium">Agro Website Update</h2>
        <p className="text-justify text-gray-700 pb-6">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ut dui varius turpis facilisis ultricies a id elit. Pellentesque at ante in tortor pharetra finibus. In volutpat, risus vitae fringilla porttitor, ipsum ante porta ex, ut pellentesque tellus ipsum non orci. Donec sit amet euismod mi. Ut vel eros in ipsum congue porttitor.</p>
      </div>

      <div className="border border-gray-300 rounded-md px-3">
        <div className="flex justify-between py-4">
          <p className="mt-3 text-[17px] text-red-300">Urgent</p>
          <div className="flex gap-2">
            <div className="">
              <Link to="/auth/alltask" className="bg-purple-600 py-1 px-4 border-purple-600 text-white rounded-sm flex gap-2"><img src="/clarity.png" alt="" />
                Edit
              </Link>
            </div>
            <div  >
              <button className="py-1 px-2 border border-purple-600 text-purple-600 rounded-sm flex gap-2"><img src="/trashIcon.jpg" alt="" />Delete</button>
            </div>
          </div>
        </div>
        <hr className="text-gray-300" />
        <h2 className="py-3 text-3xl font-medium">Fintech Website Update</h2>
        <p className="text-justify text-gray-700 pb-6">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ut dui varius turpis facilisis ultricies a id elit. Pellentesque at ante in tortor pharetra finibus. In volutpat, risus vitae fringilla porttitor, ipsum ante porta ex, ut pellentesque tellus ipsum non orci. Donec sit amet euismod mi. Ut vel eros in ipsum congue porttitor.</p>
      </div>

      <div className="border border-gray-300 rounded-md px-3 md:my-0 my-6">
        <div className="flex justify-between py-4">
          <p className="mt-3 text-[17px] text-green-300">Important</p>
          <div className="flex gap-2">
            <div className="">
              <Link to="/auth/alltask" className="bg-purple-600 py-1 px-4 border-purple-600 text-white rounded-sm flex gap-2"><img src="/clarity.png" alt="" />
                Edit
              </Link>
            </div>
            <div  >
              <button className="py-1 px-2 border border-purple-600 text-purple-600 rounded-sm flex gap-2"><img src="/trashIcon.jpg" alt="" />Delete</button>
            </div>
          </div>
        </div>
        <hr className="text-gray-300" />
        <h2 className="py-3 text-3xl font-medium">Agro Website Update</h2>
        <p className="text-justify text-gray-700 pb-6">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ut dui varius turpis facilisis ultricies a id elit. Pellentesque at ante in tortor pharetra finibus. In volutpat, risus vitae fringilla porttitor, ipsum ante porta ex, ut pellentesque tellus ipsum non orci. Donec sit amet euismod mi. Ut vel eros in ipsum congue porttitor.</p>
      </div>
       <a
          href="#top"
         className="underline text-purple-500 lg:pb-1 md:pb-4 pb-2 md:mt-8 pt-2 text-center w-full block"
        >
          Back To Top
        </a>
    </div>
  );
}
