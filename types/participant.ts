export interface Participant {
  id: string;
  createdAt: number;
  group: "pre-service" | "in-service";
}