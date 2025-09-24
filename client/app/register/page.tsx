"use client";
import logo from "@/components/assets/loginwith.jpg";
import Mob from "@/components/assets/or.jpg";
import { GoogleIcon } from "@/components/icons";
import { useRegisterStore } from "@/components/store/account/register";
import { Button, Input } from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { FaEyeSlash, FaRegEye } from "react-icons/fa";

export default function Register() {
  const router = useRouter();
  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible((prev) => !prev);

  const { userName, emailId, password, setData } = useRegisterStore();

  return (
    <div className="flex items-center justify-end h-screen text-white bg-black">
      <Image className="hidden lg:flex h-full w-full" src={logo} alt="img" />
      <Image className="flex lg:hidden h-full w-full" src={Mob} alt="img" />

      <div className="w-full xl:w-1/2 lg:w-3/5 px-4 md:px-6 absolute lg:h-full lg:flex justify-center items-center lg:py-10 lg:pl-36 bg-transparent">
        <div className="w-full lg:w-4/5 h-full py-10">
          <h1 className="text-5xl font-bold">Sign Up</h1>
          <p className="pt-2 text-gray-400 text-sm">
            Create your account to get started
          </p>

          <div className="pt-7">
            <Input
              label="Username"
              isRequired
              variant="bordered"
              value={userName}
              onChange={(e) => setData({ userName: e.target.value })}
              classNames={{
                inputWrapper:
                  "border border-white group-data-[focus=true]:border-white",
              }}
            />
          </div>

          <div className="pt-7">
            <Input
              label="Email"
              type="email"
              isRequired
              variant="bordered"
              value={emailId}
              onChange={(e) => setData({ emailId: e.target.value })}
              classNames={{
                inputWrapper:
                  "border border-white group-data-[focus=true]:border-white",
              }}
            />
          </div>

          <div className="pt-7">
            <Input
              label="Password"
              isRequired
              type={isVisible ? "text" : "password"}
              variant="bordered"
              value={password}
              onChange={(e) => setData({ password: e.target.value })}
              classNames={{
                inputWrapper:
                  "border border-white group-data-[focus=true]:border-white",
              }}
              endContent={
                <button
                  type="button"
                  onClick={toggleVisibility}
                  className="focus:outline-none flex h-full items-center"
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

          <div className="pt-6">
            <Button
              className="w-full text-white"
              color="primary"
              size="lg"
              onPress={() => router.push("/interviewerOnBoarding")}
            >
              Sign Up
            </Button>
          </div>

          <div className="flex items-center py-5">
            <div className="flex-grow border-t border-white"></div>
            <span className="mx-4 font-medium text-sm">or</span>
            <div className="flex-grow border-t border-white"></div>
          </div>

          <Button
            className="w-full p-7 text-white"
            variant="bordered"
            size="lg"
          >
            <GoogleIcon /> <span className="ml-2">Signin with Google</span>
          </Button>

          <div className="pt-6 text-sm">
            <p>
              Already have an account?{" "}
              <span
                className="text-blue-600 underline cursor-pointer"
                onClick={() => router.push("/login")}
              >
                LogIn
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
