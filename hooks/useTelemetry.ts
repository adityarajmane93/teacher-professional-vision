import { trackEvent }
from "@/lib/telemetry";

import { saveTelemetry }
from "@/lib/database";

interface TelemetryInput {

  participantId?: string;

  timestamp?: number;

  trialId?: number;

  phase: string;

  type:
    | "participant_created"
    | "phase_enter"
    | "button_clicked"
    | "response_submitted"
    | "window_blur"
    | "window_focus"
    | "key_pressed";

  metadata?: Record<
    string,
    unknown
  >;
}

export function useTelemetry() {

  const logTelemetry = (
    input: TelemetryInput
  ) => {

    trackEvent({
  participantId:
    input.participantId,

  timestamp:
    input.timestamp ??
    performance.now(),

  trialId:
    input.trialId,

  phase:
    input.phase,

  type:
    input.type,

  metadata:
    input.metadata,
});

saveTelemetry({
  participantId:
    input.participantId,

  timestamp:
    input.timestamp ??
    performance.now(),

  trialId:
    input.trialId,

  phase:
    input.phase,

  type:
    input.type,

  metadata:
    input.metadata,
});
  };

  return {
    logTelemetry,
  };
}