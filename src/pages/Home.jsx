import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    // Changed max-w-6xl to w-full and added padding to handle the bleed
    <main className="w-full min-h-screen bg-[#fbf6ef] text-[#4a3728] px-6 py-12">
      {/* Container to keep content aligned but centered */}
      <div className="mx-auto max-w-7xl">
        
        {/* Hero Section */}
        <section className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="inline-flex items-center rounded-full bg-[#eaddcf] px-4 py-1.5 text-sm font-semibold text-[#6f5544]">
              Report when you find • Search when you lose
            </p>
            <h1 className="mt-6 text-5xl md:text-6xl font-extrabold tracking-tight text-[#2d1e13]">
              A simple lost & found community
            </h1>
            <p className="mt-6 text-[#5c4a3d] text-xl leading-relaxed max-w-lg">
              When you lose something, browse items. When you find something,
              report it so the right owner can get it back.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link
                to="/items"
                className="inline-flex items-center justify-center rounded-lg bg-[#2d1e13] px-8 py-4 text-[#fbf6ef] font-bold hover:bg-[#4a3728] transition shadow-lg"
              >
                Browse items
              </Link>
              <Link
                to="/items"
                className="inline-flex items-center justify-center rounded-lg border-2 border-[#c1a084] px-8 py-4 text-[#2d1e13] font-bold hover:bg-[#eaddcf] transition"
              >
                Report a found item
              </Link>
            </div>
          </div>

          {/* Right Side Image */}
          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl bg-[#6f5544]/10 blur-xl" />
            <img
              src={"https://images.unsplash.com/photo-1626010448982-0fec79ed1979?q=80&w=1170&auto=format&fit=crop"}
              alt="Lost and found"
              className="relative rounded-3xl shadow-2xl w-full object-cover h-[500px]"
            />
          </div>
        </section>

        {/* How it works - Section stretches naturally */}
        <section className="mt-24 border-t border-[#c1a084]/30 pt-16">
          <h2 className="text-3xl font-bold text-[#2d1e13]">How it works</h2>
          <div className="mt-10 grid md:grid-cols-3 gap-8">
            {[
              { n: '1', title: 'Browse Items', desc: 'Search by category and keywords.' },
              { n: '2', title: 'Report Found', desc: 'Post details for owners to claim.' },
              { n: '3', title: 'Get Reunited', desc: 'Connect owners with found items.' }
            ].map((item, i) => (
              <div key={i} className="rounded-2xl border border-[#c1a084] bg-[#f5efe9] p-8">
                <div className="w-12 h-12 rounded-xl bg-[#2d1e13] text-[#fbf6ef] flex items-center justify-center font-bold text-lg">
                  {item.n}
                </div>
                <h3 className="mt-6 font-bold text-[#2d1e13] text-xl">{item.title}</h3>
                <p className="mt-3 text-[#5c4a3d] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default Home;