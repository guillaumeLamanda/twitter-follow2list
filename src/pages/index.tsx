import React from "react";
import fetch from "isomorphic-unfetch";
import { useRouter } from "next/router";

const Home = () => {
  const { replace } = useRouter();
  const onStart = async () => {
    try {
      const { oauthToken } = await (
        await fetch("/api/oauth/request-token")
      ).json();
      localStorage.setItem("oauthToken", oauthToken);
      replace(
        `https://api.twitter.com/oauth/authorize?oauth_token=${oauthToken}`
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col flex-grow justify-between">
      <div className="py-20">
        <h1 className="text-5xl text-center">Twitter Following to List</h1>
      </div>
      <div className="w-auto self-center p-20 flex-col justify-center items-center flex">
        <p className="text-lg pt-5 text-center">
          This application help you to place the twitter account you are
          following into list.
        </p>
        <button
          className="p-3 rounded transition duration-500 ease-in-out text-gray-700 dark:text-gray-100 text-2xl bg-blue-600 mt-5 mx-auto transform hover:bg-blue-300 hover:text-blue-800 dark:hover:to-text-white"
          onClick={onStart}
        >
          Getting started
        </button>
      </div>
    </div>
  );
};

export default Home;
