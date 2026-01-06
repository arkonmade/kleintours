import React from "react";
import { Link } from "react-router-dom";
import GridShape from "../components/GridShape";
import { assets } from "../assets/assets";

const NotFound = () => {
  return (
    <>
      <div className="relative flex flex-col items-center justify-center min-h-screen p-6 overflow-hidden z-1">
        <GridShape />
        <div className="mx-auto w-full text-center max-w-[242px] sm:max-w-[472px] ">
          <h1 className="mb-8 font-bold text-gray-800 text-title-md  xl:text-title-2xl">
            ERROR
          </h1>

          <img src={assets.img.error} alt="404" className="" />

          <p className="mt-10 mb-6 text-base text-gray-700 sm:text-lg">
            We can’t seem to find the page you are looking for!
          </p>

          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-5 py-3.5 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800"
          >
            Back to Home Page
          </Link>
        </div>

        <p className="absolute text-sm text-center text-gray-500 -translate-x-1/2 bottom-6 left-1/2 ">
          &copy; {new Date().getFullYear()} - Klein Transports & Tours
        </p>
      </div>
    </>
  );
};

export default NotFound;
