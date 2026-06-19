import React from 'react'

const About = () => {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <div className="max-w-3xl">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">About</h1>
        <p className="mt-3 text-gray-700">
          Lost&Found is a simple community website for reuniting people with their
          belongings. Instead of searching in countless places, you can browse a
          single list of lost and found items.
        </p>

        <section className="mt-8 rounded-2xl border border-gray-200 bg-white p-6">
          <h2 className="text-xl font-bold text-gray-900">What you can do</h2>
          <ul className="mt-3 space-y-2 text-gray-700">
            <li className="flex gap-3">
              <span className="font-semibold text-gray-900">1.</span> Browse items to see what others reported.
            </li>
            <li className="flex gap-3">
              <span className="font-semibold text-gray-900">2.</span> If you found something, submit a report with details.
            </li>
            <li className="flex gap-3">
              <span className="font-semibold text-gray-900">3.</span> Contact/claim (implementation depends on backend/auth).
            </li>
          </ul>
        </section>

        <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-6">
          <h2 className="text-xl font-bold text-gray-900">Privacy & safety</h2>
          <p className="mt-3 text-gray-700 text-sm">
            Add only the information needed to identify an item. Avoid sharing sensitive
            personal information publicly.
          </p>
        </section>

        <section className="mt-6 rounded-2xl bg-gray-50 border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900">Next steps</h2>
          <p className="mt-3 text-gray-700 text-sm">
            This project currently uses placeholder pages and sample data. Next, you can
            wire the report form and claim/update actions to a database.
          </p>
        </section>
      </div>
    </main>
  )
}

export default About
