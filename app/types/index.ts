export type Job = {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  category: string;
  type: string;
  description: string;
  requirements: string;
  postedAt: string;
};

export type Application = {
  id: string;
  name: string;
  email: string;
  jobId: number;
  job: string;
  date: string;
  message: string;
};
