import React, { useMemo, useState, useEffect } from 'react';
import { getItems, postFoundItem } from '../api';
import ItemCard from './ItemCard';

const normalize = (str) => (str ? str.toLowerCase().trim() : '');

const Items = () => {
  const [ITEMS, setITEMS] = useState([]);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [status, setStatus] = useState('All');

  // Sidebar submission form fields state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [formCategory, setFormCategory] = useState('Wallet'); // Split from the filter state

  // Unified Custom Dialog Box State Engine
  const [dialog, setDialog] = useState({
    isOpen: false,
    title: '',
    message: '',
    isError: false,
  });

  const closeDialog = () => setDialog((prev) => ({ ...prev, isOpen: false }));

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

    if (!title || !formCategory || !location || !description) {
      setDialog({
        isOpen: true,
        title: 'Missing Fields',
        message: 'Please fill in all available fields before submitting your report.',
        isError: true,
      });
      return;
    }

    const newItem = {
      title,
      category: formCategory,
      location,
      description,
    };

    try {
      const response = await postFoundItem(newItem);

      if (response.success) {
        setDialog({
          isOpen: true,
          title: 'Success',
          message: 'Item reported successfully! It is now visible in the catalog database.',
          isError: false,
        });

        const data = await getItems();
        setITEMS(data);

        // Reset sidebar form fields cleanly
        setTitle('');
        setDescription('');
        setLocation('');
        setFormCategory('Wallet');
      } else {
        setDialog({
          isOpen: true,
          title: 'Submission Failed',
          message: response.message || 'The server rejected your listing request.',
          isError: true,
        });
      }
    } catch (error) {
      console.error('Error reporting item:', error);
      setDialog({
        isOpen: true,
        title: 'Network Error',
        message: 'An error occurred while transmitting data to the database server.',
        isError: true,
      });
    }
  };

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 relative">
      
      {/* MODERN IN-PAGE DIALOG MODAL BOX */}
      {dialog.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl p-6 shadow-xl transform scale-100 transition-all">
            <h3 className={`text-xl font-extrabold ${dialog.isError ? 'text-red-700' : 'text-gray-900'}`}>
              {dialog.title}
            </h3>
            <p className="mt-3 text-sm text-gray-600 leading-relaxed">
              {dialog.message}
            </p>
            <div className="mt-6 flex justify-end">
              <button
                onClick={closeDialog}
                className="px-5 py-2 rounded-md bg-gray-900 hover:bg-gray-800 text-white text-sm font-bold transition shadow-sm"
              >
                Okay
              </button>
            </div>
          </div>
        </div>
      )}

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
                <label className="block text-sm font-medium text-gray-800 mb-1">Search</label>
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
              Submitting this form logs a live entry straight to our network system.
            </p>

            <form className="mt-4 space-y-3" onSubmit={handleFoundItem}>
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-1">Title</label>
                <input 
                  value={title} 
                  required
                  className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-900" 
                  placeholder="e.g., Black wallet" 
                  onChange={(e) => setTitle(e.target.value)} 
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-1">Category</label>
                <select 
                  value={formCategory} 
                  className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-900" 
                  onChange={(e) => setFormCategory(e.target.value)}
                >
                  <option value="Wallet">Wallet</option>
                  <option value="Keys">Keys</option>
                  <option value="Bag">Bag</option>
                  <option value="ID">ID</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-800 mb-1">Location</label>
                <input 
                  value={location} 
                  required
                  className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-900" 
                  placeholder="Where did you find it?" 
                  onChange={(e) => setLocation(e.target.value)} 
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-800 mb-1">Description</label>
                <textarea
                  value={description}
                  required
                  className="w-full rounded-md border border-gray-300 px-3 py-2 min-h-[90px] outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-900"
                  placeholder="Add any identifying details" 
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-md bg-gray-900 px-4 py-2.5 text-white font-semibold hover:bg-gray-800 transition shadow-sm"
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