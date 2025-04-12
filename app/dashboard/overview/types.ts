export type StatusInfo = {
  id: string;
  title: string;
  description: string;
  date: string;
  priority?: string;
};

export type SystemStatus = {
  counts: {
    Critical: number;
    Warning: number;
    Healthy: number;
  };
  outages: StatusInfo[];
  warnings: StatusInfo[];
};

export type EventInfo = {
  id: string;
  title: string;
  description: string;
  date: string;
  sentiment: "positive" | "negative" | "neutral";
};

export type ActivityHistory = {
  events: EventInfo[];
};

export type ResolutionStats = {
  stats: {
    id: string;
    title: string;
    description: string;
    trend: "up" | "down" | "none";
  }[];
};
