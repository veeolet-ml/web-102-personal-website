import { useCallback, useEffect, useState, type KeyboardEvent } from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DownloadIcon,
  XIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

const AUTOSCROLL_DELAY = 5000;

type Achievement = {
  title: string;
  event: string;
  date: string;
  description: string;
  details: string;
};

const achievements: Achievement[] = [
  {
    title: "WEB102 Project Showcase",
    event: "Personal website presentation",
    date: "2026",
    description:
      "Front-end project presentation focused on structure and polish.",
    details:
      "A portfolio showcase for React components, responsive layout, and clean presentation.",
  },
  {
    title: "Hardware-Software Interface",
    event: "Course demos and participation",
    date: "2025",
    description:
      "Low-level programming demos around C, assembly, and hardware IO.",
    details:
      "Participation centered on concise examples for architecture and interface behavior.",
  },
  {
    title: "Open Source Contribution",
    event: "cs-pub-ro feedback",
    date: "2025",
    description: "Contribution work on tooling for feedback analysis.",
    details:
      "Added linting support to improve consistency and make Python contributions easier to review.",
  },
  {
    title: "Game Development Demo",
    event: "nifLover prototype",
    date: "2024",
    description:
      "Interactive project combining matching logic with a game context.",
    details:
      "A Flask and Pygame-CE prototype exploring compatibility-based matching.",
  },
];

const cvHref = `${import.meta.env.BASE_URL}val-cv.pdf`;

const AchievementsCarousel = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [timerReset, setTimerReset] = useState(0);
  const [selectedAchievement, setSelectedAchievement] =
    useState<Achievement | null>(null);

  const scrollNext = useCallback(() => {
    if (!api) {
      return;
    }

    if (api.canScrollNext()) {
      api.scrollNext();
    } else {
      api.scrollTo(0);
    }
  }, [api]);

  const scrollPrevious = useCallback(() => {
    if (!api) {
      return;
    }

    if (api.canScrollPrev()) {
      api.scrollPrev();
    } else {
      api.scrollTo(achievements.length - 1);
    }
  }, [api]);

  const resetTimer = useCallback(() => {
    setTimerReset((value) => value + 1);
  }, []);

  const goNext = useCallback(() => {
    scrollNext();
    resetTimer();
  }, [resetTimer, scrollNext]);

  const goPrevious = useCallback(() => {
    scrollPrevious();
    resetTimer();
  }, [resetTimer, scrollPrevious]);

  const handleArrowKeys = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        event.stopPropagation();
        goPrevious();
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        event.stopPropagation();
        goNext();
      }
    },
    [goNext, goPrevious],
  );

  useEffect(() => {
    if (!api || selectedAchievement) {
      return;
    }

    const timerId = window.setInterval(scrollNext, AUTOSCROLL_DELAY);

    return () => window.clearInterval(timerId);
  }, [api, scrollNext, selectedAchievement, timerReset]);

  return (
    <section id="achievements" className="mx-auto w-full max-w-4xl py-20">
      <div className="mb-8">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-purple-200/80">
          Diplomas and participations
        </p>
        <h2 className="mt-2 text-3xl font-semibold text-slate-50">
          Events and certificates
        </h2>
      </div>

      <div onKeyDownCapture={handleArrowKeys}>
        <Carousel opts={{ align: "start" }} setApi={setApi}>
          <CarouselContent className="ml-0">
            {achievements.map((achievement) => (
              <CarouselItem
                key={achievement.title}
                className="basis-full px-1 pb-2 pt-3"
              >
                <button
                  type="button"
                  onClick={() => setSelectedAchievement(achievement)}
                  className="min-h-64 w-full rounded-lg border border-purple-400/30 bg-slate-950/80 p-6 text-left shadow-sm shadow-purple-950/20 transition hover:-translate-y-1 hover:border-purple-400/70 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-400"
                >
                  <p className="text-sm font-medium text-purple-200">
                    {achievement.date} / {achievement.event}
                  </p>
                  <h3 className="mt-4 text-2xl font-semibold text-slate-50">
                    {achievement.title}
                  </h3>
                  <p className="mt-4 text-sm leading-6 text-slate-300">
                    {achievement.description}
                  </p>
                  <p className="mt-8 text-sm font-medium text-purple-100">
                    Click for details
                  </p>
                </button>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        <div className="mt-6 flex justify-center gap-3">
          <Button
            type="button"
            size="icon-sm"
            aria-label="Previous achievement"
            onClick={goPrevious}
            className="rounded-full border border-purple-400/30 bg-slate-950 text-purple-100 hover:bg-purple-400/15"
          >
            <ChevronLeftIcon className="size-4" aria-hidden="true" />
          </Button>
          <Button
            type="button"
            size="icon-sm"
            aria-label="Next achievement"
            onClick={goNext}
            className="rounded-full border border-purple-400/30 bg-slate-950 text-purple-100 hover:bg-purple-400/15"
          >
            <ChevronRightIcon className="size-4" aria-hidden="true" />
          </Button>
        </div>
      </div>

      <div className="mt-8 flex justify-center">
        <Button
          asChild
          className="h-10 rounded-md border border-purple-400/30 bg-[var(--accent)] px-5 text-sm font-semibold text-white shadow-sm shadow-purple-950/40 hover:bg-[var(--accent-hover)] focus-visible:ring-[3px] focus-visible:ring-[var(--accent-ring)]"
        >
          <a href={cvHref} download="Val-CV.pdf">
            <DownloadIcon className="size-4" aria-hidden="true" />
            Download CV
          </a>
        </Button>
      </div>

      {selectedAchievement ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 px-4"
          role="presentation"
          onClick={() => setSelectedAchievement(null)}
        >
          <article
            className="w-full max-w-md rounded-lg border border-slate-700 bg-slate-950 p-6 text-slate-100 shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-labelledby="achievement-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm text-purple-200">
                  {selectedAchievement.date} / {selectedAchievement.event}
                </p>
                <h3
                  id="achievement-title"
                  className="mt-2 text-2xl font-semibold text-slate-50"
                >
                  {selectedAchievement.title}
                </h3>
              </div>
              <button
                type="button"
                aria-label="Close popup"
                className="rounded-md border border-slate-700 p-2 text-slate-300 hover:text-slate-50"
                onClick={() => setSelectedAchievement(null)}
              >
                <XIcon className="size-4" aria-hidden="true" />
              </button>
            </div>
            <p className="mt-6 text-sm leading-7 text-slate-300">
              {selectedAchievement.details}
            </p>
          </article>
        </div>
      ) : null}
    </section>
  );
};

export default AchievementsCarousel;
