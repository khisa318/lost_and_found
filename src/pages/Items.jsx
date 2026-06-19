import React, { useMemo, useState } from 'react'

const ITEMS = [
  {
    id: 1,
    title: 'Black wallet',
    category: 'Wallet',
    status: 'Lost',
    location: 'Main Hall',
    foundBy: '',
    date: '2026-06-10',
    description: 'Black leather wallet with 3 cards inside.',
  },
  {
    id: 2,
    title: 'Keys (car + house)',
    category: 'Keys',
    status: 'Found',
    location: 'Library entrance',
    foundBy: 'Community report',
    date: '2026-06-14',
    description: 'Two keys with a red keychain.',
  },
  {
    id: 3,
    title: 'Blue backpack',
    category: 'Bag',
    status: 'Lost',
    location: 'Sports building',
    foundBy: '',
    date: '2026-06-08',
    description: 'Blue backpack with a water bottle pocket.',
  },
  {
    id: 4,
    title: 'Student ID card',
    category: 'ID',
    status: 'Found',
    location: 'Cafeteria',
    foundBy: 'Community report',
    date: '2026-06-16',
    description: 'ID card with photo; name visible.',
  },
]

const normalize = (s) => (s ?? '').toString().trim().toLowerCase()

const Items = () => {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [status, setStatus] = useState('All')

  const categories = useMemo(() => {
    const uniq = new Set(ITEMS.map((i) => i.category))
    return ['All', ...Array.from(uniq)]
  }, [])

  const filtered = useMemo(() => {
    const q = normalize(query)
    return ITEMS.filter((item) => {
      const matchesQuery =
        !q ||
        normalize(item.title).includes(q) ||
        normalize(item.description).includes(q) ||
        normalize(item.location).includes(q)
      const matchesCategory = category === 'All' || item.category === category
      const matchesStatus = status === 'All' || item.status === status
      return matchesQuery && matchesCategory && matchesStatus
    })
  }, [query, category, status])

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">Items</h1>
          <p className="mt-2 text-gray-700">
            Browse lost items or found items. Report a found item from this page.
          </p>
        </div>

        <div className="text-sm text-gray-600">
          Showing <span className="font-semibold text-gray-900">{filtered.length}</span> results
        </div>
      </div>

      {/* Filters + Report UI */}
      <section className="mt-6 grid lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2">
          <div className="rounded-2xl border border-gray-200 bg-white p-5">
            <div className="grid sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-800 mb-1">
                  Search
                </label>
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="e.g., wallet, keys, blue"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-900"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-800 mb-1">Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-900"
                >
                  <option value="All">All</option>
                  <option value="Lost">Lost</option>
                  <option value="Found">Found</option>
                </select>
              </div>
            </div>

            <div className="mt-3">
              <label className="block text-sm font-medium text-gray-800 mb-1">Category</label>
              <div className="flex flex-wrap gap-2">
                {categories.map((c) => (
                  <button
                    key={c}
                    onClick={() => setCategory(c)}
                    className={`px-3 py-2 rounded-md border text-sm transition ${
                      category === c
                        ? 'bg-gray-900 border-gray-900 text-white'
                        : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-5 grid sm:grid-cols-2 gap-4">
            {filtered.map((item) => (
              <article key={item.id} className="rounded-2xl border border-gray-200 p-5 bg-white">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-bold text-gray-900">{item.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {item.category} • {item.location}
                    </p>
                  </div>
                  <span
                    className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold border ${
                      item.status === 'Found'
                        ? 'bg-green-50 border-green-200 text-green-800'
                        : 'bg-amber-50 border-amber-200 text-amber-800'
                    }`}
                  >
                    {item.status}
                  </span>
                </div>

                <p className="mt-3 text-sm text-gray-700">{item.description}</p>

                <div className="mt-4 text-xs text-gray-500 flex items-center justify-between">
                  <span>{new Date(item.date).toLocaleDateString()}</span>
                  {item.status === 'Found' ? (
                    <span>{item.foundBy}</span>
                  ) : (
                    <span className="italic">Owner not provided</span>
                  )}
                </div>

                <div className="mt-4 flex gap-2">
                  <button className="flex-1 rounded-md bg-gray-100 hover:bg-gray-200 px-3 py-2 text-sm font-semibold text-gray-800 transition">
                    View details
                  </button>
                  <button className="rounded-md border border-gray-300 hover:bg-gray-50 px-3 py-2 text-sm font-semibold text-gray-800 transition">
                    {item.status === 'Found' ? 'Claim' : 'Update'}
                  </button>
                </div>
              </article>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="mt-5 rounded-2xl border border-gray-200 bg-white p-10 text-center">
              <p className="font-semibold text-gray-900">No matches found</p>
              <p className="mt-1 text-gray-600">Try a different keyword, category, or status.</p>
            </div>
          )}
        </div>

        {/* Report Card */}
        <aside className="lg:col-span-1">
          <div className="rounded-2xl border border-gray-200 bg-white p-5">
            <h2 className="text-lg font-bold text-gray-900">Report a found item</h2>
            <p className="mt-1 text-sm text-gray-600">
              This is a UI placeholder—wire this to a backend later.
            </p>

            <form className="mt-4 space-y-3" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-1">Title</label>
                <input className="w-full rounded-md border border-gray-300 px-3 py-2" placeholder="e.g., Black wallet" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-1">Category</label>
                <select className="w-full rounded-md border border-gray-300 px-3 py-2" defaultValue="Wallet">
                  <option>Wallet</option>
                  <option>Keys</option>
                  <option>Bag</option>
                  <option>ID</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-1">Location</label>
                <input className="w-full rounded-md border border-gray-300 px-3 py-2" placeholder="Where did you find it?" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-1">Description</label>
                <textarea
                  className="w-full rounded-md border border-gray-300 px-3 py-2 min-h-[90px]"
                  placeholder="Add any identifying details"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-md bg-gray-900 px-4 py-2.5 text-white font-semibold hover:bg-gray-800 transition"
              >
                Submit report
              </button>

              <p className="text-xs text-gray-500">
                Tip: include color, brand, unique marks, and where/when you found it.
              </p>
            </form>
          </div>
        </aside>
      </section>
    </main>
  )
}

export default Items
