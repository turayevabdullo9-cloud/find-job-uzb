"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import db from "@/db.json";
import { Job } from "../types";

const BrowseAllJobs = () => {
    const searchParams = useSearchParams();
    const [jobs, setJobs] = useState<Job[]>(db.jobs as unknown as Job[]);
    const [search, setSearch] = useState(() => searchParams.get("search") ?? "");
    const [category, setCategory] = useState(() => searchParams.get("category") ?? "All Categories");

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const { data } = await axios.get("http://localhost:3001/jobs");
                setJobs(data);
            } catch {
                setJobs(db.jobs as unknown as Job[]);
            }
        };

        fetchJobs();
    }, []);

    const filteredJobs = useMemo(() => {
        return jobs.filter((job) => {
            const matchesSearch = [job.title, job.company, job.location, job.description]
                .join(" ")
                .toLowerCase()
                .includes(search.toLowerCase());

            const matchesCategory = category === "All Categories" || job.category === category;

            return matchesSearch && matchesCategory;
        });
    }, [jobs, search, category]);

    return (
        <div className="min-h-screen bg-gray-200 py-10">
            <div className="mx-auto w-full max-w-7xl px-6">
                <div className="mb-10 flex flex-col gap-4 rounded-3xl bg-gray-500 p-8 shadow-lg sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-4xl font-bold text-white">Find Your Next Opportunity</h1>
                        <p className="mt-3 text-sm text-white">Explore our curated list of job openings and find the perfect match for your career.</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                        <Link href="/" className="inline-flex h-12 items-center rounded-full border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-800 transition hover:bg-slate-100">
                            Back Home
                        </Link>
                        <Link href="/admin" className="inline-flex h-12 items-center rounded-full bg-gray-700 px-5 text-sm font-semibold text-white transition hover:bg-gray-600">
                            Post a Job
                        </Link>
                    </div>
                </div>

                <div className="grid gap-8 lg:grid-cols-[300px_1fr]">
                    <aside className="rounded-3xl  bg-gray-400  p-6 shadow-2xl">
                        <h2 className="mb-6 text-xl font-semibold text-white">Filter Jobs</h2>
                        <div className="space-y-6">
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">Search by keyword</label>
                                <input
                                    type="search"
                                    value={search}
                                    onChange={(event) => setSearch(event.target.value)}
                                    placeholder="Job title, company, or skills..."
                                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">Category</label>
                                <select
                                    value={category}
                                    onChange={(event) => setCategory(event.target.value)}
                                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-blue-500"
                                >
                                    <option>All Categories</option>
                                    <option>Technology</option>
                                    <option>Design</option>
                                    <option>Marketing</option>
                                </select>
                            </div>
                            <button
                                onClick={() => {
                                    setSearch("");
                                    setCategory("All Categories");
                                }}
                                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                            >
                                Reset Filters
                            </button>
                        </div>
                    </aside>

                    <section>
                        <div className="mb-6 flex items-center justify-between gap-4">
                            <div>
                                <h2 className="text-2xl font-bold text-slate-950">Available Jobs</h2>
                                <p className="text-sm text-slate-500">{filteredJobs.length} positions</p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            {filteredJobs.map((job) => (
                                <div key={job.id} className="overflow-hidden rounded-3xl  bg-gray-500  p-6 shadow-2xl">
                                    <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-start">
                                        <div className="max-w-3xl">
                                            <h3 className="text-2xl font-semibold text-white">{job.title}</h3>
                                            <p className="mt-1 text-sm text-shadow-white">{job.company}</p>
                                            <p className="mt-4 text-sm leading-7 text-white">{job.description}</p>

                                            <div className="mt-4 flex flex-wrap gap-2">
                                                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">{job.category}</span>
                                                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">{job.type}</span>
                                                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">{job.location}</span>
                                            </div>
                                        </div>
                                        <div className="flex min-w-40 flex-col gap-3 text-right md:text-left">
                                            <div className="text-sm text-white">Salary</div>
                                            <div className="text-base font-semibold text-slate-900">{job.salary}</div>
                                            <Link
                                                href={`/jobs/${job.id}`}
                                                className="mt-3 inline-flex h-12 items-center justify-center rounded-2xl bg-blue-900 px-5 text-sm font-semibold text-white transition hover:bg-blue-800"
                                            >
                                                View Details
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {filteredJobs.length === 0 && (
                                <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center text-slate-600">
                                   hech narsa topilmadi
                                </div>
                            )}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default BrowseAllJobs;
