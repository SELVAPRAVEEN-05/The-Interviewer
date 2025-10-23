"use client";

import { useFormStore } from "@/components/store/onBoarding/index";
import { Uploadphoto } from "@/components/ui/imageUploder";
import { getRequest } from "@/utils";
import { URL } from "@/utils/axios/endPoint";
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

type SkillOption = { id: number; name: string; category?: string };
const fallbackSkills: SkillOption[] = [
  { id: 1, name: "JavaScript", category: "Programming" },
  { id: 2, name: "TypeScript", category: "Programming" },
  { id: 3, name: "React", category: "Programming" },
  { id: 4, name: "Next.js", category: "Programming" },
  { id: 5, name: "Public Speaking", category: "Soft Skill" },
];

export default function Skills({
  activeStep,
  setActiveStep,
}: VerticalStepperProps) {
  const { github, linkedin, portfolio, skills, selectedSkillIds, handleOnboard, setFormData } =
    useFormStore();
  const router = useRouter();

  const handleSkillChange = (_: any, value: SkillOption[]) => {
    setFormData({
      skills: value.map((v) => v.name).join(", "),
      selectedSkillIds: value.map((v) => v.id),
    });
  };

  // Load skills options from API (GET api/register/candidate)
  const [options, setOptions] = React.useState<SkillOption[]>(fallbackSkills);
  const [loadingSkills, setLoadingSkills] = React.useState<boolean>(false);
  const [skillsError, setSkillsError] = React.useState<string | null>(null);

  React.useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        setLoadingSkills(true);
        setSkillsError(null);
        // Fetch skills list; supports array root or nested structures
        const resp: any = await getRequest<any>(URL.SKILLS);
        const skillsData = Array.isArray(resp)
          ? resp
          : resp?.skills || resp?.data?.skills || resp?.onboarding?.skills || [];

        const normalized: SkillOption[] = Array.isArray(skillsData)
          ? skillsData
              .map((s: any, idx: number) => {
                if (typeof s === "string") {
                  return { id: idx + 1, name: s } as SkillOption;
                }
                if (typeof s === "object" && s) {
                  return {
                    id: Number(s.id ?? idx + 1),
                    name: String(s.name ?? s.label ?? s.title ?? s.skill ?? ""),
                    category: s.category,
                  } as SkillOption;
                }
                return null;
              })
              .filter(Boolean) as SkillOption[]
          : [];
        if (mounted && normalized.length) setOptions(normalized);
      } catch (err: any) {
        console.error("Failed to load skills options:", err);
        setSkillsError("Unable to load skills. Using defaults.");
      } finally {
        setLoadingSkills(false);
      }
    };
    load();
    return () => {
      mounted = false;
    };
  }, []);

  // Backfill selected ids from existing comma-separated `skills` string if any
  React.useEffect(() => {
    if (!skills || !options?.length) return;
    if (selectedSkillIds && selectedSkillIds.length) return;
    const names = skills.split(",").map((s) => s.trim().toLowerCase()).filter(Boolean);
    if (!names.length) return;
    const ids = options.filter((o) => names.includes(o.name.toLowerCase())).map((o) => o.id);
    if (ids.length) setFormData({ selectedSkillIds: ids });
  }, [skills, options]);

  // Submit handler (calls store action)
  const handleSubmit = async () => {
    try {
      const res = await handleOnboard();
      // Navigate on success (adjust path if needed)
      router.push("/candidate");
    } catch (e) {
      console.error("Onboarding submit failed", e);
    }
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
              freeSolo={false}
              options={options}
              getOptionLabel={(option) => option.name}
              isOptionEqualToValue={(o, v) => o.id === v.id}
              value={
                (options || []).filter((o) =>
                  (selectedSkillIds || []).includes(o.id)
                )
              }
              onChange={handleSkillChange}
              groupBy={(opt) => opt.category || ""}
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
            {loadingSkills && (
              <p className="text-xs text-gray-500 mt-1">Loading skills…</p>
            )}
            {skillsError && (
              <p className="text-xs text-rose-500 mt-1">{skillsError}</p>
            )}
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
