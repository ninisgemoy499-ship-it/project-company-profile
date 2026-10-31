import { Arrow } from '../common/Arrow'

export function ProjectCard({ project, index, featured = false }) {
  return (
    <a className={`project-card ${featured ? 'project-featured' : ''}`} href="#contact">
      <div className={`project-image ${project.tone}`}>
        <img src={project.image} alt="" />
        <span className="project-index">0{index}</span>
        <span className="project-arrow"><Arrow /></span>
      </div>
      <div className="project-meta">
        <h3>{project.title}</h3>
        <p>{project.client}</p>
        <small>{project.category}</small>
      </div>
    </a>
  )
}