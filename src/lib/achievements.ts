import CDL from "@/assets/cdl.jpg";

export type Achievement = {
  title: string;
  event: string;
  date: string;
  description: string;
  details: string;
  image?: string;
};

export const achievements: Achievement[] = [
  {
    title: "Community Development Lab Diploma",
    event: "Open Source contribution presentation",
    date: "2026",
    description:
      "Presentation on the Open Source contribution to the cs-pub-ro/feedback project",
    details: "A contribution to the CI/CD pipeline, adding a Python linter",
    image: CDL,
  },
  {
    title: "Autonomous Cars",
    event: "IPW Autonomous Cars Course",
    date: "2025",
    description: "Built an autonomous car",
    details:
      "Built the car, soldered the electronics and wrote code to get it to autonomously follow a path.",
  },
  {
    title: "Web 102",
    event: "Hackademy Web 102 Course",
    date: "2026",
    description: "Made a personal website",
    details:
      "Built a website using React.js with TypeScript and the GitHub API",
  },
];
