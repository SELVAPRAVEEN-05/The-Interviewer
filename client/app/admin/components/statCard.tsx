interface StatCardProps {
  title?: string;
  value?: number;
  icon?: any;
  color?: any;
  subtitle?: string;
}
const colorClasses: Record<string, string> = {
  blue: "text-blue-600 bg-blue-200",
  green: "text-green-600 bg-green-200",
  purple: "text-purple-600 bg-purple-200",
  orange: "text-orange-600 bg-orange-200",
  violet: "text-violet-600 bg-violet-200",
};

export default function StatCard({
  title,
  value,
  icon: Icon,
  color,
  subtitle,
}: StatCardProps) {
  return (
    <div className="bg-gray-100 rounded-xl shadow-sm border border-gray-300 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className={`text-3xl font-bold ${colorClasses[color].split(" ")[0]}`}>
            {value}
          </p>
          {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
        </div>
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
}
