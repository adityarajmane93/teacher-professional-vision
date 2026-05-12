import { Participant } from "@/types/participant";

const STORAGE_KEY = "tpv_participant";

export function createParticipant(
  group: "pre-service" | "in-service"
): Participant {

  const participant: Participant = {
    id: crypto.randomUUID(),
    createdAt: performance.now(),
    group,
  };

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(participant)
  );

  return participant;
}

export function getParticipant(): Participant | null {

  const stored = localStorage.getItem(STORAGE_KEY);

  if (!stored) return null;

  return JSON.parse(stored);
}