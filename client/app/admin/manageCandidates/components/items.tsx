import { LinkIcon } from "lucide-react";

export const InfoItem = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value?: string;
}) => (
  <div>
    <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase mb-1">
      {icon} {label}
    </div>
    <p className="text-sm text-gray-900 font-medium">{value || "—"}</p>
  </div>
);

export const LinkItem = ({ label, href }: { label: string; href: string }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-2 px-3 py-2 border rounded-lg text-sm font-medium text-blue-600 hover:bg-blue-50 transition"
  >
    <LinkIcon size={14} /> View {label}
  </a>
);
