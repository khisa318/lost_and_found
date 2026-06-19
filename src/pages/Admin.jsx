import React from 'react'

const Card = ({ title, subtitle, children }) => {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-gray-900">{title}</h2>
          {subtitle ? <p className="mt-1 text-sm text-gray-600">{subtitle}</p> : null}
        </div>
      </div>
      {children}
    </section>
  )
}

const Admin = () => {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">Admin</h1>
          <p className="mt-2 text-gray-700">
            Dashboard layout placeholder (no authentication/backend yet).
          </p>
        </div>
      </div>

      <div className="mt-6 grid lg:grid-cols-2 gap-4">
        <Card title="Reports" subtitle="Manage reported found/lost items">
          <div className="mt-4 grid gap-3">
            {[{ k: 'New reports', v: '12' }, { k: 'Needs review', v: '4' }, { k: 'Resolved', v: '31' }].map(
              (row) => (
                <div key={row.k} className="flex items-center justify-between rounded-xl border border-gray-200 p-3">
                  <span className="text-sm text-gray-700">{row.k}</span>
                  <span className="text-sm font-bold text-gray-900">{row.v}</span>
                </div>
              )
            )}
          </div>
        </Card>

        <Card title="Manage listings" subtitle="Moderate or remove incorrect reports">
          <div className="mt-4">
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-600">
                    <th className="font-semibold py-2">Item</th>
                    <th className="font-semibold py-2">Status</th>
                    <th className="font-semibold py-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { item: 'Keys (car + house)', status: 'Found', action: 'Review' },
                    { item: 'Blue backpack', status: 'Lost', action: 'Verify' },
                    { item: 'Student ID card', status: 'Found', action: 'Check' },
                  ].map((r) => (
                    <tr key={r.item} className="border-t border-gray-100">
                      <td className="py-3 text-gray-900 font-medium">{r.item}</td>
                      <td className="py-3 text-gray-700">{r.status}</td>
                      <td className="py-3">
                        <button className="rounded-md border border-gray-300 px-3 py-1.5 text-sm font-semibold hover:bg-gray-50">
                          {r.action}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Card>

        <Card title="Users" subtitle="Placeholder user management">
          <div className="mt-4 grid gap-3">
            {['Members', 'Moderators', 'Suspended'].map((t, idx) => (
              <div
                key={t}
                className="rounded-xl border border-gray-200 p-4 flex items-center justify-between"
              >
                <span className="text-sm font-medium text-gray-800">{t}</span>
                <span className="text-sm font-bold text-gray-900">{[128, 6, 2][idx]}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Moderation rules" subtitle="Guidelines">
          <ul className="mt-4 space-y-2 text-sm text-gray-700">
            <li className="flex gap-2">
              <span className="font-semibold text-gray-900">•</span> Ensure reports include enough detail.
            </li>
            <li className="flex gap-2">
              <span className="font-semibold text-gray-900">•</span> Remove duplicate/incorrect listings.
            </li>
            <li className="flex gap-2">
              <span className="font-semibold text-gray-900">•</span> Avoid personal data exposure.
            </li>
          </ul>
        </Card>
      </div>
    </main>
  )
}

export default Admin
