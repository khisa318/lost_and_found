import React from 'react'
import { Link } from 'react-router-dom'
import heroImg from '../assets/hero.png'

const Home = () => {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      {/* Hero */}
      <section className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <p className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-800">
            Report when you find • Search when you lose
          </p>
          <h1 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
            A simple lost & found community
          </h1>
          <p className="mt-4 text-gray-700 text-lg">
            When you lose something, browse items. When you find something,
            report it so the right owner can get it back.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Link
              to="/items"
              className="inline-flex items-center justify-center rounded-md bg-gray-900 px-5 py-3 text-white font-semibold hover:bg-gray-800 transition"
            >
              Browse items
            </Link>
            <Link
              to="/items"
              className="inline-flex items-center justify-center rounded-md border border-gray-300 px-5 py-3 text-gray-900 font-semibold hover:bg-gray-50 transition"
            >
              Report a found item
            </Link>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-4">
            <div className="rounded-lg border border-gray-200 p-3">
              <p className="text-sm text-gray-600">Fast</p>
              <p className="font-bold">Search</p>
            </div>
            <div className="rounded-lg border border-gray-200 p-3">
              <p className="text-sm text-gray-600">Simple</p>
              <p className="font-bold">Report</p>
            </div>
            <div className="rounded-lg border border-gray-200 p-3">
              <p className="text-sm text-gray-600">Community</p>
              <p className="font-bold">Help</p>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-2 bg-gradient-to-r from-gray-200/70 to-gray-100 rounded-3xl blur" />
          <img
            src={heroImg}
            alt="Lost and found"
            className="relative rounded-3xl shadow-sm ring-1 ring-gray-200 w-full object-cover"
          />
        </div>
      </section>

      {/* How it works */}
      <section className="mt-14">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">How it works</h2>
            <p className="mt-2 text-gray-700">
              Two easy paths: browse what you’ve lost or report what you’ve found.
            </p>
          </div>
        </div>

        <div className="mt-6 grid md:grid-cols-3 gap-4">
          <div className="rounded-xl border border-gray-200 p-5">
            <div className="w-10 h-10 rounded-lg bg-gray-900 text-white flex items-center justify-center font-bold">
              1
            </div>
            <h3 className="mt-3 font-semibold text-gray-900">Browse Items</h3>
            <p className="mt-2 text-sm text-gray-700">
              Search by category and keywords. Find matches faster.
            </p>
          </div>
          <div className="rounded-xl border border-gray-200 p-5">
            <div className="w-10 h-10 rounded-lg bg-gray-900 text-white flex items-center justify-center font-bold">
              2
            </div>
            <h3 className="mt-3 font-semibold text-gray-900">Report Found</h3>
            <p className="mt-2 text-sm text-gray-700">
              When you find something, post details so owners can claim it.
            </p>
          </div>
          <div className="rounded-xl border border-gray-200 p-5">
            <div className="w-10 h-10 rounded-lg bg-gray-900 text-white flex items-center justify-center font-bold">
              3
            </div>
            <h3 className="mt-3 font-semibold text-gray-900">Get Reunited</h3>
            <p className="mt-2 text-sm text-gray-700">
              Your report helps connect lost owners with found items.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mt-10 rounded-2xl border border-gray-200 bg-gray-50 p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900">Ready to help?</h3>
            <p className="mt-1 text-gray-700">
              Browse listings or submit a found item.
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              to="/items"
              className="inline-flex items-center justify-center rounded-md bg-gray-900 px-5 py-2.5 text-white font-semibold hover:bg-gray-800 transition"
            >
              Go to Items
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Home
