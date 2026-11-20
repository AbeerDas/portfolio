import type { NextApiRequest, NextApiResponse } from "next";
import { env } from "@/env.js";

// The count lives in a repository Actions variable, so a click never makes a commit or triggers a deploy.
const VARIABLES_URL = "https://api.github.com/repos/AbeerDas/portfolio/actions/variables";
const VARIABLE = "VISIT_COUNT";
const GITHUB_TIMEOUT_MS = 5000;

function githubHeaders(token: string) {
  return {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
}

// Returns null when the variable hasn't been created yet, which is the case before the first visit.
async function readCount(token: string): Promise<number | null> {
  const response = await fetch(`${VARIABLES_URL}/${VARIABLE}`, {
    headers: githubHeaders(token),
    signal: AbortSignal.timeout(GITHUB_TIMEOUT_MS),
  });
  if (response.status === 404) return null;
  if (!response.ok) throw new Error(`GitHub answered ${response.status} reading ${VARIABLE}`);
  const body: unknown = await response.json();
  if (typeof body !== "object" || body === null || !("value" in body) || typeof body.value !== "string") {
    throw new Error(`GitHub returned ${VARIABLE} without a value`);
  }
  const count = Number.parseInt(body.value, 10);
  return Number.isNaN(count) ? 0 : count;
}

async function writeCount(token: string, count: number, exists: boolean) {
  const response = await fetch(exists ? `${VARIABLES_URL}/${VARIABLE}` : VARIABLES_URL, {
    method: exists ? "PATCH" : "POST",
    headers: githubHeaders(token),
    body: JSON.stringify({ name: VARIABLE, value: String(count) }),
    signal: AbortSignal.timeout(GITHUB_TIMEOUT_MS),
  });
  if (!response.ok) throw new Error(`GitHub answered ${response.status} saving ${VARIABLE}`);
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET" && req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const token = env.GITHUB_TOKEN;
  if (!token) {
    return res.status(503).json({ message: "The visit counter isn't set up yet" });
  }

  try {
    const current = await readCount(token);
    if (req.method === "GET") {
      return res.status(200).json({ count: current ?? 0 });
    }
    const next = (current ?? 0) + 1;
    await writeCount(token, next, current !== null);
    return res.status(200).json({ count: next });
  } catch (error) {
    console.error("Visit counter failed:", error);
    return res.status(503).json({ message: "Couldn't reach GitHub to update the visit count" });
  }
}
