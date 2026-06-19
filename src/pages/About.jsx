import React from 'react'

const About = () => {
  return (
    <main className="w-full min-h-screen bg-[#fbf6ef] text-[#4a3728] px-6 py-12">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-extrabold tracking-tight text-[#2d1e13]">About</h1>
          <p className="mt-4 text-lg text-[#5c4a3d] leading-relaxed">
            Lost&Found is a simple community website for reuniting people with their
            belongings. Instead of searching in countless places, you can browse a
            single list of lost and found items.
          </p>

          <section className="mt-10 rounded-2xl border border-[#c1a084] bg-white p-8">
            <h2 className="text-xl font-bold text-[#2d1e13]">What you can do</h2>
            <ul className="mt-5 space-y-4 text-[#5c4a3d]">
              <li className="flex gap-4">
                <span className="font-bold text-[#2d1e13]">1.</span> Browse items to see what others reported.
              </li>
              <li className="flex gap-4">
                <span className="font-bold text-[#2d1e13]">2.</span> If you found something, submit a report with details.
              </li>
              <li className="flex gap-4">
                <span className="font-bold text-[#2d1e13]">3.</span> Contact/claim (implementation depends on backend/auth).
              </li>
            </ul>
          </section>

          <section className="mt-6 rounded-2xl border border-[#c1a084] bg-white p-8">
            <h2 className="text-xl font-bold text-[#2d1e13]">Privacy & safety</h2>
            <p className="mt-4 text-[#5c4a3d]">
              Add only the information needed to identify an item. Avoid sharing sensitive
              personal information publicly.
            </p>
          </section>

          <section className="mt-6 rounded-2xl bg-[#f5efe9] border border-[#c1a084] p-8">
            <h2 className="text-xl font-bold text-[#2d1e13]">Next steps</h2>
            <p className="mt-4 text-[#5c4a3d]">
              This project currently uses placeholder pages and sample data. Next, you can
              wire the report form and claim/update actions to a database.
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}

export default About