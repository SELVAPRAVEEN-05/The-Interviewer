"use client";
import { Uploadphoto } from "@/components/ui/imageUploder";
import { Button, Input } from "@nextui-org/react";
import React from "react";

type VerticalStepperProps = {
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
};
export default function Skills({
  activeStep,
  setActiveStep,
}: VerticalStepperProps) {
  return (
    <div>
      <p className="font-semibold">Links & Resume Upload</p>
      <p className="text-sm text-gray-500 pt-1">
        Share your portfolio, resume and showcase your skills.
      </p>
      <div className="pt-5">
        <Uploadphoto
          title="Upload Your Resume"
          content="Only PDF format, not more than 2 MB"
          accept="application/pdf"
          getImgFile={(file) => console.log("PDF base64:", file)}
        />
      </div>
      <div className="grid grid-cols-1 gap-x-4 gap-y-6 pt-4 w-full">
        <Input
          className=""
          label="GitHub Profile"
          placeholder="Enter your GitHub profile URL"
          radius="sm"
          type="text"
          size="lg"
          variant="bordered"
          isRequired
        />
        <Input
          className=""
          label="LinkedIn Profile"
          placeholder="Enter your LinkedIn profile URL"
          radius="sm"
          type="text"
          size="lg"
          variant="bordered"
          isRequired
        />
        <Input
          className=""
          label="Portfolio Website "
          placeholder="Enter your portfolio website URL"
          radius="sm"
          type="text"
          size="lg"
          variant="bordered"
        />
        <Input
          className=""
          label="Skills"
          placeholder="Enter your skills (comma separated)"
          radius="sm"
          type="text"
          size="lg"
          variant="bordered"
          isRequired
        />
      </div>
      <div className="flex justify-end gap-4 pt-6">
        <Button
          className=""
          color="primary"
          size="md"
          radius="sm"
          onPress={() => setActiveStep(activeStep - 1)}
          variant="bordered"
        >
          Go Back
        </Button>
        <Button
          className=""
          color="primary"
          size="md"
          radius="sm"
          onPress={() => setActiveStep(activeStep + 1)}
        >
          Submit
        </Button>
      </div>
    </div>
  );
}
