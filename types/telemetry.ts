export interface TelemetryEvent {
  participantId?: string;

  timestamp: number;

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

  metadata?: Record<string, unknown>;
}