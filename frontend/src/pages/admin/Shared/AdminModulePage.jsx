import { useEffect, useState } from 'react'
import { adminApi } from '../../../services/admin.service'

const fields = {
  services: [['title', 'Title'], ['description', 'Description']],
  projects: [['title', 'Title'], ['client', 'Client'], ['category', 'Category'], ['imageUrl', 'Image URL']],
  posts: [['title', 'Title'], ['slug', 'Slug'], ['excerpt', 'Excerpt'], ['content', 'Content']],
  pages: [['title', 'Title'], ['slug', 'Slug'], ['content', 'Content']],
}

export function AdminModulePage({ title, description, resource, user }) {
  const [rows, setRows] = useState([])
  const [form, setForm] = useState({})
  const [error, setError] = useState('')
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    let active = true
    adminApi.list(resource).then((data) => {
      if (active) setRows(data)
    }).catch((loadError) => {
      if (active) setError(loadError.message)
    })
    return () => { active = false }
  }, [resource])

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    try {
      const payload = resource === 'posts' ? { ...form, authorId: user.id } : form
      await adminApi.create(resource, payload)
      setForm({}); setShowForm(false)
      setRows(await adminApi.list(resource))
    } catch (submitError) { setError(submitError.message) }
  }

  return <section className="admin-module"><div className="module-heading"><div><p className="admin-eyebrow">Admin module</p><h1>{title}</h1><p>{description}</p></div>{fields[resource] && <button className="primary-action" type="button" onClick={() => setShowForm((open) => !open)}>+ {showForm ? 'Cancel' : 'Create new'}</button>}</div>{error && <p className="module-error">{error}</p>}{showForm && <form className="module-form" onSubmit={handleSubmit}>{fields[resource].map(([key, label]) => <label key={key}>{label}<input required={key !== 'imageUrl' && key !== 'excerpt'} value={form[key] || ''} onChange={(event) => setForm({ ...form, [key]: event.target.value })} /></label>)}<button className="primary-action" type="submit">Save record</button></form>}<div className="module-list">{rows.length === 0 ? <p className="module-empty">No records found.</p> : rows.map((row) => <article className="module-row" key={row.id}><div><strong>{row.title || row.name || row.key}</strong><small>{row.description || row.email || row.status || row.value || 'Record'}</small></div><span>#{row.id}</span></article>)}</div></section>
}