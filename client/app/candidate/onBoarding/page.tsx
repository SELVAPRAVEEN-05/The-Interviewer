"use client";

import VerticalStepper from "@/components/atoms/stepper";
import Education from "./component/education";
import Personal from "./component/personal";
import Skills from "./component/skills";
import { useState } from "react";

export default function OnBoarding() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="h-screen px-52 py-24 w-full bg-blue-950">
      <div className="bg-white h-full w-full rounded-2xl p-3 flex gap-5">
        <div className="w-1/3 h-full flex justify-center  rounded-lg bg-gray-100 p-2">
          <VerticalStepper
            activeStep={activeStep}
            setActiveStep={setActiveStep}
          />
        </div>
        <div className="h-full w-full pr-2 py-3">
          {activeStep == 0 ? (
            <Personal activeStep={activeStep} setActiveStep={setActiveStep} />
          ) : activeStep == 1 ? (
            <Education activeStep={activeStep} setActiveStep={setActiveStep} />
          ) : (
            <Skills activeStep={activeStep} setActiveStep={setActiveStep} />
          )}
        </div>
      </div>
    </div>
  );
}
