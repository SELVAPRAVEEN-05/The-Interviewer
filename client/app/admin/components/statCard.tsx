interface StatCardProps {
  title?: string;
  value?: any;
  icon?: any;
  color?: keyof typeof colorClasses;
  subtitle?: string;
}

const colorClasses: Record<string, string> = {
  blue: "text-blue-600 bg-blue-200",
  green: "text-green-600 bg-green-200",
  purple: "text-purple-600 bg-purple-200",
  orange: "text-orange-600 bg-orange-200",
  violet: "text-violet-600 bg-violet-200",
  red: "text-red-600 bg-red-200",
};

export default function StatCard({
  title,
  value,
  icon: Icon,
  color = "blue",
  subtitle,
}: StatCardProps) {
  const colors = colorClasses[color] || "text-gray-600 bg-gray-200";
  const [textColor, bgColor] = colors.split(" ");

  return (
    <div className="bg-gray-100 rounded-xl shadow-sm border border-gray-300 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className={`text-3xl font-bold ${textColor}`}>{value}</p>
          {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
        </div>
        <div className={`p-3 rounded-lg ${bgColor} ${textColor}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
}
