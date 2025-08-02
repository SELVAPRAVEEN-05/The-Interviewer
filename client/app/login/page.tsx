"use client";
import { GoogleIcon } from "@/components/icons";
import { Input } from "@heroui/input";
import { Button, Checkbox } from "@nextui-org/react";
import React from "react";
import { FaEyeSlash, FaRegEye } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useLoginStore } from "@/components/store/account/login";
import logo from "@/components/assets/cof.jpg";
import Image from "next/image";

export default function Login() {
  const router = useRouter();
  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const { emailId, password, rememberMe, setData } = useLoginStore();

  return (
    <div className="flex items-center justify-end h-screen text-white">
      <Image className="h-full w-full" src={logo} alt="img"/>
      <div className=" absolute h-full py-10 pl-36 flex justify-center items-center rounded-xl w-1/2">
        <div className="w-4/5 h-full py-10">
          <div className="w-full text-start text-5xl font-bold">Login</div>
          <p className="pt-3 text-gray-400">
            Create your account to get started
          </p>

          <div className="py-7">
            <Input
              label="Email"
              type="email"
              isRequired
              variant="bordered"
              value={emailId}
              onChange={(e) => setData({ emailId: e.target.value })}
            />
          </div>

          <div>
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
              onChange={(e) => setData({ password: e.target.value })}
            />
          </div>

          <div className="flex justify-between py-4">
            <div className="flex items-center gap-2">
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

          <Button className="text-white w-full p-7" color="primary" size="lg">
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

          <div className="pt-12">
            <p>
              Don't have an account?{" "}
              <span
                className="text-blue-600 underline py-4 cursor-pointer"
                onClick={() => router.push("/register")}
              >
                Sign Up
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
