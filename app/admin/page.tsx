/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Suspense } from "react";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";
import db from "@/db.json";
import { Job, Application } from "../types";

type Tab = "applications" | "jobs";

const AdminContent = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState("");
    const [activeTab, setActiveTab] = useState<Tab>((searchParams.get("tab") as Tab) || "applications");

    const [applications, setApplications] = useState<Application[]>([]);
    const [jobs, setJobs] = useState<Job[]>([]);
    const [isLoadingData, setIsLoadingData] = useState(false);

    // Form states for new job
    const [newJobForm, setNewJobForm] = useState({
        title: "",
        company: "",
        location: "",
        salary: "",
        category: "Technology",
        type: "Full-time",
        description: "",
        requirements: "",
    });
    const [showNewJobForm, setShowNewJobForm] = useState(false);
    const [jobFormError, setJobFormError] = useState("");

    // Check authentication on mount
    useEffect(() => {
        const stored = localStorage.getItem("adminAuthenticated");
        if (stored) {
            setIsAuthenticated(true);
        }
        setIsLoading(false);
    }, []);

    // Load data when authenticated
    useEffect(() => {
        if (isAuthenticated && !isLoadingData) {
            loadData();
        }
    }, [isAuthenticated]);

    const loadData = async () => {
        setIsLoadingData(true);
        try {
            const [appsRes, jobsRes] = await Promise.all([
                axios.get("http://localhost:3001/applications").catch(() => ({ data: db.applications })),
                axios.get("http://localhost:3001/jobs").catch(() => ({ data: db.jobs })),
            ]);
            setApplications(appsRes.data);
            setJobs(jobsRes.data);
        } catch {
            setApplications(db.applications as unknown as Application[]);
            setJobs(db.jobs as unknown as Job[]);
        } finally {
            setIsLoadingData(false);
        }
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoginError("");

        try {
            const response = await axios.post("http://localhost:3001/admins", {}, {
                headers: { "Content-Type": "application/json" },
            }).catch(() => ({ data: db.admins }));

            const admins = response.data;
            const admin = admins.find((a: any) => a.email === email && a.password === password);

            if (admin) {
                setIsAuthenticated(true);
                localStorage.setItem("adminAuthenticated", "true");
                setEmail("");
                setPassword("");
            } else {
                setLoginError("Invalid email or password");
            }
        } catch {
            const admin = db.admins.find((a: any) => a.email === email && a.password === password);
            if (admin) {
                setIsAuthenticated(true);
                localStorage.setItem("adminAuthenticated", "true");
                setEmail("");
                setPassword("");
            } else {
                setLoginError("Invalid email or password");
            }
        }
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem("adminAuthenticated");
    };

    const handleAddJob = async (e: React.FormEvent) => {
        e.preventDefault();
        setJobFormError("");

        if (!newJobForm.title || !newJobForm.company || !newJobForm.location) {
            setJobFormError("Please fill in all required fields");
            return;
        }

        try {
            const jobData = {
                id: String(Math.max(...jobs.map(j => parseInt(j.id) || 0), 0) + 1),
                ...newJobForm,
                postedAt: new Date().toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                }),
            };

            await axios.post("http://localhost:3001/jobs", jobData).catch(() => {
                // Fallback: just add to local state
                return { data: jobData };
            });

            setJobs([...jobs, jobData as Job]);
            setNewJobForm({
                title: "",
                company: "",
                location: "",
                salary: "",
                category: "Technology",
                type: "Full-time",
                description: "",
                requirements: "",
            });
            setShowNewJobForm(false);
        } catch {
            setJobFormError("Failed to add job. Please try again.");
        }
    };

    const handleDeleteJob = async (jobId: string) => {
        try {
            await axios.delete(`http://localhost:3001/jobs/${jobId}`).catch(() => {
                // Fallback
                return { data: {} };
            });
            setJobs(jobs.filter(j => j.id !== jobId));
        } catch {
            alert("Failed to delete job");
        }
    };

    const handleDeleteApplication = async (appId: string) => {
        try {
            await axios.delete(`http://localhost:3001/applications/${appId}`).catch(() => {
                // Fallback
                return { data: {} };
            });
            setApplications(applications.filter(a => a.id !== appId));
        } catch {
            alert("Failed to delete application");
        }
    };

    if (isLoading) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    if (!isAuthenticated) {
        return (
          <div className="min-h-screen bg-gray-250 flex items-center justify-center px-4 py-10">
            <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-lg">
              <h1 className="text-3xl font-bold text-slate-950 mb-2">
                Admin Login
              </h1>
              <p className="text-sm text-slate-500 mb-8">
                Enter your credentials to access the admin dashboard
              </p>

              <form onSubmit={handleLogin} className="space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@jobsearch.com"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-blue-500"
                    required
                  />
                </div>
                {loginError && (
                  <p className="text-sm text-red-600">{loginError}</p>
                )}
                <button
                  type="submit"
                  className="w-full rounded-2xl bg-gray-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
                >
                  Login
                </button>
              </form>

              <div className="mt-6 rounded-2xl bg-slate-50 p-4 text-xs text-slate-600">
                <p className="font-semibold mb-2">Demo Credentials:</p>
                <p>Email: admin@abdullo.com</p>
                <p>Password: abdullo123</p>
              </div>
            </div>
          </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50">
            <div className="border-b border-slate-200 bg-white shadow-sm">
                <div className="mx-auto  flex max-w-300 rounded-2xl items-center  justify-between px-6 py-4">
                    <h1 className="text-2xl font-bold text-black">Admin Dashboard</h1>
                    <button
                        onClick={handleLogout}
                        className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                    >
                        Logout
                    </button>
                </div>
            </div>

            <div className="mx-auto max-w-7xl px-6 py-10">
                <div className="mb-8 flex gap-4 border-b border-slate-200">
                    <button
                        onClick={() => setActiveTab("applications")}
                        className={`px-4 py-3 text-sm font-semibold transition ${activeTab === "applications"
                            ? "border-b-2 border-gray-800 text-gray-800"
                            : "text-slate-600 hover:text-slate-900"
                            }`}
                    >
                        Applications ({applications.length})
                    </button>
                    <button
                        onClick={() => setActiveTab("jobs")}
                        className={`px-4 py-3 text-sm font-semibold transition ${activeTab === "jobs"
                            ? "border-b-2 border-gray-800 text-gray-800"
                            : "text-slate-600 hover:text-slate-900"
                            }`}
                    >
                        Jobs ({jobs.length})
                    </button>
                </div>

                {/* Applications Tab */}
                {activeTab === "applications" && (
                    <div className="space-y-4">
                        {isLoadingData ? (
                            <div className="text-center text-slate-600">Loading applications...</div>
                        ) : applications.length === 0 ? (
                            <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center text-slate-600">
                                No applications yet
                            </div>
                        ) : (
                            applications.map((app) => (
                                <div
                                    key={app.id}
                                    className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition"
                                >
                                    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <h3 className="text-lg font-bold text-slate-950">{app.name}</h3>
                                                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">
                                                    {app.date}
                                                </span>
                                            </div>
                                            <p className="text-sm text-slate-600 mb-3">{app.email}</p>
                                            <div className="rounded-2xl bg-slate-50 p-4 mb-3">
                                                <p className="text-xs text-slate-500 font-semibold mb-1">FOR POSITION:</p>
                                                <p className="text-sm text-slate-900">{app.job}</p>
                                            </div>
                                            <div className="rounded-2xl bg-slate-50 p-4">
                                                <p className="text-xs text-slate-500 font-semibold mb-1">MESSAGE:</p>
                                                <p className="text-sm text-slate-700 whitespace-pre-wrap">{app.message}</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => handleDeleteApplication(app.id)}
                                            className="rounded-2xl bg-red-100 px-4 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-200"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}

                {/* Jobs Tab */}
                {activeTab === "jobs" && (
                    <div className="space-y-6">
                        <button
                            onClick={() => setShowNewJobForm(!showNewJobForm)}
                            className="rounded-2xl bg-gray-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
                        >
                            {showNewJobForm ? "Cancel" : "+ Post New Job"}
                        </button>

                        {showNewJobForm && (
                            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg">
                                <h2 className="mb-6 text-2xl font-bold text-slate-950">Post a New Job</h2>
                                <form onSubmit={handleAddJob} className="space-y-5">
                                    <div className="grid gap-5 md:grid-cols-2">
                                        <div>
                                            <label className="mb-2 block text-sm font-medium text-slate-700">
                                                Job Title *
                                            </label>
                                            <input
                                                type="text"
                                                value={newJobForm.title}
                                                onChange={(e) =>
                                                    setNewJobForm({ ...newJobForm, title: e.target.value })
                                                }
                                                placeholder="e.g., Senior Frontend Engineer"
                                                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-blue-500"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="mb-2 block text-sm font-medium text-slate-700">
                                                Company *
                                            </label>
                                            <input
                                                type="text"
                                                value={newJobForm.company}
                                                onChange={(e) =>
                                                    setNewJobForm({ ...newJobForm, company: e.target.value })
                                                }
                                                placeholder="e.g., TechCorp"
                                                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-blue-500"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="mb-2 block text-sm font-medium text-slate-700">
                                                Location *
                                            </label>
                                            <input
                                                type="text"
                                                value={newJobForm.location}
                                                onChange={(e) =>
                                                    setNewJobForm({ ...newJobForm, location: e.target.value })
                                                }
                                                placeholder="e.g., San Francisco, CA"
                                                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-blue-500"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="mb-2 block text-sm font-medium text-slate-700">
                                                Salary
                                            </label>
                                            <input
                                                type="text"
                                                value={newJobForm.salary}
                                                onChange={(e) =>
                                                    setNewJobForm({ ...newJobForm, salary: e.target.value })
                                                }
                                                placeholder="e.g., $120,000 - $160,000"
                                                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-blue-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="mb-2 block text-sm font-medium text-slate-700">
                                                Category
                                            </label>
                                            <select
                                                value={newJobForm.category}
                                                onChange={(e) =>
                                                    setNewJobForm({ ...newJobForm, category: e.target.value })
                                                }
                                                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-blue-500"
                                            >
                                                <option>Technology</option>
                                                <option>Design</option>
                                                <option>Marketing</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="mb-2 block text-sm font-medium text-slate-700">
                                                Job Type
                                            </label>
                                            <select
                                                value={newJobForm.type}
                                                onChange={(e) =>
                                                    setNewJobForm({ ...newJobForm, type: e.target.value })
                                                }
                                                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-blue-500"
                                            >
                                                <option>Full-time</option>
                                                <option>Part-time</option>
                                                <option>Contract</option>
                                                <option>Freelance</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-slate-700">
                                            Job Description
                                        </label>
                                        <textarea
                                            value={newJobForm.description}
                                            onChange={(e) =>
                                                setNewJobForm({ ...newJobForm, description: e.target.value })
                                            }
                                            placeholder="Describe the job role, responsibilities, and company..."
                                            rows={4}
                                            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-slate-700">
                                            Requirements (comma-separated)
                                        </label>
                                        <textarea
                                            value={newJobForm.requirements}
                                            onChange={(e) =>
                                                setNewJobForm({ ...newJobForm, requirements: e.target.value })
                                            }
                                            placeholder="e.g., React, TypeScript, 5+ years experience, Node.js"
                                            rows={3}
                                            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-blue-500"
                                        />
                                    </div>
                                    {jobFormError && <p className="text-sm text-red-600">{jobFormError}</p>}
                                    <button
                                        type="submit"
                                        className="w-full rounded-2xl bg-gray-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
                                    >
                                        Post Job
                                    </button>
                                </form>
                            </div>
                        )}

                        <div className="space-y-4">
                            {isLoadingData ? (
                                <div className="text-center text-slate-600">Loading jobs...</div>
                            ) : jobs.length === 0 ? (
                                <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center text-slate-600">
                                    No jobs posted yet
                                </div>
                            ) : (
                                jobs.map((job) => (
                                    <div
                                        key={job.id}
                                        className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition"
                                    >
                                        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                                            <div className="flex-1">
                                                <h3 className="text-lg font-bold text-slate-950 mb-1">{job.title}</h3>
                                                <p className="text-sm text-slate-600 mb-3">{job.company}</p>
                                                <div className="flex flex-wrap gap-2 mb-3">
                                                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700">
                                                        {job.location}
                                                    </span>
                                                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700">
                                                        {job.type}
                                                    </span>
                                                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700">
                                                        {job.category}
                                                    </span>
                                                </div>
                                                <p className="text-xs text-slate-500">Posted: {job.postedAt}</p>
                                            </div>
                                            <button
                                                onClick={() => handleDeleteJob(job.id)}
                                                className="rounded-2xl bg-red-100 px-4 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-200"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default function AdminPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
            <AdminContent />
        </Suspense>
    );
}
