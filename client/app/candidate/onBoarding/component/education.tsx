"use client";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { useFormStore } from "@/components/store/onBoarding/index";

type VerticalStepperProps = {
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
};

export default function Education({
  activeStep,
  setActiveStep,
}: VerticalStepperProps) {
  const collegeNames = [
    { label: "Anna University", key: "1" },
    { label: "PSG College of Technology", key: "2" },
    { label: "Coimbatore Institute of Technology (CIT)", key: "3" },
    { label: "Madras Christian College (MCC)", key: "4" },
    { label: "Loyola College, Chennai", key: "5" },
    { label: "SRM Institute of Science and Technology", key: "6" },
    { label: "VIT Vellore", key: "7" },
    { label: "Thiagarajar College of Engineering (TCE)", key: "8" },
    { label: "SSN College of Engineering", key: "9" },
    { label: "St. Joseph's College, Trichy", key: "10" },
    { label: "Bannari Amman Institute of Technology (BIT)", key: "11" },
  ];

  const qualifications = [
    { label: "B.Tech", key: "1" },
    { label: "B.E", key: "2" },
    { label: "B.Sc", key: "3" },
    { label: "B.Com", key: "4" },
    { label: "Diploma", key: "5" },
    { label: "M.Tech", key: "6" },
    { label: "M.E", key: "7" },
    { label: "MBA", key: "8" },
    { label: "M.Sc", key: "9" },
  ];

  const specializations = [
    { label: "Computer Science", key: "1" },
    { label: "Information Technology", key: "2" },
    { label: "Electronics and Communication", key: "3" },
    { label: "Mechanical Engineering", key: "4" },
    { label: "Electrical Engineering", key: "5" },
    { label: "Civil Engineering", key: "6" },
    { label: "Commerce", key: "7" },
    { label: "Physics", key: "8" },
    { label: "Chemistry", key: "9" },
  ];

  const {
    setFormData,
    college,
    qualification,
    specialization,
    passingYear,
    cgpa,
    educationEmail,
    tenth,
    twelfth,
  } = useFormStore();

  return (
    <div className="h-full w-full flex flex-col justify-between">
      <div className="h-[90%] overflow-y-auto scrollbar-hide">
        <p className="font-semibold">Education Information</p>
        <p className="text-sm text-gray-500 pt-1">
          Please provide your education details to help us understand your
          background.
        </p>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-x-4 gap-y-6 pt-4 w-full">
          <Autocomplete
            label="College Name"
            // placeholder="Select your college"
            radius="sm"
            size="md"
            variant="bordered"
            defaultItems={collegeNames}
            selectedKey={college}
            onSelectionChange={(val) => setFormData({ college: val as string })}
          >
            {(item) => (
              <AutocompleteItem key={item.label}>{item.label}</AutocompleteItem>
            )}
          </Autocomplete>

          <Autocomplete
            label="Highest Qualification"
            // placeholder="Select your highest qualification"
            radius="sm"
            size="md"
            variant="bordered"
            defaultItems={qualifications}
            selectedKey={qualification}
            onSelectionChange={(val) =>
              setFormData({ qualification: val as string })
            }
          >
            {(item) => (
              <AutocompleteItem key={item.label}>{item.label}</AutocompleteItem>
            )}
          </Autocomplete>

          <Autocomplete
            label="Specialization"
            // placeholder="Select your specialization"
            radius="sm"
            size="md"
            variant="bordered"
            defaultItems={specializations}
            selectedKey={specialization}
            onSelectionChange={(val) =>
              setFormData({ specialization: val as string })
            }
          >
            {(item) => (
              <AutocompleteItem key={item.label}>{item.label}</AutocompleteItem>
            )}
          </Autocomplete>

          <Select
            label="Year of Passing"
            // placeholder="Select your year of passing"
            radius="sm"
            size="md"
            variant="bordered"
            selectedKeys={passingYear ? new Set([passingYear]) : new Set()}
            onSelectionChange={(keys) => {
              const val = Array.from(keys)[0] as string;
              setFormData({ passingYear: val });
            }}
          >
            <SelectItem key="2025">2025</SelectItem>
            <SelectItem key="2026">2026</SelectItem>
            <SelectItem key="2027">2027</SelectItem>
            <SelectItem key="2028">2028</SelectItem>
            <SelectItem key="2029">2029</SelectItem>
          </Select>

          <Input
            label="Percentage/CGPA"
            // placeholder="Enter your percentage or CGPA"
            radius="sm"
            size="md"
            variant="bordered"
            value={cgpa}
            onChange={(e) => setFormData({ cgpa: e.target.value })}
            isRequired
          />

          <Input
            label="Email ID"
            // placeholder="Enter your email ID"
            radius="sm"
            type="email"
            size="md"
            variant="bordered"
            value={educationEmail}
            onChange={(e) => setFormData({ educationEmail: e.target.value })}
            isRequired
          />

          <Input
            label="10th Percentage"
            // placeholder="Enter your 10th percentage"
            radius="sm"
            size="md"
            variant="bordered"
            value={tenth}
            onChange={(e) => setFormData({ tenth: e.target.value })}
            isRequired
          />

          <Input
            label="12th Percentage"
            // placeholder="Enter your 12th percentage"
            radius="sm"
            size="md"
            variant="bordered"
            value={twelfth}
            onChange={(e) => setFormData({ twelfth: e.target.value })}
            isRequired
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
          isDisabled={
            !(
              college &&
              qualification &&
              specialization &&
              passingYear &&
              cgpa &&
              educationEmail &&
              tenth &&
              twelfth
            )
          }
          radius="sm"
          onPress={() => setActiveStep(activeStep + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
