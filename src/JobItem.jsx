import { useState } from "react";
import { applyToJob } from "./api";

export default function JobItem({ job, candidate }) {
  const [repoUrl, setRepoUrl] = useState("");
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const cleanRepoUrl = repoUrl.trim().replace(/\/+$/, "");
  const isValidRepo =
    cleanRepoUrl.startsWith("https://github.com/") && cleanRepoUrl.length > 19;

  async function handleSubmit() {
    setStatus("loading");
    setError("");

    try {
      const body = {
        uuid: String(candidate.uuid),
        jobId: String(job.id),

        // Nota: aunque el enunciado menciona candidateId,
        // la API real devuelve validaciones pidiendo applicationId/candidateId según el caso.
        // Por ello dejo ambos valores provenientes del Step 2.
        candidateId: String(candidate.candidateId),
        applicationId: String(candidate.applicationId),

        repoUrl: cleanRepoUrl,
      };

      const result = await applyToJob(body);

      if (result?.ok !== true) {
        throw new Error("API didn't return ok:true");
      }

      setStatus("success");
    } catch (e) {
      setStatus("error");
      setError(e.message || "Error applying");
    }
  }

  return (
    <div style={{ border: "1px solid #ddd", borderRadius: 10, padding: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "center" }}>
        <div>
          <div style={{ fontWeight: 700 }}>{job.title}</div>
          <div style={{ fontSize: 12, color: "#666" }}>jobId: {job.id}</div>
        </div>

        {status === "success" && (
          <span
            style={{
              fontSize: 12,
              padding: "4px 8px",
              background: "#2ecc71",
              color: "white",
              borderRadius: 999,
            }}
          >
            Sent ✔
          </span>
        )}
      </div>

      <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
        <input
          style={{ flex: 1, padding: 10 }}
          placeholder="Repository URL (https://github.com/user/repo)"
          value={repoUrl}
          onChange={(e) => setRepoUrl(e.target.value)}
        />

        <button
          style={{ padding: "10px 14px" }}
          onClick={handleSubmit}
          disabled={!isValidRepo || status === "loading"}
        >
          {status === "loading" ? "Sending..." : "Submit"}
        </button>
      </div>

      {!isValidRepo && repoUrl.length > 0 && (
        <div style={{ marginTop: 8, fontSize: 12, color: "#c0392b" }}>
          Submit a valid GitHub URL (starting with https://github.com/)
        </div>
      )}

      {status === "error" && (
        <div style={{ marginTop: 8, fontSize: 12, color: "#c0392b" }}>
          {error}
        </div>
      )}
    </div>
  );
}