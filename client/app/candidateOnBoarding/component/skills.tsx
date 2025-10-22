"use client";

import { useFormStore } from "@/components/store/onBoarding/index";
import { Uploadphoto } from "@/components/ui/imageUploder";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Input } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React from "react";

type VerticalStepperProps = {
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
};

const skillOptions = [
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Tailwind CSS",
  "Node.js",
  "Express",
  "MySQL",
  "MongoDB",
  "Python",
  "C++",
  "Java",
  "Git",
  "Docker",
  "AWS",
  "Figma",
  "Firebase",
  "REST API",
  "Redux",
  "GraphQL",
];

export default function Skills({
  activeStep,
  setActiveStep,
}: VerticalStepperProps) {
  const { github, linkedin, portfolio, skills, handleOnboard, setFormData } =
    useFormStore();
  const router = useRouter();

  const handleSkillChange = (_: any, value: string[]) => {
    setFormData({ skills: value.join(", ") });
  };

  return (
    <div className="h-full w-full flex flex-col justify-between overflow-y-auto scrollbar-hide">
      <div>
        <p className="font-semibold">Links & Resume Upload</p>
        <p className="text-sm text-gray-500 pt-1">
          Share your portfolio, resume and showcase your skills.
        </p>

        {/* Resume Upload */}
        <div className="pt-5">
          <Uploadphoto
            title="Upload Your Resume"
            content="Only PDF format, not more than 2 MB"
            accept="application/pdf"
            getImgFile={(file) => setFormData({ resumeFile: file })}
          />
        </div>

        {/* Input Fields */}
        <div className="grid grid-cols-1 gap-x-4 gap-y-6 pt-4 w-full">
          <Input
            label="GitHub Profile"
            radius="sm"
            type="text"
            size="md"
            variant="bordered"
            isRequired
            value={github}
            onChange={(e) => setFormData({ github: e.target.value })}
          />
          <Input
            label="LinkedIn Profile"
            radius="sm"
            type="text"
            size="md"
            variant="bordered"
            isRequired
            value={linkedin}
            onChange={(e) => setFormData({ linkedin: e.target.value })}
          />
          <Input
            label="Portfolio Website"
            radius="sm"
            type="text"
            size="md"
            variant="bordered"
            value={portfolio}
            onChange={(e) => setFormData({ portfolio: e.target.value })}
          />

          <Box>
            <Autocomplete
              multiple
              freeSolo
              options={skillOptions}
              defaultValue={
                skills ? skills.split(", ").map((s) => s.trim()) : []
              }
              onChange={handleSkillChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Select or type skills"
                  variant="outlined"
                  size="small"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "8px",
                    },paddingY:"18px"
                  }}
                />
              )}
            />
          </Box>
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="flex justify-end gap-4 pt-4 xl:pt-6">
        <Button
          color="primary"
          size="md"
          radius="sm"
          onPress={() => setActiveStep(activeStep - 1)}
          variant="bordered"
        >
          Go Back
        </Button>
        <Button
          color="primary"
          size="md"
          radius="sm"
          isDisabled={!(github && linkedin && portfolio && skills)}
          onPress={handleSubmit}
        >
          Submit
        </Button>
      </div>
    </div>
  );
}
