import { useEffect }
from "react";

import { Trial }
from "@/types/experiment";

interface Props {

  phase: string;

  currentTrial: Trial;

  setPhase: (
    phase:
      | "fixation"
      | "stimulus"
      | "response"
      | "finished"
  ) => void;
}

export function useExperiment({
  phase,
  currentTrial,
  setPhase,
}: Props) {

  useEffect(() => {

    if (phase === "fixation") {

      const fixationTimer =
        setTimeout(() => {

          setPhase(
            "stimulus"
          );

        }, 1000);

      return () =>
        clearTimeout(
          fixationTimer
        );
    }

    if (
  phase === "stimulus" &&
  !currentTrial.selfPaced
) {

  const stimulusTimer =
    setTimeout(() => {

      setPhase(
        "response"
      );

    }, currentTrial.duration);

  return () =>
    clearTimeout(
      stimulusTimer
    );
}

  }, [
    phase,
    currentTrial,
    setPhase,
  ]);
}