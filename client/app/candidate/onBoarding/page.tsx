"use client";

import VerticalStepper from "@/components/atoms/stepper";
import { useState } from "react";
import Personal from "./component/personal";
import Education from "./component/education";
import Skills from "./component/skills";
import Image from "next/image";
import logo from "@/components/assets/or.jpg";

export default function CandidateOnBoarding() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="h-screen lg:px-28 xl:px-52 flex items-center w-full">
      <Image className="absolute -z-10 left-0 top-0 lg:flex h-full w-full" src={logo} alt="img" />
      <div className="bg-white h-full md:h-[78%] xl:h-[70%] w-full md:rounded-2xl p-3 flex gap-5">
        <div className="w-1/3 hidden md:flex justify-center  rounded-lg bg-gray-100 p-2">
          <VerticalStepper
            activeStep={activeStep}
            setActiveStep={setActiveStep}
          />
        </div>
        <div className="w-full md:pr-2 pt-3">
          {activeStep == 0 ? 
          (
            <Personal activeStep={activeStep} setActiveStep={setActiveStep} />
          ) : activeStep == 1 ? 
          (
            <Education activeStep={activeStep} setActiveStep={setActiveStep} />
          ) : 
          (
            <Skills activeStep={activeStep} setActiveStep={setActiveStep} />
          )}
        </div>
      </div>
    </div>
  );
}
