export function AdminModulePage({ title, description }) {
  return <section className="admin-empty-state"><p className="admin-eyebrow">Admin module</p><h1>{title}</h1><p>{description}</p><button className="primary-action" type="button">+ Create new</button></section>
}