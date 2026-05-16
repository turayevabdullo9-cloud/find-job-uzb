import Link from "next/link";

const BottomNav = () => {
    return (
        <div className="text-center bg-linear-to-r bg-gray-600 min-h-130 w-full py-20">
            <h1 className="text-5xl text-white font-bold">Ready to Advance <br /> Your Career?</h1>
            <p className="text-[#e7ebf2] text-lg mt-4 max-w-2xl mx-auto">
                Discover hundreds of job opportunities from leading companies. Start <br /> your journey to your next role today.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 md:flex-row">
                <Link
                    href="/jobs"
                    className="px-6 py-3 rounded-full bg-white text-black transition-colors duration-300 hover:bg-gray-100"
                >
                    Explore Jobs
                </Link>
                <Link
                    href="/admin"
                    className="inline-flex items-center justify-center rounded-full border-2 border-none px-6 py-3 text-white transition-colors duration-300 hover:bg-gray-400 hover:text-white"
                >
                    Post a Job
                </Link>
            </div>
        </div>
    );
};

export default BottomNav;