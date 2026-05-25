import nifLover from "@/assets/niflover.png";
import gameHub from "@/assets/gameHub.png";
import HSI from "@/assets/hsi.png";
import feedback from "@/assets/feedback.png";

export type Project = {
  title: string;
  description: string;
  details: string;
  image: string;
  href: string;
};

export const projects: Project[] = [
  {
    title: "nifLover",
    description: "A game-centered dating app",
    details:
      "Built with Flask and Pygame-CE, nifLover is a dating app that matches users based on their gaming compatibility and more!",
    image: nifLover,
    href: "https://github.com/veeolet-ml/niflover",
  },
  {
    title: "Game Hub",
    description: "Game Hub lets you search games using a variety of filters",
    details:
      "Game Hub is built on top of the RAWG.io API using React, deployed via Vercel.",
    image: gameHub,
    href: "https://react-game-hub-one.vercel.app/",
  },
  {
    title: "Hardware-Software Interface Demos",
    description: "Small demos for the HSI course @ UNSTPB",
    details:
      "C and Assembly demos for the HSI course @ UNSTPB, written for clarity and conciseness, to aid students in figuring everything out",
    image: HSI,
    href: "https://github.com/veeolet-ml/hardware-software-interface/",
  },
  {
    title: "cs-pub-ro: feedback",
    description: "The feedback analysis tool used by ACS @ UNSTPB",
    details: "Contributed to the project by adding a Python linter",
    image: feedback,
    href: "https://github.com/veeolet-ml/cs-pub-ro-feedback/tree/add-python-linter",
  },
];
