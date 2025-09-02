import { BookOpen, Calendar, GraduationCap, Mail } from "lucide-react";
import { InfoItem } from "./items";

type EducationTabProps = {
  education: {
    collegeName: string;
    qualification: string;
    department: string;
    yearOfPassing: string;
    cgpa: string;
    collegeEmail: string;
    percentage10th: string;
    percentage12th: string;
  };
};

export const EducationTab = ({ education }: EducationTabProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-white rounded-2xl shadow-sm h-[15rem]">
      <InfoItem
        icon={<GraduationCap size={16} />}
        label="College Name"
        value={education.collegeName}
      />
      <InfoItem
        icon={<BookOpen size={16} />}
        label="Qualification"
        value={education.qualification}
      />
      <InfoItem
        icon={<BookOpen size={16} />}
        label="Department"
        value={education.department}
      />
      <InfoItem
        icon={<Calendar size={16} />}
        label="Year of Passing"
        value={education.yearOfPassing}
      />
      <InfoItem
        icon={<BookOpen size={16} />}
        label="CGPA"
        value={education.cgpa}
      />
      <InfoItem
        icon={<Mail size={16} />}
        label="College Email"
        value={education.collegeEmail}
      />
      <InfoItem
        icon={<BookOpen size={16} />}
        label="10th Percentage"
        value={education.percentage10th}
      />
      <InfoItem
        icon={<BookOpen size={16} />}
        label="12th Percentage"
        value={education.percentage12th}
      />
    </div>
  );
};
