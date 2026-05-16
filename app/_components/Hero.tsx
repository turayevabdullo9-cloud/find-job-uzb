"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Hero = () => {
    const router = useRouter();
    const [search, setSearch] = useState("");

    const handleSearch = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const query = search.trim();
        const params = new URLSearchParams();

        if (query) {
            params.set("search", query);
        }

        router.push(`/jobs${params.toString() ? `?${params.toString()}` : ""}`);
    };

    return (
        <section className="flex flex-col justify-center">
            <span className="font-bold text-center mt-40 text-gray-500 uppercase">Career Opportunities</span>
            <h1 className="text-7xl font-bold text-center mt-10">Find Your Perfect <span className="text-[#5e6268]">Career</span></h1>
            <span className="mt-11 text-center text-[20px] text-gray-700">
                Discover career opportunities from top companies. Search, filter, and <br /> apply to roles that match your skills and aspirations.
            </span>
            <form onSubmit={handleSearch} className="w-full flex gap-1 justify-center items-center">
                <input
                    type="text"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search by job title or keyword..."
                    className="w-96 h-12 border border-gray-300 rounded-lg mt-11 px-4"
                />
                <button type="submit" className="w-32 h-12 ml-3 bg-gray-500 text-white rounded-lg mt-11">
                    Search
                </button>
            </form>
            <div className="w-full flex gap-4 justify-center items-center mt-11">
                <Link href="/jobs" className="w-48 h-10 inline-flex items-center justify-center bg-white text-black border border-gray-700 rounded-lg hover:bg-gray-500">
                    Browse All Jobs
                </Link>
                <Link href="/admin" className="inline-flex h-10 w-48 items-center justify-center rounded-lg bg-gray-600 text-white hover:bg-gray-500">
                    Post a Job
                </Link>
            </div>
            <div className="w-full flex gap-4 justify-center items-center mt-11">
                <h4 className="text-gray-500 text-center mt-11 text-[23px] font-bold">
                    500+ <br />
                    <span className="text-gray-600 text-[12px] font-normal mt-0">Active Jobs</span>
                </h4>
                <h4 className="text-gray-500 text-center mt-11 text-[23px] font-bold">
                    200+ <br />
                    <span className="text-gray-600 text-[12px] font-normal mt-0">Companies</span>
                </h4>
                <h4 className="text-gray-500 text-center mt-11 text-[23px] font-bold">
                    50K+ <br />
                    <span className="text-gray-600 text-[12px] font-normal mt-0">Placements</span>
                </h4>
            </div>
        </section>
    )
}

export default Hero