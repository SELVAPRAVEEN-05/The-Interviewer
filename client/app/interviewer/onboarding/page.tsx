"use client";

import logo from "@/components/assets/or.jpg";
import { useFormStore } from "@/components/store/onBoarding/index";
import { Uploadphoto } from "@/components/ui/imageUploder";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import Image from "next/image";

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
    <div className="h-screen lg:px-28 xl:px-52 flex items-center w-full">
      <Image className="absolute -z-10 left-0 top-0 lg:flex h-full w-full" src={logo} alt="img" />

      <div className="bg-white h-full md:h-fit w-full md:rounded-2xl p-5 flex gap-5 overflow-y-auto scrollbar-hide">
        <div className="w-full">
          <p className="font-semibold">Let’s Get to Know You</p>
          <p className="text-sm text-gray-500 pt-1">
            Please provide your basic details so we can personalize your experience.
          </p>

          <div className="pt-5">
            <Uploadphoto
              imageValue={interviewerProfileImage}
              onChange={(file) =>
                setFormData({ interviewerProfileImage: file })
              }
            />
          </div>

          <div className="grid md:grid-cols-2 grid-cols-1 gap-x-4 gap-y-6 pt-4 w-full">
            <Input
              label="Name"
              value={interviewerName}
              onChange={(e) => setFormData({ interviewerName: e.target.value })}
              size="md"
              type="text"
              radius="sm"
              variant="bordered"
              isRequired
            />
            <Input
              label="Mobile Number"
              value={interviewerMobile}
              onChange={(e) =>
                setFormData({ interviewerMobile: e.target.value })
              }
              radius="sm"
              type="tel"
              size="md"
              variant="bordered"
              isRequired
            />
            <Input
              label="Email ID"
              value={interviewerEmail}
              onChange={(e) =>
                setFormData({ interviewerEmail: e.target.value })
              }
              radius="sm"
              type="email"
              size="md"
              variant="bordered"
              isRequired
            />
            <Select
              label="Gender"
              variant="bordered"
              size="md"
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
              value={company}
              onChange={(e) => setFormData({ company: e.target.value })}
              radius="sm"
              type="text"
              size="md"
              variant="bordered"
              isRequired
            />
            <Input
              label="Years of Experience"
              value={experience}
              onChange={(e) => setFormData({ experience: e.target.value })}
              radius="sm"
              type="number"
              size="md"
              variant="bordered"
              isRequired
            />
            <Input
              label="Designation / Job Title"
              value={designation}
              onChange={(e) => setFormData({ designation: e.target.value })}
              radius="sm"
              type="text"
              size="md"
              variant="bordered"
              isRequired
            />
            <Input
              label="Domain/Specialization"
              value={domain}
              onChange={(e) => setFormData({ domain: e.target.value })}
              radius="sm"
              type="text"
              size="md"
              variant="bordered"
              isRequired
            />
          </div>

          <div className="flex justify-end pt-6 md:pb-0 pb-5">
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
