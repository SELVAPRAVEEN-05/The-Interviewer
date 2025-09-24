"use client";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="h-[100dvh] w-screen overflow-hidden">{children}</div>;
}
