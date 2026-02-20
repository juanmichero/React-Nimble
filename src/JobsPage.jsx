import { useEffect, useState } from "react";
import { getJobsList } from "./api";
import JobItem from "./JobItem";

export default function JobsPage({ candidate }) {
  const [jobs, setJobs] = useState([]);
  const [loadingJobs, setLoadingJobs] = useState(false);
  const [errorJobs, setErrorJobs] = useState("");

  useEffect(() => {
    async function loadJobs() {
      setLoadingJobs(true);
      setErrorJobs("");

      try {
        const list = await getJobsList();
        setJobs(list);
      } catch (e) {
        setErrorJobs(e.message || "Error while loading positions");
      } finally {
        setLoadingJobs(false);
      }
    }

    loadJobs();
  }, []);

  return (
    <div style={{ marginTop: 20 }}>
      <h2 style={{ marginBottom: 8 }}>Available positions</h2>

      {loadingJobs && <p>Loading positions...</p>}
      {errorJobs && <p style={{ color: "#c0392b" }}>{errorJobs}</p>}

      <div style={{ display: "grid", gap: 10 }}>
        {jobs.map((job) => (
          <JobItem key={job.id} job={job} candidate={candidate} />
        ))}
      </div>
    </div>
  );
}