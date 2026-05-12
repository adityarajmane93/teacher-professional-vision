import { TelemetryEvent } from "@/types/telemetry";

const telemetryBuffer: TelemetryEvent[] = [];

export function trackEvent(
  event: TelemetryEvent
) {

  telemetryBuffer.push(event);

  console.log(
    "TELEMETRY:",
    event
  );
}

export function getTelemetryBuffer() {
  return telemetryBuffer;
}