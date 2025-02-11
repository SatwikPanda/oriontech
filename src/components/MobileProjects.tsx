import { projects } from "../data/projects";

export default function MobileProjects() {
  return (
    <div className="grid grid-cols-1 gap-4 pb-10">
      {projects.map((project) => (
        <a
          key={project.id}
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white p-2 rounded-lg border border-black/15"
        >
          <div className="aspect-[4/3] overflow-hidden rounded-lg bg-black/5">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="mt-4">
            <h3 className="text-lg font-medium">{project.title}</h3>
            <p className="text-black/60 mt-1 text-sm">{project.description}</p>
            <span className="text-black/40 text-sm font-rmmono mt-2 block">
              {project.year}
            </span>
          </div>
        </a>
      ))}
    </div>
  );
}
