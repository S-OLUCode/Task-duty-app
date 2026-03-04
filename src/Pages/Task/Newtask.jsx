import React from "react";
import { Link } from "react-router-dom";

export default function Newtask() {
  return (
    <div className="max-w-[1268px] mx-auto w-full md:p-0 px-3" id="top">
      <div className="flex items-center gap-1 md:my-8 my-6">
        <Link to="/">
          <img
            src="/69036dac6c6467000c309eaf (1).png"
            alt=""
            className="w-[30px]"
          />
        </Link>
        <h1 className="text-2xl font-semibold">New Task</h1>
      </div>
      <form className="flex flex-col gap-6 w-full space-y-4">
        <div className="flex flex-col">
          <label htmlFor="" className="pl-6 font-medium text-gray-500">
            Task Title
          </label>
          <input
            type="text"
            placeholder="E.g Project Defense, Assignment ..."
            className=" py-4 px-2 outline-none w-full border border-gray-200"
          />
        </div>
        <div>
          <label htmlFor="" className="pl-6 font-medium text-gray-500">
            Description
          </label>
          <textarea
            name=""
            id=""
            placeholder="Briefly describe your task..."
            className="border border-gray-200 outline-none resize-none w-full pl-2 pt-2"
            rows={5}
          ></textarea>
        </div>
        <div className="flex justify-between py-4 border border-gray-200 mb-8">
          <label htmlFor="" className="text-gray-500 pl-2 pt-1">
            Tags
          </label>
          <select
            name=""
            id=""
            className="border border-purple-500 text-purple-500 outline-none px-1 py-1 mx-2"
          >
            <option value="">Select options</option>
            <option value="Urgent">Urgent</option>
            <option value="Important">Important</option>
          </select>
        </div>
      </form>
      <div className="md:mt-10 mt-5 md:pt-8 space-y-3">
        <button className="bg-purple-500 text-white w-full rounded py-3">
          Done
        </button>
        <a
          href="#top"
          className="underline text-purple-500 my-2 md:mt-4 text-center w-full block"
        >
          Back To Top
        </a>
      </div>
    </div>
  );
}
