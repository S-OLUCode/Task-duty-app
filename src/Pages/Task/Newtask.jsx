import React from "react";
import { Link } from "react-router-dom";

export default function Newtask() {
  return (
    <div className="max-w-[1268px] mx-auto w-full lg:p-0 md:px-3 px-3" id="top">
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
        <div className="flex flex-col relative mt-3">
          <label className="absolute -top-3 left-8 md:pl-0 text-gray-400 bg-white">
            Task Title
          </label>
          <input
            type="text"
            placeholder="E.g Project Defense, Assignment ..."
            className=" py-4 px-2 outline-none w-full border border-gray-300 pl-8 pt-4"
          />
        </div>
        <div className="relative mt-6">
          <label className="absolute -top-4 left-8 md:pl-0 text-center text-xl text-gray-400 bg-white w-max">
            Description
          </label>
          <textarea
            name=""
            id=""
            placeholder="Briefly describe your task..."
            className="border border-gray-300 outline-none resize-none w-full pl-8 pt-4"
            rows={5}
          ></textarea>
        </div>
        <div className=" flex relative justify-end py-4 border border-gray-200 mb-8">
          <label className="absolute -top-5 left-8 bg-white text-xl text-gray-400 md:pl-0 pt-1">
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
