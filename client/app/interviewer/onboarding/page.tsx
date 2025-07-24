"use client";

import { Uploadphoto } from "@/components/ui/imageUploder";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { useFormStore } from "@/components/store/onBoarding/index"; // adjust the path as needed

export default function InterviewerOnboarding() {
  const {
    interviewerName,
    interviewerMobile,
    interviewerEmail,
    interviewerGender,
    company,
    experience,
    designation,
    domain,
    interviewerProfileImage,
    setFormData,
  } = useFormStore();

  return (
    <div className="h-screen px-52 py-24 w-full bg-blue-950">
      <div className="bg-white h-full w-full rounded-2xl py-5 px-7 flex gap-5">
        <div className="w-full">
          <p className="font-semibold">Let’s Get to Know You</p>
          <p className="text-sm text-gray-500 pt-1">
            Please provide your basic details so we can personalize your
            experience.
          </p>

          <div className="pt-5">
            <Uploadphoto
              imageValue={interviewerProfileImage}
              onChange={(file) =>
                setFormData({ interviewerProfileImage: file })
              }
            />
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-6 pt-4 w-full">
            <Input
              label="Name"
              placeholder="Enter your name"
              value={interviewerName}
              onChange={(e) => setFormData({ interviewerName: e.target.value })}
              size="lg"
              type="text"
              radius="sm"
              variant="bordered"
              isRequired
            />
            <Input
              label="Mobile Number"
              placeholder="Enter your mobile number"
              value={interviewerMobile}
              onChange={(e) =>
                setFormData({ interviewerMobile: e.target.value })
              }
              radius="sm"
              type="tel"
              size="lg"
              variant="bordered"
              isRequired
            />
            <Input
              label="Email ID"
              placeholder="Enter your email ID"
              value={interviewerEmail}
              onChange={(e) =>
                setFormData({ interviewerEmail: e.target.value })
              }
              radius="sm"
              type="email"
              size="lg"
              variant="bordered"
              isRequired
            />
            <Select
              label="Gender"
              placeholder="Select your Gender"
              variant="bordered"
              size="lg"
              isRequired
              radius="sm"
              selectedKeys={interviewerGender ? [interviewerGender] : []}
              onChange={(e) =>
                setFormData({ interviewerGender: e.target.value })
              }
            >
              <SelectItem key="Male" value="Male">
                Male
              </SelectItem>
              <SelectItem key="Female" value="Female">
                Female
              </SelectItem>
            </Select>
            <Input
              label="Company Name"
              placeholder="Enter your company name"
              value={company}
              onChange={(e) => setFormData({ company: e.target.value })}
              radius="sm"
              type="text"
              size="lg"
              variant="bordered"
              isRequired
            />
            <Input
              label="Years of Experience"
              placeholder="Enter your years of experience"
              value={experience}
              onChange={(e) => setFormData({ experience: e.target.value })}
              radius="sm"
              type="number"
              size="lg"
              variant="bordered"
              isRequired
            />
            <Input
              label="Designation / Job Title"
              placeholder="e.g., Software Engineer, HR Specialist"
              value={designation}
              onChange={(e) => setFormData({ designation: e.target.value })}
              radius="sm"
              type="text"
              size="lg"
              variant="bordered"
              isRequired
            />
            <Input
              label="Domain/Specialization"
              placeholder="e.g., Web Development, Data Science, HR, etc."
              value={domain}
              onChange={(e) => setFormData({ domain: e.target.value })}
              radius="sm"
              type="text"
              size="lg"
              variant="bordered"
              isRequired
            />
          </div>

          <div className="flex justify-end pt-6">
            <Button
              color="primary"
              size="md"
              radius="sm"
              isDisabled={
                !(
                  interviewerName &&
                  interviewerMobile &&
                  interviewerEmail &&
                  interviewerGender &&
                  company &&
                  experience &&
                  designation &&
                  domain
                )
              }
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
