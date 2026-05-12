import { supabase }
from "@/lib/supabase";

export async function saveGazePoint(
  gaze: {

    participantId?: string;

    trialId?: number;

    timestamp: number;

    rawX: number;

    rawY: number;

    relativeX: number;

    relativeY: number;
  }
) {

  console.log(
    "SAVING GAZE:",
    gaze
  );

  return await supabase
    .from("gaze_data")
    .insert({

      participant_id:
        gaze.participantId,

      trial_id:
        gaze.trialId,

      timestamp_ms:
        gaze.timestamp,

      raw_x:
        gaze.rawX,

      raw_y:
        gaze.rawY,

      relative_x:
        gaze.relativeX,

      relative_y:
        gaze.relativeY,
    });
}