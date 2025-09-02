import { Calendar, Mail, Phone, User } from "lucide-react";
import { InfoItem } from "./items";

type PersonalTabProps = {
  personalDetails: {
    firstName?: string;
    lastName?: string;
    mobileNo?: string;
    email?: string;
    dateOfBirth?: string;
    gender?: string;
  };
};

export const PersonalTab = ({ personalDetails }: PersonalTabProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-white rounded-2xl shadow-sm h-[15rem]">
      <InfoItem
        icon={<User size={16} />}
        label="First Name"
        value={personalDetails?.firstName}
      />
      <InfoItem
        icon={<User size={16} />}
        label="Last Name"
        value={personalDetails?.lastName}
      />
      <InfoItem
        icon={<Phone size={16} />}
        label="Mobile No"
        value={personalDetails?.mobileNo}
      />
      <InfoItem
        icon={<Mail size={16} />}
        label="Email"
        value={personalDetails?.email}
      />
      <InfoItem
        icon={<Calendar size={16} />}
        label="Date of Birth"
        value={personalDetails?.dateOfBirth}
      />
      <InfoItem
        icon={<User size={16} />}
        label="Gender"
        value={personalDetails?.gender}
      />
    </div>
  );
};
