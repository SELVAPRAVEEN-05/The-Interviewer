"use client";
import Mob from "@/components/assets/logbg.png";
import { GoogleIcon } from "@/components/icons";
import { useLoginStore } from "@/components/store/account/login";
import { Button, Checkbox, Input } from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { FaEnvelope, FaEyeSlash, FaLock, FaRegEye } from "react-icons/fa";

export default function Login() {
  const router = useRouter();
  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible((prev) => !prev);

  const { emailId, password, rememberMe, setData, handleLogin } =
    useLoginStore();
  const { isLoading, error } = useLoginStore();

  const handleSubmit = async () => {
    const payload = {
      email: emailId,
      password: password,
    };
    const response = await handleLogin(payload);

    if (
      response?.success === true &&
      response?.data?.user?.role === "CANDIDATE"
    ) {
      localStorage.setItem("authToken", response.data.token);
      router.push("/candidate/dashboard");
    } else if (
      response?.success === true &&
      response?.data?.user?.role === "INTERVIEWER"
    ) {
      localStorage.setItem("authToken", response.data.token);
      router.push("/interviewer/dashboard");
    } else if (
      response?.success === true &&
      response?.data?.user?.role === "ADMIN"
    ) {
      localStorage.setItem("authToken", response.data.token);
      router.push("/admin/dashboard");
    } else {
      alert("Login Failed");
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
          <h1 className="text-2xl font-bold text-center text-blue-500">
            Welcome Back
          </h1>
          <p className="pt-2 text-center text-gray-400 text-sm">
            Log in to continue to Code Meet
          </p>

          {/* Email Input */}
          <div className="pt-6">
            <Input
              label="Email"
              placeholder="Enter your email"
              type="email"
              isRequired
              labelPlacement="outside"
              variant="bordered"
              classNames={{
                label: "text-sm text-gray-900",
                inputWrapper: "h-[50px]",
              }}
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
              type={isVisible ? "text" : "password"}
              isRequired
              labelPlacement="outside"
              variant="bordered"
              classNames={{
                label: "text-sm text-gray-900",
                inputWrapper: "h-[50px]",
              }}
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

          {/* Remember Me + Forgot Password */}
          <div className="flex justify-between items-center py-3 text-sm">
            <div className="flex items-center gap-2">
              <Checkbox
                isSelected={rememberMe}
                onValueChange={(val) => setData({ rememberMe: val })}
              >
                Remember me
              </Checkbox>
            </div>
            <span className="text-blue-600 underline cursor-pointer">
              Forgot Password?
            </span>
          </div>

          <Button
            className="text-white w-full"
            color="primary"
            size="lg"
            onPress={handleSubmit}
            isDisabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Log In"}
          </Button>

          {error && (
            <p className="text-red-600 text-sm mt-2 text-center">{error}</p>
          )}

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
            onPress={() => console.log("Google login")}
          >
            <GoogleIcon /> <span className="ml-2">Continue with Google</span>
          </Button>

          {/* Sign Up Redirect */}
          <div className="pt-4 text-center text-sm">
            <p>
              Don’t have an account?{" "}
              <span
                className="text-blue-600 underline cursor-pointer"
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
