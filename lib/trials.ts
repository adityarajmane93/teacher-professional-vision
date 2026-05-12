import { Trial } from "@/types/experiment";

export const trials: Trial[] = [
  {
    id: 1,
    image: "/stimuli/test1.jpeg",
    duration: 5000,
    complexity: "teacher",
    selfPaced: false,
  },
  {
    id: 2,
    image: "/stimuli/test1.jpeg",
    duration: 10000,
    complexity: "teacher",
    selfPaced: true,
  },
];