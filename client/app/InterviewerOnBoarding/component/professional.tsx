"use client";
import { useFormStore } from "@/components/store/onBoarding/index";
import { Uploadphoto } from "@/components/ui/imageUploder";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Input,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";

type Props = {
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
};

export default function Professional({ activeStep, setActiveStep }: Props) {
  const {
    setFormData,
    position,
    company,
    department,
    github_url,
    linkedin_url,
    portfolio_url,
    resume_url,
  } = useFormStore();

  const handleSubmit = () => {
    console.log("submit interviewer data");
    router.push("/interviewer/dashboard");
  };

  const router = useRouter();

  return (
    <div className="h-full w-full flex flex-col justify-between">
      <div className="h-[90%] overflow-y-auto scrollbar-hide">
        <p className="font-semibold">Professional Details</p>
        <p className="text-sm text-gray-500 pt-1">
          Enter your professional information.
        </p>

        <div className="col-span-1 md:col-span-2 mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload Resume (PDF)
          </label>
          <Uploadphoto
            title="Upload Your Resume"
            content="Only PDF files. Max 5 MB"
            accept="application/pdf"
            inputtype="file"
            imageValue={null}
            onChange={(result, e) => {
              if (result) {
                setFormData({
                  resume_url: result,
                  resumeFile: e?.target?.files?.[0] ?? null,
                });
              } else {
                setFormData({ resume_url: "", resumeFile: null });
              }
            }}
          />
        </div>

        <div className="grid md:grid-cols-2 grid-cols-1 gap-x-4 gap-y-6 pt-4 w-full">
          {/* Company autocomplete */}
          <Autocomplete
            label="Company"
            radius="sm"
            size="md"
            variant="bordered"
            defaultItems={[
              { label: "Company 1", key: "1" },
              { label: "Company 2", key: "2" },
            ]}
            selectedKey={company}
            onSelectionChange={(val) => setFormData({ company: val as string })}
          >
            {(item) => (
              <AutocompleteItem key={item.label}>{item.label}</AutocompleteItem>
            )}
          </Autocomplete>

          {/* Position autocomplete */}
          <Autocomplete
            label="Position"
            radius="sm"
            size="md"
            variant="bordered"
            defaultItems={[
              { label: "Position 1", key: "1" },
              { label: "Position 2", key: "2" },
            ]}
            selectedKey={position}
            onSelectionChange={(val) =>
              setFormData({ position: val as string })
            }
          >
            {(item) => (
              <AutocompleteItem key={item.label}>{item.label}</AutocompleteItem>
            )}
          </Autocomplete>

          <Input
            label="Department"
            value={department}
            onChange={(e) => setFormData({ department: e.target.value })}
            size="md"
            radius="sm"
            variant="bordered"
          />

          <Input
            label="GitHub URL"
            value={github_url}
            onChange={(e) => setFormData({ github_url: e.target.value })}
            size="md"
            radius="sm"
            variant="bordered"
          />

          <Input
            label="LinkedIn URL"
            value={linkedin_url}
            onChange={(e) => setFormData({ linkedin_url: e.target.value })}
            size="md"
            radius="sm"
            variant="bordered"
          />

          <Input
            label="Portfolio URL"
            value={portfolio_url}
            onChange={(e) => setFormData({ portfolio_url: e.target.value })}
            size="md"
            radius="sm"
            variant="bordered"
          />
        </div>
      </div>

      <div className="flex justify-end gap-4 pt-4 xl:pt-6">
        <Button
          color="primary"
          size="md"
          radius="sm"
          variant="bordered"
          onPress={() => setActiveStep(activeStep - 1)}
        >
          Go Back
        </Button>
        <Button
          color="primary"
          size="md"
          radius="sm"
          onPress={handleSubmit}
          isDisabled={!(position && company)}
        >
          Submit
        </Button>
      </div>
    </div>
  );
}
