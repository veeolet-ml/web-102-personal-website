import { useEffect, useState, type KeyboardEvent } from "react";
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

import { type Achievement, achievements } from "@/lib/achievements";

const AUTOSCROLL_DELAY = 5000;

const cvHref = `${import.meta.env.BASE_URL}val-cv.pdf`;

const AchievementsCarousel = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [timerReset, setTimerReset] = useState(0);
  const [selectedAchievement, setSelectedAchievement] =
    useState<Achievement | null>(null);

  const moveCarousel = (direction: "next" | "previous") => {
    if (!api) return;

    if (direction === "next") {
      api.canScrollNext() ? api.scrollNext() : api.scrollTo(0);
    } else {
      api.canScrollPrev()
        ? api.scrollPrev()
        : api.scrollTo(achievements.length - 1);
    }

    setTimerReset((value) => value + 1);
  };

  const handleArrowKeys = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      event.stopPropagation();
      moveCarousel("previous");
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      event.stopPropagation();
      moveCarousel("next");
    }
  };

  useEffect(() => {
    if (!api || selectedAchievement) return;

    const timerId = window.setInterval(() => {
      api.canScrollNext() ? api.scrollNext() : api.scrollTo(0);
    }, AUTOSCROLL_DELAY);

    return () => window.clearInterval(timerId);
  }, [api, selectedAchievement, timerReset]);

  return (
    <section id="achievements" className="mx-auto w-full max-w-4xl py-20">
      <div className="mb-8">
        <h2 className="mt-2 text-3xl font-semibold text-slate-50">
          Diplomas and Participations
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
                  <div
                    className={
                      achievement.image
                        ? "grid gap-6 md:grid-cols-[minmax(0,1fr)_18rem] md:items-center"
                        : undefined
                    }
                  >
                    <div>
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
                    </div>

                    {achievement.image && (
                      <div className="aspect-[297/210] w-full overflow-hidden rounded-md border border-slate-800 bg-slate-900">
                        <img
                          src={achievement.image}
                          alt={`${achievement.title} diploma`}
                          className="h-full w-full object-contain"
                        />
                      </div>
                    )}
                  </div>
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
            onClick={() => moveCarousel("previous")}
            className="rounded-full border border-purple-400/30 bg-slate-950 text-purple-100 hover:bg-purple-400/15"
          >
            <ChevronLeftIcon className="size-4" aria-hidden="true" />
          </Button>

          <Button
            type="button"
            size="icon-sm"
            aria-label="Next achievement"
            onClick={() => moveCarousel("next")}
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

      {selectedAchievement && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 px-4"
          role="presentation"
          onClick={() => setSelectedAchievement(null)}
        >
          <article
            className={`max-h-[calc(100vh-2rem)] w-full overflow-y-auto rounded-lg border border-slate-700 bg-slate-950 p-6 text-slate-100 shadow-2xl ${
              selectedAchievement.image ? "max-w-4xl" : "max-w-md"
            }`}
            role="dialog"
            aria-modal="true"
            aria-labelledby="achievement-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div
              className={
                selectedAchievement.image
                  ? "grid gap-6 md:grid-cols-[minmax(0,1fr)_22rem]"
                  : undefined
              }
            >
              <div>
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
              </div>

              {selectedAchievement.image && (
                <div className="aspect-[297/210] w-full overflow-hidden rounded-md border border-slate-800 bg-slate-900">
                  <img
                    src={selectedAchievement.image}
                    alt={`${selectedAchievement.title} diploma`}
                    className="h-full w-full object-contain"
                  />
                </div>
              )}
            </div>
          </article>
        </div>
      )}
    </section>
  );
};

export default AchievementsCarousel;
