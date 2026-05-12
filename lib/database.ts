import { supabase }
from "@/lib/supabase";

// =========================
// SAVE PARTICIPANT
// =========================

export async function saveParticipant(
  participant: {

    id: string;

    group:
      "pre-service" |
      "in-service";

    name?: string;

    email?: string;

    phone?: string;

    yearsExperience?: string;

    consented?: boolean;

    consentTimestamp?: string;
  }
) {

  return await supabase
    .from("participants")
    .insert({

      id:
        participant.id,

      group_type:
        participant.group,

      name:
        participant.name,

      email:
        participant.email,

      phone:
        participant.phone,

      years_experience:
        participant.yearsExperience,

      consented:
        participant.consented,

      consent_timestamp:
        participant.consentTimestamp,
    });
}

// =========================
// SAVE TELEMETRY
// =========================

export async function saveTelemetry(
  telemetry: {

    participantId?: string;

    timestamp: number;

    trialId?: number;

    phase: string;

    type: string;

    metadata?: Record<
      string,
      unknown
    >;
  }
) {

  return await supabase
    .from("telemetry")
    .insert({

      participant_id:
        telemetry.participantId,

      timestamp_ms:
        telemetry.timestamp,

      trial_id:
        telemetry.trialId,

      phase:
        telemetry.phase,

      event_type:
        telemetry.type,

      metadata:
        telemetry.metadata,
    });
}

// =========================
// SAVE RESPONSE
// =========================

export async function saveResponse(
  response: {

    participantId?: string;

    trialId: number;

    responseText: string;
  }
) {

  return await supabase
    .from("responses")
    .insert({

      participant_id:
        response.participantId,

      trial_id:
        response.trialId,

      response_text:
        response.responseText,
    });
}