/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import db from "@/db.json";
import { Job } from "../../types";

const JobDetailsPage = () => {
  const params = useParams();
  const router = useRouter();
  const [job, setJob] = useState<Job | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchJob = async () => {
      if (!params.id) return;

      try {
        const { data } = await axios.get(
          `http://localhost:3001/jobs/${params.id}`
        );
        setJob(data);
      } catch {
        const fallback = db.jobs.find(
          (item) => String(item.id) === String(params.id)
        );
        setJob(fallback ?? null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJob();
  }, [params.id]);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setError("");

    if (!job) {
      setError("Bo'sh ish o'rni topilmadi.");
      return;
    }

    const application = {
      name,
      email,
      message,
      jobId: job.id,
      job: `${job.title} - ${job.company}`,
      date: new Date().toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    try {
      await axios.post("http://localhost:3001/applications", application);
      setIsOpen(false);
      router.push("/admin?tab=applications");
    } catch {
      setError(
        "So‘rov yuborishda xatolik yuz berdi. Iltimos, qayta urinib koʻring."
      );
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 py-20">
        <div className="container mx-auto px-6 text-center text-slate-700">
          Загрузка вакансии...
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-slate-50 py-20">
        <div className="container mx-auto px-6 text-center text-slate-700">
          Vakansiya topilmadi.
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="container mx-auto px-6">
        <Link
          href="/jobs"
          className="inline-flex items-center rounded-full border border-slate-300 bg-white px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-100"
        >
          ← Back to Jobs
        </Link>

        <div className="mt-8 grid gap-8 lg:grid-cols-[2.3fr_1fr]">
          <div className="space-y-6 rounded-3xl bg-white p-8 shadow-lg">
            <div className="flex flex-col gap-4 rounded-3xl border border-slate-200 p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold text-slate-950">
                    {job.title}
                  </h1>
                  <p className="mt-1 text-sm text-slate-500">{job.company}</p>
                </div>
                <div className="rounded-3xl bg-slate-950 px-5 py-4 text-xl font-bold text-white">
                  T
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <span className="rounded-full bg-slate-100 px-3 py-2 text-sm text-slate-700">
                  {job.category}
                </span>
                <span className="rounded-full bg-slate-100 px-3 py-2 text-sm text-slate-700">
                  {job.location}
                </span>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 pt-4">
                <div className="text-sm text-slate-500">{job.type}</div>
                <div className="text-lg font-semibold text-amber-700">
                  {job.salary}
                </div>
              </div>
              <button
                onClick={() => setIsOpen(true)}
                className="w-full rounded-2xl bg-blue-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-800"
              >
                Apply Now
              </button>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <h2 className="mb-4 text-lg font-semibold text-slate-950">
                  Job Description
                </h2>
                <p className="text-sm leading-7 text-slate-600">
                  {job.description}
                </p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <h2 className="mb-4 text-lg font-semibold text-slate-950">
                  Job Details
                </h2>
                <div className="space-y-3 text-sm text-slate-600">
                  <div>
                    <div className="text-slate-500">Location</div>
                    <div>{job.location}</div>
                  </div>
                  <div>
                    <div className="text-slate-500">Job Type</div>
                    <div>{job.type}</div>
                  </div>
                  <div>
                    <div className="text-slate-500">Category</div>
                    <div>{job.category}</div>
                  </div>
                  <div>
                    <div className="text-slate-500">Salary</div>
                    <div>{job.salary}</div>
                  </div>
                  <div>
                    <div className="text-slate-500">Company</div>
                    <div>{job.company}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6">
              <h2 className="mb-4 text-lg font-semibold text-slate-950">
                Requirements
              </h2>
              <ul className="space-y-2 text-sm text-slate-700">
                {job.requirements.split(",").map((item, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <span className="text-slate-400">•</span>
                    <span>{item.trim()}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm text-slate-500">Posted</p>
                  <p className="font-semibold text-slate-900">{job.postedAt}</p>
                </div>
                <div className="rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-700">
                  {job.type}
                </div>
              </div>
              <div className="space-y-3 text-sm text-slate-700">
                <div>
                  <p className="text-slate-500">Location</p>
                  <p>{job.location}</p>
                </div>
                <div>
                  <p className="text-slate-500">Company</p>
                  <p>{job.company}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/70 px-4 py-8">
          <div className="w-full max-w-xl rounded-3xl bg-white p-8 shadow-2xl">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-slate-950">
                  Apply for this role
                </h2>
                <p className="text-sm text-slate-500">
                  Submit your application and the admin will see it in
                  Applications.
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-700 hover:bg-slate-200"
              >
                Close
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Full Name
                </label>
                <input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-blue-500"
                  placeholder="Your name"
                  required
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-blue-500"
                  placeholder="you@example.com"
                  required
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Message
                </label>
                <textarea
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-blue-500"
                  placeholder="Tell us why you are a good fit..."
                  rows={5}
                  required
                />
              </div>
              {error ? <p className="text-sm text-red-600">{error}</p> : null}
              <button
                type="submit"
                className="w-full rounded-2xl bg-blue-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-800"
              >
                Submit Application
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobDetailsPage;
