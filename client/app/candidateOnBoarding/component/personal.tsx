"use client";
import { Uploadphoto } from "@/components/ui/imageUploder";
import { parseDate } from "@internationalized/date";
import {
  Button,
  DateInput,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { useFormStore } from "@/components/store/onBoarding/index";

type VerticalStepperProps = {
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
};

export default function Personal({
  activeStep,
  setActiveStep,
}: VerticalStepperProps) {
  const countries = [
    {
      name: "India",
      id: 1,
      value: "IN",
      flag: "https://flagcdn.com/w40/in.png",
    },
    { name: "USA", id: 2, value: "US", flag: "https://flagcdn.com/w40/us.png" },
    {
      name: "Canada",
      id: 3,
      value: "CA",
      flag: "https://flagcdn.com/w40/ca.png",
    },
    {
      name: "Australia",
      id: 4,
      value: "AU",
      flag: "https://flagcdn.com/w40/au.png",
    },
  ];

  const {
    setFormData,
    firstName,
    lastName,
    country,
    gender,
    dob,
    mobile,
    language,
    email,
  } = useFormStore();

  return (
    <div className="h-full w-full flex flex-col justify-between">
      <div className="h-[90%] overflow-y-auto scrollbar-hide">
        <p className="font-semibold">Let’s Get to Know You</p>
        <p className="text-sm text-gray-500 pt-1 ">
          Please provide your basic details so we can personalize your
          experience.
        </p>
        <div className="pt-5">
          <Uploadphoto />
        </div>
        <div className="grid md:grid-cols-2 grid-cols-1 overflow-y-auto scrollbar-hide gap-x-4 gap-y-6 pt-4 w-full">
          <Input
            label="First Name"
            // placeholder="Enter your first name"
            value={firstName}
            onChange={(e) => setFormData({ firstName: e.target.value })}
            size="md"
            type="text"
            radius="sm"
            variant="bordered"
            isRequired
          />
          <Input
            label="Last Name"
            // placeholder="Enter your last name"
            value={lastName}
            onChange={(e) => setFormData({ lastName: e.target.value })}
            radius="sm"
            type="text"
            size="md"
            variant="bordered"
            isRequired
          />
          <Input
            label="Mobile Number"
            // placeholder="Enter your mobile number"
            value={mobile}
            onChange={(e) => setFormData({ mobile: e.target.value })}
            radius="sm"
            type="number"
            size="md"
            variant="bordered"
            isRequired
          />
          <Input
            label="Email ID"
            // placeholder="Enter your email ID"
            value={email}
            onChange={(e) => setFormData({ email: e.target.value })}
            radius="sm"
            type="email"
            size="md"
            variant="bordered"
            isRequired
          />
          <DateInput
            label="Date of Birth"
            variant="bordered"
            radius="sm"
            isRequired
            size="md"
            value={dob ? (parseDate(dob) as any) : undefined}
            onChange={(dateValue) => {
              if (dateValue) {
                setFormData({ dob: dateValue.toString() });
              }
            }}
          />
          <Select
            label="Gender"
            // placeholder="Select your Gender"
            variant="bordered"
            size="md"
            isRequired
            radius="sm"
            selectedKeys={gender ? new Set([gender]) : new Set()}
            onSelectionChange={(keys) => {
              const id = Array.from(keys)[0] as string;
              setFormData({ gender: id });
            }}
          >
            <SelectItem key="1" value="Male">
              Male
            </SelectItem>
            <SelectItem key="2" value="Female">
              Female
            </SelectItem>
          </Select>

          <Select
            label="Choose Language"
            // placeholder="Select your Language"
            variant="bordered"
            size="md"
            isRequired
            radius="sm"
            selectedKeys={language ? new Set([language]) : new Set()}
            onSelectionChange={(keys) => {
              const value = Array.from(keys)[0] as string;
              setFormData({ language: value });
            }}
          >
            <SelectItem key="1" value="English">
              English
            </SelectItem>
            <SelectItem key="2" value="Tamil">
              Tamil
            </SelectItem>
          </Select>
          <Select
            label="Choose Country"
            // placeholder="Select your Country"
            variant="bordered"
            isRequired
            radius="sm"
            size="md"
            classNames={{ trigger: "py-3" }}
            selectedKeys={country ? new Set([country]) : new Set()}
            onSelectionChange={(keys) => {
              const value = Array.from(keys)[0] as string;
              setFormData({ country: value });
            }}
          >
            {countries.map((country) => (
              <SelectItem
                key={country.id}
                value={country.value}
                startContent={
                  <img
                    src={country.flag}
                    alt={country.name}
                    className="w-5 h-5 rounded-sm object-cover"
                  />
                }
              >
                {country.name}
              </SelectItem>
            ))}
          </Select>
        </div>
      </div>
      <div className="flex justify-end pt-4 xl:pt-6">
        <Button
          color="primary"
          size="md"
          isDisabled={
            !(
              firstName &&
              lastName &&
              email &&
              dob &&
              gender &&
              language &&
              country
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
