import { Button } from "@/components/ui/button";
import myFace from "@/assets/myface.jpg";

const IntroSection = () => {
  const scrollToProjects = () => {
    const target = document.getElementById("projects");

    if (!target) {
      return;
    }

    const startY = window.scrollY;
    const targetY = target.getBoundingClientRect().top + window.scrollY;
    const distance = targetY - startY;
    const duration = 750;
    let startTime: number | null = null;

    const easeInOut = (progress: number) =>
      progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;

    const step = (currentTime: number) => {
      startTime ??= currentTime;

      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      window.scrollTo(0, startY + distance * easeInOut(progress));

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  };

  return (
    <section
      id="intro"
      className="mx-auto flex min-h-screen max-w-5xl flex-col justify-center gap-10 px-6 py-16 md:flex-row md:items-center"
    >
      <div className="flex-1">
        <h1>
          This is <strong>Val</strong> here.
        </h1>
        <p>
          I'm a fun, creative person who loves to create and tinker with
          anything and everything. My prefered area of work is at the edge
          between software and hardware; I am particularly passionate about
          systems engineering and logical design, but also higher-level topics
          like functional programming and backends.
        </p>

        <Button
          className="mt-6 h-10 rounded-md border border-purple-400/30 bg-[var(--accent)] px-5 text-sm font-semibold text-white shadow-sm shadow-purple-950/40 transition-colors hover:bg-[var(--accent-hover)] focus-visible:ring-[3px] focus-visible:ring-[var(--accent-ring)]"
          onClick={scrollToProjects}
        >
          View projects
        </Button>
      </div>

      <img
        src={myFace}
        alt="Portrait of Val"
        className="h-64 w-64 self-center rounded-lg object-cover md:h-80 md:w-80"
      />
    </section>
  );
};

export default IntroSection;
