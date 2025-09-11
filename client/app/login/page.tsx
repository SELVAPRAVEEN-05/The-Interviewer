"use client";
import logo from "@/components/assets/loginwith.jpg";
import Mob from "@/components/assets/or.jpg";
import { GoogleIcon } from "@/components/icons";
import { useLoginStore } from "@/components/store/account/login";
import { Input } from "@heroui/input";
import { Button, Checkbox } from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { FaEyeSlash, FaRegEye } from "react-icons/fa";

export default function Login() {
  const router = useRouter();
  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const { emailId, password, rememberMe, setData } = useLoginStore();

  return (
    <div className="flex items-center justify-end h-screen text-white bg-black">
      <Image className="flex lg:hidden h-full w-full" src={Mob} alt="img" />
      <Image className="hidden lg:flex h-full w-full" src={logo} alt="img" />
      <div className="w-full xl:w-1/2 lg:w-3/5 px-4 md:px-6 absolute lg:h-full lg:flex justify-center items-center lg:py-10 lg:pl-36 bg-transparent">
        <div className="w-full lg:w-4/5 h-full py-10">
          <p className="text-5xl font-bold">Login</p>
          <p className="pt-3 text-gray-400">
            Create your account to get started
          </p>

          <div className="py-7">
            <Input
              label="Email"
              type="email"
              isRequired
              classNames={{
                inputWrapper:
                  "border-1 border-white group-data-[focus=true]:border-default-white",
              }}
              variant="bordered"
              value={emailId}
              onChange={(e) => setData({ emailId: e.target.value })}
            />
          </div>

          <div>
            <Input
              isRequired
              classNames={{
                inputWrapper:
                  "border-1 border-white group-data-[focus=true]:border-default-white",
              }}
              endContent={
                <button
                  className="flex h-full items-center focus:outline-hidden"
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
              onChange={(e) => setData({ password: e.target.value })}
            />
          </div>

          <div className="flex justify-between py-4 text-sm md:text-base">
            <div className="flex items-center">
              <Checkbox
                isSelected={rememberMe}
                onValueChange={(val) => setData({ rememberMe: val })}
              />
              <span>Remember me</span>
            </div>
            <div className="text-blue-600 underline cursor-pointer">
              Forgot Password?
            </div>
          </div>

          <Button onClick={() => router.push("/admin/dashboard")} className="text-white w-full" color="primary" size="lg">
            Log In
          </Button>

          <div className="flex items-center py-5">
            <div className="flex-grow border-t border-white"></div>
            <span className="flex-shrink mx-4 font-medium">or</span>
            <div className="flex-grow border-t border-white"></div>
          </div>

          <Button
            className="w-full p-7 text-white"
            variant="bordered"
            size="lg"
          >
            <GoogleIcon /> Sign in with Google
          </Button>

          <div className="pt-6 text-sm">
            <p>
              Don't have an account?{" "}
              <span
                className="text-blue-600 underline py-4 cursor-pointer"
                onClick={() => router.push("/register")}
              >
                SignUp
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
