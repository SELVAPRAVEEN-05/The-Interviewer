"use client";
import { GoogleIcon } from "@/components/icons";
import { Input } from "@heroui/input";
import { Button } from "@nextui-org/react";
import React from "react";
import { FaEyeSlash, FaRegEye } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useRegisterStore } from "@/components/store/account/register";

export default function Register() {
  const router = useRouter();
  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const { userName, emailId, password, setData } = useRegisterStore();
  console.log(userName, emailId, password);
  return (
    <div className="flex items-center justify-end h-screen">
      <div className="h-full p-10 flex justify-center items-center rounded-xl w-1/2">
        <div className="w-4/5 h-full p-10">
          <div className="w-full text-start text-5xl font-bold">Sign Up</div>
          <p className="pt-3 text-gray-400">
            Create your account to get started
          </p>

          <div className="py-7">
            <Input
              label="Username"
              type="text"
              isRequired
              variant="bordered"
              value={userName}
              onChange={(e) => setData({ userName: e.target.value })} // ✅ update Zustand
            />
          </div>

          <Input
            label="Email"
            type="email"
            isRequired
            variant="bordered"
            value={emailId}
            onChange={(e) => setData({ emailId: e.target.value })} // ✅ update Zustand
          />

          <div className="py-7">
            <Input
              isRequired
              endContent={
                <button
                  className="flex items-center focus:outline-hidden"
                  type="button"
                  onClick={toggleVisibility}
                >
                  {isVisible ? (
                    <FaEyeSlash className="text-xl text-default-400 pointer-events-none" />
                  ) : (
                    <FaRegEye className="text-xl text-default-400 pointer-events-none" />
                  )}
                </button>
              }
              label="Password"
              type={isVisible ? "text" : "password"}
              variant="bordered"
              value={password}
              onChange={(e) => setData({ password: e.target.value })} // ✅ update Zustand
            />
          </div>

          <Button className="text-white w-full p-7" color="primary" size="lg">
            Sign Up
          </Button>

          <div className="flex items-center p-5">
            <div className="flex-grow border-t border-black"></div>
            <span className="flex-shrink mx-4 font-medium">or</span>
            <div className="flex-grow border-t border-black"></div>
          </div>

          <Button
            className="w-full p-7 text-black"
            variant="bordered"
            size="lg"
          >
            <GoogleIcon /> Signin with Google
          </Button>

          <div className="pt-12">
            <p>
              Already have an account?{" "}
              <span
                className="text-blue-600 underline py-4 cursor-pointer"
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
