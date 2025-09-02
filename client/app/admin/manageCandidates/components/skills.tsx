import { LinkItem } from "./items";

type SkillsTabProps = {
  skills: {
    resumeLink: string;
    gitLink: string;
    linkedinLink: string;
    portfolioLink: string;
    skillsList: string[];
  };
};

export const SkillsTab = ({ skills }: SkillsTabProps) => {
  return (
    <div className="space-y-6 p-4 bg-white rounded-2xl shadow-sm h-[15rem]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <LinkItem label="Resume" href={skills.resumeLink} />
        <LinkItem label="GitHub" href={skills.gitLink} />
        <LinkItem label="LinkedIn" href={skills.linkedinLink} />
        <LinkItem label="Portfolio" href={skills.portfolioLink} />
      </div>

      <div>
        <p className="text-xs uppercase text-gray-500 font-semibold mb-2">
          Skills
        </p>
        <div className="flex flex-wrap gap-2">
          {skills.skillsList.map((skill, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full hover:bg-blue-200 transition"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
