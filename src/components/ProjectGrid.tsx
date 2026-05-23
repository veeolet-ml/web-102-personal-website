import ProjectCard from "@/components/ProjectCard";
import type { Project } from "@/lib/projects";

interface ProjectGridProps {
  projects: Project[];
}

const ProjectGrid = ({ projects }: ProjectGridProps) => {
  return (
    <section id="projects" className="mx-auto w-full max-w-6xl py-20">
      <div className="mb-8">
        <h2 className="text-3xl font-semibold text-slate-50">Projects</h2>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </section>
  );
};

export default ProjectGrid;
