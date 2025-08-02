"use client";
import { useRouter } from "next/navigation";
import { FaEyeSlash, FaRegEye } from "react-icons/fa";
import { GoogleIcon } from "@/components/icons";
import { useRegisterStore } from "@/components/store/account/register";
import { Input } from "@heroui/input";
import { Button } from "@nextui-org/react";
import React from "react";
import logo from "@/components/assets/first.png";
import Image from "next/image";

export default function Register() {
  const router = useRouter();
  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible((prev) => !prev);

  const { userName, emailId, password, setData } = useRegisterStore();
  console.log(userName, emailId, password);

  return (
    <div className="flex items-center justify-end h-screen">
      <Image className="h-full w-full" src={logo} alt="img" />
      <div className="absolute w-1/2 h-full p-10 flex justify-center items-center rounded-xl">
        <div className="w-4/5 h-full p-10">
          <div className="w-full text-start text-5xl font-bold">Sign Up</div>
          <p className="pt-3 text-gray-400">Create your account to get started</p>

          <div className="py-7">
            <Input
              label="Username"
              type="text"
              isRequired
              variant="bordered"
              value={userName}
              onChange={(e) => setData({ userName: e.target.value })}
            />
          </div>

          <Input
            label="Email"
            type="email"
            isRequired
            variant="bordered"
            value={emailId}
            onChange={(e) => setData({ emailId: e.target.value })}
          />

          <div className="py-7">
            <Input
              isRequired
              label="Password"
              type={isVisible ? "text" : "password"}
              variant="bordered"
              value={password}
              onChange={(e) => setData({ password: e.target.value })}
              endContent={
                <button
                  type="button"
                  className="flex items-center focus:outline-none"
                  onClick={toggleVisibility}
                >
                  {isVisible ? (
                    <FaEyeSlash className="text-xl text-default-400 pointer-events-none" />
                  ) : (
                    <FaRegEye className="text-xl text-default-400 pointer-events-none" />
                  )}
                </button>
              }
            />
          </div>

          <Button className="w-full p-7 text-white" color="primary" size="lg">
            Sign Up
          </Button>

          <div className="flex items-center p-5">
            <div className="flex-grow border-t border-black"></div>
            <span className="mx-4 font-medium">or</span>
            <div className="flex-grow border-t border-black"></div>
          </div>

          <Button className="w-full p-7 text-black" variant="bordered" size="lg">
            <GoogleIcon /> Signin with Google
          </Button>

          <div className="pt-12">
            <p>
              Already have an account?{" "}
              <span
                className="text-blue-600 underline cursor-pointer"
                onClick={() => router.push("/login")}
              >
                Log In
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
