import { Arrow } from '../common/Arrow'

export function ServiceRow({ service }) {
  return (
    <article className="service-row">
      <span className="service-number">{service.number}</span>
      <h3>{service.title}</h3>
      <p>{service.copy}</p>
      <Arrow />
    </article>
  )
}