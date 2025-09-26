"use client";
import Mob from "@/components/assets/logbg.png";
import { GoogleIcon } from "@/components/icons";
import { useRegisterStore } from "@/components/store/account/register";
import { Button, Input } from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import {
  FaEnvelope,
  FaEyeSlash,
  FaLock,
  FaRegEye,
  FaUser,
} from "react-icons/fa";

export default function Register() {
  const router = useRouter();
  const [isVisible, setIsVisible] = React.useState(false);
  const [role, setRole] = React.useState<"candidate" | "interviewer">(
    "candidate"
  );
  const toggleVisibility = () => setIsVisible((prev) => !prev);

  const { userName, emailId, password, setData } = useRegisterStore();

  // ✅ Single function to handle navigation
  const handleNavigation = () => {
    if (role === "interviewer") {
      router.push("/interviewerOnBoarding");
    } else {
      router.push("/candidateOnBoarding");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-black">
      {/* Left Side Image */}
      <div className="hidden lg:block w-1/2 xl:w-3/5 h-full">
        <Image className="h-full w-full object-cover" src={Mob} alt="img" />
      </div>

      {/* Form Section */}
      <div className="h-full bg-white w-full xl:w-2/5 lg:w-1/2 flex justify-center items-center p-4 md:p-8 lg:p-16">
        <div className="w-full max-w-md bg-gray-100 h-fit py-6 px-4 rounded-lg border border-gray-300 shadow-lg">
          <h1 className="text-2xl font-bold text-center text-blue-500 font-agency">
            Join Code Meet
          </h1>
          <p className="pt-2 text-center text-gray-400 text-sm font-poppins">
            Create your account to get started
          </p>

          {/* Custom Tabs */}
          <div className="p-1 mt-6 bg-gray-200 flex gap-3 rounded-xl">
            {/* Candidate Tab */}
            <button
              className={`flex-1 py-1 rounded-lg text-center font-medium  transition-all duration-200 ${
                role === "candidate" ? "bg-blue-500 text-white " : " text-black"
              }`}
              onClick={() => setRole("candidate")}
            >
              Candidate
            </button>

            {/* Interviewer Tab */}
            <button
              className={`flex-1 py-1 rounded-lg text-center font-medium  transition-all duration-200 ${
                role === "interviewer" ? "bg-blue-500 text-white" : "text-black"
              }`}
              onClick={() => setRole("interviewer")}
            >
              Interviewer
            </button>
          </div>

          {/* Username Input */}
          <div className="pt-4">
            <Input
              label="Username"
              placeholder="Enter your name"
              labelPlacement="outside"
              variant="bordered"
              isRequired
              classNames={{
                label: "text-sm text-gray-900",
                inputWrapper: "h-[50px]",
              }}
              startContent={<FaUser className="text-gray-400" />}
              value={userName}
              onChange={(e) => setData({ userName: e.target.value })}
            />
          </div>

          {/* Email Input */}
          <div className="pt-4">
            <Input
              label="Email"
              placeholder="Enter your email"
              classNames={{
                label: "text-sm text-gray-900",
                inputWrapper: "h-[50px]",
              }}
              type="email"
              isRequired
              labelPlacement="outside"
              variant="bordered"
              startContent={<FaEnvelope className="text-gray-400" />}
              value={emailId}
              onChange={(e) => setData({ emailId: e.target.value })}
            />
          </div>

          {/* Password Input */}
          <div className="pt-4">
            <Input
              label="Password"
              placeholder="Enter your password"
              labelPlacement="outside"
              isRequired
              type={isVisible ? "text" : "password"}
              classNames={{
                label: "text-sm text-gray-900",
                inputWrapper: "h-[50px]",
              }}
              variant="bordered"
              startContent={<FaLock className="text-gray-400" />}
              value={password}
              onChange={(e) => setData({ password: e.target.value })}
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

          {/* Sign Up Button */}
          <div className="pt-6">
            <Button
              className="w-full text-white"
              color="primary"
              size="md"
              onPress={handleNavigation}
            >
              Sign Up
            </Button>
          </div>

          {/* Divider */}
          <div className="flex items-center py-5">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-4 font-medium text-sm">or</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          {/* Google Button */}
          <Button
            className="w-full"
            variant="bordered"
            size="md"
            onPress={handleNavigation}
          >
            <GoogleIcon /> <span className="ml-2">Continue with Google</span>
          </Button>

          {/* Already have account */}
          <div className="pt-4 text-center text-sm">
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
