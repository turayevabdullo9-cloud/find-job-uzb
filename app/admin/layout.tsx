import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard - JobSearch",
  description: "Manage job postings and applications",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
