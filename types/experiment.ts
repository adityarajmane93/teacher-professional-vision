export type ExperimentPhase =
  | "landing"
  | "consent"
  | "participant"
  | "calibration"
  | "fixation"
  | "stimulus"
  | "response"
  | "finished";

export interface Trial {
  id: number;
  image: string;
  duration: number;
  complexity: "teacher" | "dyad" | "small-group" | "whole-class";
  selfPaced?: boolean;
}