import { Arrow } from '../../../components/common/Arrow'
import { HeroArt } from '../../../components/ui/HeroArt'
import { ProjectCard } from '../../../components/ui/ProjectCard'
import { ServiceRow } from '../../../components/ui/ServiceRow'
import { SectionHeading } from '../../../components/layout/SectionHeading'

export function HomePage({ company, projects, services, stats, testimonial }) {
  return (
    <>
      <section className="hero" id="top"><div className="hero-kicker"><span className="status-dot" /> Exclusive automotive experience</div><h1><span className="hero-script">{company.headlineLeadFirst}<br />{company.headlineLeadSecond}</span><span className="hero-brush">Di rental <span className="hero-yahoo">Yahoo</span> aja</span></h1><div className="hero-bottom"><p>{company.introLines.map((line, index) => <span key={line}>{line}{index < company.introLines.length - 1 && <br />}</span>)}</p><a className="hero-cta" href="#work">Read more <Arrow /></a></div><HeroArt /></section>
      <section className="manifesto" id="about"><p className="eyebrow">A small studio with a wide orbit</p><div className="manifesto-copy"><h2>We help good companies become <em>great brands.</em></h2><p>Strategy is only useful when it moves people. We combine clear thinking, brave ideas, and meticulous craft to create work that earns attention and keeps it.</p></div><div className="stats-row">{stats.map(([value, label]) => <div className="stat" key={label}><strong>{value}</strong><span>{label}</span></div>)}</div></section>
      <section className="work-section" id="work"><SectionHeading label="Product" detail="01 — 03" /><div className="project-grid">{projects.map((project, index) => <ProjectCard key={project.title} project={project} index={index + 1} featured={index === 0} />)}</div></section>
      <section className="services-section" id="services"><SectionHeading label="What we do" detail="Services" /><div className="services-list">{services.map((service) => <ServiceRow key={service.number} service={service} />)}</div></section>
      <section className="rental-section" id="rental"><SectionHeading label="Rental" detail="Spaces & equipment" /><div className="rental-content"><h2>Make room for your next idea.</h2><p>Spaces and equipment for productions, launches, gatherings, and projects that deserve the right setting.</p><a className="text-link" href="/#contact">Discuss your rental needs <Arrow /></a></div></section>
      <section className="quote-section" id="artikel"><span className="quote-mark">“</span><blockquote>{testimonial.quote}</blockquote><p className="quote-author"><strong>{testimonial.name}</strong> / {testimonial.role}</p></section>
    </>
  )
}