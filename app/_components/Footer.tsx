import Link from "next/link";

const Footer = () => {
    return (
        <footer className="w-full bg-[#03060d] text-white">
            <div className="mx-auto w-full max-w-6xl px-6 py-12">
                <div className="grid gap-8 md:grid-cols-3">
                    <div className="space-y-3">
                        <h2 className="text-lg font-semibold">About JobSearch</h2>
                        <p className="text-sm text-gray-300 leading-7">
                            Your trusted platform for connecting with career opportunities.
                        </p>
                    </div>
                    <div className="space-y-3">
                        <h2 className="text-lg font-semibold">Quick Links</h2>
                        <ul className="space-y-2 text-sm text-gray-300">
                            <li><Link href="/jobs" className="hover:text-white">Browse Jobs</Link></li>
                            <li>
                                <Link href="/admin" className="hover:text-white">
                                    Post a Job
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="space-y-3">
                        <h2 className="text-lg font-semibold">Contact</h2>
                        <p className="text-sm text-gray-300">support@jobsearch.com</p>
                    </div>
                </div>
                <div className="mt-8 border-t border-white/10 pt-6 text-center text-sm text-gray-400">
                    © {new Date().getFullYear()} JobSearchl. All rights reserved.
                </div>
            </div>
        </footer>
    )
}

export default Footer;