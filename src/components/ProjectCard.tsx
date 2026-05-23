import type { Project } from "@/lib/projects";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => (
  <a
    href={project.href}
    target="_blank"
    rel="noopener noreferrer"
    className="group overflow-hidden rounded-lg border border-purple-950/70 bg-slate-950/80 text-left shadow-sm transition duration-300 ease-in-out hover:-translate-y-1 hover:border-purple-700/80 hover:shadow-lg hover:shadow-purple-950/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-400"
  >
    <div className="aspect-[16/10] overflow-hidden border-b border-slate-800 bg-slate-900">
      <img
        src={project.image}
        alt=""
        className="h-full w-full object-cover transition duration-300 ease-in-out group-hover:scale-105 group-focus-visible:scale-105"
      />
    </div>

    <div className="p-4">
      <h3 className="text-base font-semibold text-slate-50">
        {project.title}
      </h3>
      <p className="mt-2 text-sm leading-6 text-slate-400">
        {project.description}
      </p>
      <p className="grid grid-rows-[0fr] text-sm leading-6 text-purple-100 transition-all duration-300 ease-in-out group-hover:mt-3 group-hover:grid-rows-[1fr] group-focus-visible:mt-3 group-focus-visible:grid-rows-[1fr]">
        <span className="overflow-hidden">{project.details}</span>
      </p>
    </div>
  </a>
);

export default ProjectCard;
