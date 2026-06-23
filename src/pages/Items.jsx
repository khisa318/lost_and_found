import React, { useMemo, useState, useEffect } from 'react';
import { getItems, postFoundItem } from '../api';
import ItemCard from './ItemCard'; // Verified path matching layout imports

const normalize = (str) => (str ? str.toLowerCase().trim() : '');

const Items = () => {
  const [ITEMS, setITEMS] = useState([]);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [status, setStatus] = useState('All');

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getItems();
        setITEMS(data);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };
    fetchData();
  }, []);

  const categories = useMemo(() => {
    const uniq = new Set(ITEMS.map((i) => i.category));
    return ['All', ...Array.from(uniq)];
  }, [ITEMS]);

  const filtered = useMemo(() => {
    const q = normalize(query);
    return ITEMS.filter((item) => {
      const matchesQuery =
        !q ||
        normalize(item.title).includes(q) ||
        normalize(item.description).includes(q) ||
        normalize(item.location).includes(q);
      const matchesCategory = category === 'All' || item.category === category;
      const matchesStatus = status === 'All' || item.status === status;
      return matchesQuery && matchesCategory && matchesStatus;
    });
  }, [ITEMS, query, category, status]);

  const handleFoundItem = async (e) => {
  e.preventDefault();

  if (!title || !category || !location || !description) {
    alert('Please fill in all fields before submitting.');
    return;
  }

  const newItem = {
    title,
    category,
    location,
    description,
  };

  try {
    const response = await postFoundItem(newItem);

    if (response.success) {
      alert('Item reported successfully!');

      const data = await getItems();
      setITEMS(data);

      setTitle('');
      setDescription('');
      setLocation('');
      setCategory('All');
    } else {
      alert(response.message);
    }
  } catch (error) {
    console.error('Error reporting item:', error);
    alert('An error occurred while reporting the item.');
  }
};

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

      {/* Main Content Layout Grid */}
      <section className="mt-6 grid lg:grid-cols-3 gap-5">
        
        {/* Left/Middle Column: Filters & Cards Layout */}
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

          {/* Cards Dynamic Loop Output */}
          <div className="mt-5 grid sm:grid-cols-2 gap-4">
            {filtered.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="mt-5 rounded-2xl border border-gray-200 bg-white p-10 text-center">
              <p className="font-semibold text-gray-900">No matches found</p>
              <p className="mt-1 text-gray-600">Try a different keyword, category, or status.</p>
            </div>
          )}
        </div>

        {/* Right Column: Cleaned Sidebar Form */}
        <aside className="lg:col-span-1">
          <div className="rounded-2xl border border-gray-200 bg-white p-5">
            <h2 className="text-lg font-bold text-gray-900">Report a found item</h2>
            <p className="mt-1 text-sm text-gray-600">
              This is a UI placeholder—wire this to a backend later.
            </p>

            <form className="mt-4 space-y-3" onSubmit={handleFoundItem}>
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-1">Title</label>
                <input value={title} className="w-full rounded-md border border-gray-300 px-3 py-2" placeholder="e.g., Black wallet" onChange={(e) => setTitle(e.target.value)} />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-1">Category</label>
                <select className="w-full rounded-md border border-gray-300 px-3 py-2" defaultValue="Wallet" onChange={(e) => setCategory(e.target.value)}>
                  <option>Wallet</option>
                  <option>Keys</option>
                  <option>Bag</option>
                  <option>ID</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-800 mb-1">Location</label>
                <input value={location} className="w-full rounded-md border border-gray-300 px-3 py-2" placeholder="Where did you find it?" onChange={(e) => setLocation(e.target.value)} />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-800 mb-1">Description</label>
                <textarea
                  className="w-full rounded-md border border-gray-300 px-3 py-2 min-h-[90px]"
                  placeholder="Add any identifying details" value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-md bg-gray-900 px-4 py-2.5 text-white font-semibold hover:bg-gray-800 transition"
              >
                Submit report
              </button>

              <p className="text-xs text-gray-500 pt-1">
                Tip: include color, brand, unique marks, and where/when you found it.
              </p>
            </form>
          </div>
        </aside>

      </section>
    </main>
  );
};

export default Items;