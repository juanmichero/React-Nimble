const BASE_URL =
  "https://botfilter-h5ddh6dye8exb7ha.centralus-01.azurewebsites.net";

async function parseResponse(res) {
  const text = await res.text();
  try {
    return text ? JSON.parse(text) : null;
  } catch {
    return text;
  }
}

function pickErrorMessage(data, fallback) {
  if (!data) return fallback;
  if (typeof data === "string") return data || fallback;
  return data.message || data.error || fallback;
}

export async function getCandidateByEmail(email) {
  const res = await fetch(
    `${BASE_URL}/api/candidate/get-by-email?email=${encodeURIComponent(email)}`
  );

  const data = await parseResponse(res);
  if (!res.ok) throw new Error(pickErrorMessage(data, "Error getting candidate"));
  return data;
}

export async function getJobsList() {
  const res = await fetch(`${BASE_URL}/api/jobs/get-list`);

  const data = await parseResponse(res);
  if (!res.ok) throw new Error(pickErrorMessage(data, "Error getting jobs"));
  return data;
}

export async function applyToJob(body) {
  const res = await fetch(`${BASE_URL}/api/candidate/apply-to-job`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await parseResponse(res);
  if (!res.ok) throw new Error(pickErrorMessage(data, "Error applying"));
  return data;
}