import Image from "next/image";
import Link from "next/link";

const Header = () => {
    return (
        <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/80 border-b border-gray-100">
            <div className="container py-4 flex justify-between items-center mx-auto px-4">
                <Link href="/" className="flex items-center">
                    <Image src="/logo.svg" alt="Logo" width={130} height={130} className="mr-2" />
                </Link>

                <nav className="flex items-center gap-4">
                    <ul className="flex items-center gap-4">
                        <li className="hover:text-blue-500 transition-all"><Link href="/" className="transition-all hover:text-blue-500">Home</Link></li>
                        <li className="hover:text-blue-500 transition-all"><Link href="/jobs" className="transition-all hover:text-blue-500">Jobs</Link></li>
                    </ul>

                    <Link href="/admin" className="inline-flex h-8 items-center rounded-lg bg-blue-900 px-4 text-sm font-medium text-white transition hover:bg-blue-800">
                        Post a Job
                    </Link>
                </nav>
            </div>
        </header>
    )
}

export default Header;