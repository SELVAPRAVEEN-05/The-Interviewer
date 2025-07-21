import HeroButton from "@/components/atoms/button";
import HeroInput from "@/components/atoms/input";
import React from "react";

export default function Register() {
  return (
    <div className="h-full p-7 flex flex-col items-center   rounded-xl w-2/5 	bg-gray-100">
      <div className="w-full text-center text-3xl font-bold pt-2 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text ">
        <span className="pr-3 text-4xl bg-transparent animate-bounce">💼</span>
        messismo
      </div>

      <div className="w-full text-center text-5xl py-10 font-bold text-gray-800 relative">
        Register
      </div>
      <div className="w-4/5 py-5">
        <HeroInput label="Username" type="text" isRequired />
      </div>
      <div className="w-4/5 py-3">
        <HeroInput label="Email" type="email" isRequired />
      </div>
      <div className="w-4/5 py-5">
        <HeroInput label="Password" type="text" isRequired />
      </div>
      <div className="w-4/5  flex justify-center py-5">
        <HeroButton className="text-white w-full">Register</HeroButton>
      </div>
      <div className="flex items-center w-4/5 pb-5">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="flex-shrink mx-4 text-gray-500 font-medium">or</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>
      <div className="w-4/5 flex justify-center pb-6">
        <HeroButton className="text-gray-700 w-full bg-white border-2 border-gray-300   font-semibold py-3 rounded-xl flex items-center justify-center">
          Sign in with Google
        </HeroButton>
      </div>
      <div className="text-gray-600 text-sm">
        Already have and Account?{" "}
        <button className="text-indigo-600 hover:text-indigo-800 font-semibold underline decoration-2 decoration-indigo-300 hover:decoration-indigo-500 transition-all duration-200 transform hover:scale-105">
          Login
        </button>
      </div>
    </div>
  );
}
