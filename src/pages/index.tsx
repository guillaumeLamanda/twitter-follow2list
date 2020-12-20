import React from "react";
import Link from "next/link";

const Home = () => (
  <div className="flex flex-col flex-grow justify-between">
    <div className="py-20">
      <h1 className="text-5xl text-center">Twitter Following to List</h1>
    </div>
    <div className="w-auto self-center p-20 flex-col justify-center items-center flex">
      <p className="text-lg pt-5 text-center">
        This application help you to place the twitter account you are following
        into list.
      </p>
      <Link href="/app">
        <button className="p-3 rounded transition duration-500 ease-in-out text-gray-700 dark:text-gray-100 text-2xl bg-blue-600 mt-5 mx-auto transform hover:bg-blue-300 hover:text-blue-800 dark:hover:to-text-white">
          Getting started
        </button>
      </Link>
    </div>
  </div>
);

export default Home;
