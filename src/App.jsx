import { useState } from "react";
import { getCandidateByEmail } from "./api";
import JobsPage from "./JobsPage";

export default function App() {
  const [email, setEmail] = useState("");
  const [candidate, setCandidate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleGetCandidate() {
    setLoading(true);
    setError("");

    try {
      const data = await getCandidateByEmail(email.trim());
      setCandidate(data);
    } catch (e) {
      setCandidate(null);
      setError(e.message || "Unexpected error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 720, margin: "40px auto", padding: 16, fontFamily: "system-ui" }}>
      <h1 style={{ marginBottom: 8 , width: 850}}>React Challenge for Nimble Gravity</h1>

      {!candidate ? (
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <input
            style={{ flex: 1, padding: 10 }}
            placeholder="Your email (the same one used for the application)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            style={{ padding: "10px 14px" }}
            onClick={handleGetCandidate}
            disabled={!email.trim() || loading}
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </div>
      ) : (
        <>
          <div style={{ marginTop: 16, padding: 12, border: "1px solid #ddd", borderRadius: 8 }}>
            <div><b>Candidate:</b> {candidate.firstName} {candidate.lastName}</div>
            <div><b>Email:</b> {candidate.email}</div>
            <div style={{ marginTop: 8, fontSize: 13, color: "#555" }}>
              <div><b>uuid:</b> {candidate.uuid}</div>
              <div><b>candidateId:</b> {candidate.candidateId}</div>
            </div>
          </div>

          <JobsPage candidate={candidate} />
        </>
      )}

      {error && (
        <div style={{ marginTop: 12, color: "white", background: "#c0392b", padding: 10, borderRadius: 8 }}>
          {error}
        </div>
      )}
    </div>
  );
}