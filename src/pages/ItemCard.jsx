import React from 'react';

const ItemCard = ({ item }) => {
  return (
    <article className="rounded-2xl border border-gray-200 p-5 bg-white">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-bold text-gray-900">
            {item.title}
          </h3>

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

      <p className="mt-3 text-sm text-gray-700">
        {item.description}
      </p>

      <div className="mt-4 text-xs text-gray-500 flex items-center justify-between">
        <span>
          {item.date
            ? new Date(item.date).toLocaleDateString()
            : 'No Date'}
        </span>

        {item.status === 'Found' ? (
          <span>{item.foundBy || 'Unknown'}</span>
        ) : (
          <span className="italic">
            Owner not provided
          </span>
        )}
      </div>

      <div className="mt-4 flex gap-2">
        <button className="flex-1 rounded-md bg-gray-100 hover:bg-gray-200 px-3 py-2 text-sm font-semibold text-gray-800 transition">
          View Details
        </button>

        <button className="rounded-md border border-gray-300 hover:bg-gray-50 px-3 py-2 text-sm font-semibold text-gray-800 transition">
          {item.status === 'Found'
            ? 'Claim'
            : 'Update'}
        </button>
      </div>
    </article>
  );
};

export default ItemCard;