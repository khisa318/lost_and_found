import React from 'react'

const Card = ({ title, subtitle, children }) => {
  return (
    <section className="rounded-2xl border border-[#c1a084] bg-white p-6 shadow-sm">
      <div>
        <h2 className="text-lg font-bold text-[#2d1e13]">{title}</h2>
        {subtitle ? <p className="mt-1 text-sm text-[#5c4a3d]">{subtitle}</p> : null}
      </div>
      {children}
    </section>
  )
}

const Admin = () => {
  return (
    <main className="w-full min-h-screen bg-[#fbf6ef] px-6 py-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-[#2d1e13]">Admin Dashboard</h1>
          <p className="mt-2 text-[#5c4a3d]">
            Control panel for managing reports, users, and moderation guidelines.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card title="Reports" subtitle="Manage reported found/lost items">
            <div className="mt-6 grid gap-3">
              {[{ k: 'New reports', v: '12' }, { k: 'Needs review', v: '4' }, { k: 'Resolved', v: '31' }].map(
                (row) => (
                  <div key={row.k} className="flex items-center justify-between rounded-xl border border-[#eaddcf] bg-[#f5efe9] p-4">
                    <span className="text-sm font-medium text-[#5c4a3d]">{row.k}</span>
                    <span className="text-sm font-bold text-[#2d1e13]">{row.v}</span>
                  </div>
                )
              )}
            </div>
          </Card>

          <Card title="Manage listings" subtitle="Moderate or remove incorrect reports">
            <div className="mt-6">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-[#5c4a3d]">
                      <th className="font-semibold py-3">Item</th>
                      <th className="font-semibold py-3">Status</th>
                      <th className="font-semibold py-3">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { item: 'Keys (car + house)', status: 'Found', action: 'Review' },
                      { item: 'Blue backpack', status: 'Lost', action: 'Verify' },
                      { item: 'Student ID card', status: 'Found', action: 'Check' },
                    ].map((r) => (
                      <tr key={r.item} className="border-t border-[#eaddcf]">
                        <td className="py-4 text-[#2d1e13] font-semibold">{r.item}</td>
                        <td className="py-4 text-[#5c4a3d]">{r.status}</td>
                        <td className="py-4">
                          <button className="rounded-md border border-[#c1a084] px-4 py-1.5 text-xs font-bold text-[#2d1e13] hover:bg-[#eaddcf] transition">
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

          <Card title="Users" subtitle="Active account metrics">
            <div className="mt-6 grid gap-3">
              {['Members', 'Moderators', 'Suspended'].map((t, idx) => (
                <div
                  key={t}
                  className="rounded-xl border border-[#eaddcf] bg-[#f5efe9] p-4 flex items-center justify-between"
                >
                  <span className="text-sm font-medium text-[#5c4a3d]">{t}</span>
                  <span className="text-sm font-bold text-[#2d1e13]">{[128, 6, 2][idx]}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card title="Moderation rules" subtitle="Community guidelines">
            <ul className="mt-6 space-y-3 text-sm text-[#5c4a3d]">
              {[
                "Ensure reports include enough detail.",
                "Remove duplicate or incorrect listings.",
                "Avoid exposing personal contact data."
              ].map((rule, i) => (
                <li key={i} className="flex gap-3">
                  <span className="font-bold text-[#c1a084]">•</span> {rule}
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </main>
  )
}

export default Admin