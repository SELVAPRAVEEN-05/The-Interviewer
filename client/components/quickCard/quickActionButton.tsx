import { ArrowRight } from "lucide-react";

type QuickActionButtonProps = {
    title: string;
    description: string;
    icon: React.ElementType;
    onClick: () => void;
    color: any;
  };

  const colorClasses: Record<string, string> = {
  blue: "text-blue-600 bg-blue-200",
  green: "text-green-600 bg-green-200",
  purple: "text-purple-600 bg-purple-200",
  orange: "text-orange-600 bg-orange-200",
  violet: "text-violet-600 bg-violet-200",
};

  export const QuickActionButton = ({
    title,
    description,
    icon: Icon,
    onClick,
    color,
  }: QuickActionButtonProps) => (
    <button
      onClick={onClick}
      className="w-full bg-gray-200 rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all hover:border-gray-300 text-left group"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div
            className={`p-3 rounded-lg ${colorClasses[color]}`}
          >
            <Icon className={`w-5 h-5 ${colorClasses[color].split(" ")[0]}`} />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{title}</h3>
            <p className="text-sm text-gray-600">{description}</p>
          </div>
        </div>
        <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
      </div>
    </button>
  );