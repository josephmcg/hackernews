export type Size = "sm" | "md" | "lg" | "xl";

export type Story = {
  id: number;
  deleted?: boolean;
  type: "job" | "story" | "comment" | "poll" | "pollopt";
  by: string;
  time: number;
  text?: string;
  dead?: boolean;
  parent?: Story["id"];
  poll?: number;
  kids: Story["id"][];
  url?: string;
  score: number;
  title: string;
  parts?: Story["id"][];
  descendants?: number;
};
