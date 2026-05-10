import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Browse Jobs - JobSearch",
    description: "Find your next career opportunity",
};

export default function JobsLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <>{children}</>;
}
