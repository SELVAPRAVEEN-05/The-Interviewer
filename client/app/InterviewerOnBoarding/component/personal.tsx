"use client";
import { useFormStore } from "@/components/store/onBoarding/index";
import { Uploadphoto } from "@/components/ui/imageUploder";
import { parseDate } from "@internationalized/date";
import {
    Button,
    DateInput,
    Input,
    Select,
    SelectItem,
} from "@nextui-org/react";

type Props = {
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
};

export default function Personal({ activeStep, setActiveStep }: Props) {
  const {
    setFormData,
    firstName,
    lastName,
    email,
    dob,
    gender,
    phone,
    countryId,
    languageId,
    profilePhoto,
  } = useFormStore();

  return (
    <div className="h-full w-full flex flex-col justify-between">
      <div className="h-[90%] overflow-y-auto scrollbar-hide">
        <p className="font-semibold">Personal Details</p>
        <p className="text-sm text-gray-500 pt-1">
          Enter your personal information.
        </p>

        <div className="pt-4">
          <Uploadphoto
            imageValue={profilePhoto}
            onChange={(file) => setFormData({ profilePhoto: file })}
          />
        </div>

        <div className="grid md:grid-cols-2 grid-cols-1 gap-x-4 gap-y-6 pt-4 w-full">
          <Input
            label="First Name"
            value={firstName}
            onChange={(e) => setFormData({ firstName: e.target.value })}
            size="md"
            radius="sm"
            variant="bordered"
          />
          <Input
            label="Last Name"
            value={lastName}
            onChange={(e) => setFormData({ lastName: e.target.value })}
            size="md"
            radius="sm"
            variant="bordered"
          />
          <Input
            label="Phone"
            value={phone}
            onChange={(e) => setFormData({ phone: e.target.value })}
            size="md"
            radius="sm"
            variant="bordered"
          />
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setFormData({ email: e.target.value })}
            size="md"
            radius="sm"
            variant="bordered"
          />

          <DateInput
            label="Date of Birth"
            value={dob ? (parseDate(dob) as any) : undefined}
            onChange={(dateValue) =>
              dateValue && setFormData({ dob: dateValue.toString() })
            }
            size="md"
            radius="sm"
            variant="bordered"
          />

          <Select
            label="Gender"
            size="md"
            radius="sm"
            variant="bordered"
            selectedKeys={gender ? new Set([String(gender)]) : new Set()}
            onSelectionChange={(keys) => {
              const v = Array.from(keys)[0] as string;
              setFormData({ gender: v });
            }}
          >
            <SelectItem key="1" value="Male">
              Male
            </SelectItem>
            <SelectItem key="2" value="Female">
              Female
            </SelectItem>
            <SelectItem key="3" value="Other">
              Other
            </SelectItem>
          </Select>

          <Select
            label="Language"
            size="md"
            radius="sm"
            variant="bordered"
            selectedKeys={
              languageId ? new Set([String(languageId)]) : new Set()
            }
            onSelectionChange={(keys) => {
              const v = Array.from(keys)[0] as string;
              setFormData({ languageId: Number(v) });
            }}
          >
            <SelectItem key="1" value="1">
              English
            </SelectItem>
            <SelectItem key="2" value="2">
              Tamil
            </SelectItem>
          </Select>

          <Select
            label="Country"
            size="md"
            radius="sm"
            variant="bordered"
            selectedKeys={countryId ? new Set([String(countryId)]) : new Set()}
            onSelectionChange={(keys) => {
              const v = Array.from(keys)[0] as string;
              setFormData({ countryId: Number(v) });
            }}
          >
            <SelectItem key="1" value="1">
              India
            </SelectItem>
            <SelectItem key="2" value="2">
              USA
            </SelectItem>
          </Select>
        </div>
      </div>

      <div className="flex justify-end pt-4 xl:pt-6">
        <Button
          color="primary"
          size="md"
          radius="sm"
          isDisabled={!(firstName && lastName && email)}
          onPress={() => setActiveStep(activeStep + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
