import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom' // Added Link for back navigation
import { getItem } from '../api'

const ItemsDetailPage = () => {
  const { id } = useParams()
  const [item, setItem] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await getItem(id)
        setItem(response)
      } catch (error) {
        console.error('Error fetching item:', error)
      }
      setLoading(false)
    }
    fetchItem()
  }, [id])

  return (
    <main className="w-full min-h-screen bg-[#fbf6ef] px-4 py-12 md:px-6">
      <div className="mx-auto max-w-3xl">
        
        {/* Back Button / Breadcrumb */}
        <div className="mb-6">
          <Link 
            to="/items" 
            className="text-sm font-semibold text-[#5c4a3d] hover:text-[#2d1e13] transition flex items-center gap-1"
          >
            ← Back to Items
          </Link>
        </div>

        {loading ? (
          /* Elegant Loading State */
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-10 h-10 border-4 border-[#c1a084]/30 border-t-[#2d1e13] rounded-full animate-spin"></div>
            <p className="mt-4 text-sm font-medium text-[#5c4a3d]">Loading item details...</p>
          </div>
        ) : item ? (
          /* Main Card Presentation Layout */
          <article className="rounded-2xl border border-[#c1a084]/40 bg-white p-6 md:p-8 shadow-sm">
            
            {/* Header Content Section */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-[#eaddcf] pb-6">
              <div>
                <span className="text-xs font-bold tracking-wider uppercase text-[#c1a084]">
                  {item.category || 'Uncategorized'}
                </span>
                <h1 className="text-3xl font-extrabold text-[#2d1e13] mt-1">{item.title}</h1>
              </div>
              
              {/* Dynamic Status Badging */}
              <span
                className={`inline-flex items-center self-start sm:self-auto rounded-full px-3 py-1 text-xs font-bold border ${
                  item.status === 'Found'
                    ? 'bg-green-50 border-green-200 text-green-800'
                    : 'bg-amber-50 border-amber-200 text-amber-800'
                }`}
              >
                {item.status}
              </span>
            </div>

            {/* Description Block */}
            <div className="py-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#2d1e13] mb-2">Description</h3>
              <p className="text-[#5c4a3d] leading-relaxed whitespace-pre-line">{item.description}</p>
            </div>

            {/* Meta Data Information Grid */}
            <div className="grid sm:grid-cols-2 gap-4 border-t border-[#eaddcf] pt-6 text-sm">
              <div className="rounded-xl bg-[#fbf6ef] p-4 border border-[#eaddcf]/60">
                <span className="block text-xs font-bold uppercase tracking-wider text-[#c1a084]">Location</span>
                <span className="text-[#2d1e13] font-semibold mt-1 block">{item.location || 'Not specified'}</span>
              </div>

              <div className="rounded-xl bg-[#fbf6ef] p-4 border border-[#eaddcf]/60">
                <span className="block text-xs font-bold uppercase tracking-wider text-[#c1a084]">Date Reported</span>
                <span className="text-[#2d1e13] font-semibold mt-1 block">
                  {item.date ? new Date(item.date).toLocaleDateString(undefined, { dateStyle: 'long' }) : 'Unknown'}
                </span>
              </div>
            </div>

            {/* Footer Claims Block */}
            {item.status === 'Found' && item.foundBy && (
              <div className="mt-4 rounded-xl bg-[#f5efe9] p-4 border border-[#eaddcf] text-xs text-[#5c4a3d]">
                <span className="font-bold text-[#2d1e13]">Found By:</span> {item.foundBy}
              </div>
            )}

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <button className="flex-1 rounded-md bg-[#2d1e13] px-4 py-2.5 text-sm font-bold text-[#fbf6ef] hover:bg-[#5c4a3d] transition shadow-sm">
                {item.status === 'Found' ? 'Claim This Item' : 'Contact Reporter'}
              </button>
            </div>

          </article>
        ) : (
          /* Error Fallback State Layout */
          <div className="rounded-2xl border border-dashed border-[#c1a084] bg-white p-12 text-center">
            <p className="font-bold text-[#2d1e13] text-lg">Item Not Found</p>
            <p className="mt-1 text-sm text-[#5c4a3d]">
              The item listing you are looking for does not exist or has been removed by an admin.
            </p>
            <Link 
              to="/items" 
              className="mt-5 inline-block rounded-md bg-[#c1a084] px-4 py-2 text-sm font-bold text-[#2d1e13] hover:bg-[#eaddcf] transition"
            >
              Return to Catalog
            </Link>
          </div>
        )}
      </div>
    </main>
  )
}

export default ItemsDetailPage