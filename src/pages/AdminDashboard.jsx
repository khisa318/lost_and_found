import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { getItems, deleteItem } from '../api'

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

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal Dialog Box State Engine
  const [dialog, setDialog] = useState({
    isOpen: false,
    title: '',
    message: '',
    confirmText: 'Confirm',
    onConfirm: null,
    isDanger: false
  });

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const data = await getItems();
      setItems(data);
    } catch (error) {
      console.error('Failed fetching data for dashboard view:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Triggers custom delete confirmation dialog
  const promptDelete = (id, itemTitle) => {
    setDialog({
      isOpen: true,
      title: 'Confirm Deletion',
      message: `Are you sure you want to permanently delete "${itemTitle}"? This action cannot be undone.`,
      confirmText: 'Delete Item',
      isDanger: true,
      onConfirm: async () => {
        try {
          const res = await deleteItem(id);
          // Trigger success confirmation box
          setDialog({
            isOpen: true,
            title: 'Success',
            message: res.message || "The item listing has been scrubbed from the database.",
            confirmText: 'Okay',
            isDanger: false,
            onConfirm: () => setDialog(prev => ({ ...prev, isOpen: false }))
          });
          fetchDashboardData();
        } catch (err) {
          setDialog({
            isOpen: true,
            title: 'Authorization Error',
            message: 'Could not remove the item. Your admin session token might be invalid.',
            confirmText: 'Close',
            isDanger: false,
            onConfirm: () => setDialog(prev => ({ ...prev, isOpen: false }))
          });
        }
      }
    });
  };

  const handleLogOut = () => {
    localStorage.removeItem('adminToken'); 
    navigate('/admin', { replace: true }); 
  }

  const totalReports = items.length;
  const lostCount = items.filter(i => i.status === 'Lost').length;
  const foundCount = items.filter(i => i.status === 'Found').length;

  return (
    <main className="w-full min-h-screen bg-[#fbf6ef] px-6 py-12 relative">
      
      {/* MODERN PORTAL DIALOG BOX */}
      {dialog.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2d1e13]/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md bg-white border border-[#c1a084] rounded-2xl p-6 shadow-xl transform scale-100 transition-all duration-200">
            <h3 className={`text-xl font-extrabold ${dialog.isDanger ? 'text-red-700' : 'text-[#2d1e13]'}`}>
              {dialog.title}
            </h3>
            <p className="mt-3 text-sm text-[#5c4a3d] leading-relaxed">
              {dialog.message}
            </p>
            
            <div className="mt-6 flex justify-end gap-3 text-sm font-bold">
              {/* Only show Cancel button if it's a structural confirmation step */}
              {dialog.title.includes('Confirm') && (
                <button 
                  onClick={() => setDialog(prev => ({ ...prev, isOpen: false }))}
                  className="px-4 py-2 rounded-md text-[#5c4a3d] hover:bg-[#fbf6ef] transition"
                >
                  Cancel
                </button>
              )}
              <button 
                onClick={dialog.onConfirm}
                className={`px-4 py-2 rounded-md transition text-white ${
                  dialog.isDanger 
                    ? 'bg-red-600 hover:bg-red-700' 
                    : 'bg-[#2d1e13] hover:bg-[#5c4a3d]'
                }`}
              >
                {dialog.confirmText}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-[#2d1e13]">Admin Dashboard</h1>
          <div className="mt-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <p className="text-[#5c4a3d]">
              Control panel for managing reports, users, and moderation guidelines.
            </p>
            <button 
              onClick={handleLogOut} 
              className="rounded-md bg-[#c1a084] px-4 py-2 text-sm font-bold text-[#2d1e13] hover:bg-[#eaddcf] transition whitespace-nowrap self-start sm:self-auto"
            >
              Log Out
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card title="Reports Metrics" subtitle="Real-time counts calculated from your database">
            <div className="mt-6 grid gap-3">
              {[
                { k: 'Total Database Entries', v: totalReports },
                { k: 'Active Lost Items', v: lostCount },
                { k: 'Active Found Items', v: foundCount }
              ].map((row) => (
                <div key={row.k} className="flex items-center justify-between rounded-xl border border-[#eaddcf] bg-[#f5efe9] p-4">
                  <span className="text-sm font-medium text-[#5c4a3d]">{row.k}</span>
                  <span className="text-sm font-bold text-[#2d1e13]">{row.v}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card title="Manage listings" subtitle="Moderate or remove live user listings">
            <div className="mt-6">
              <div className="overflow-x-auto max-h-72 overflow-y-auto">
                {loading ? (
                  <p className="text-sm text-[#5c4a3d] py-4">Fetching database tables...</p>
                ) : items.length === 0 ? (
                  <p className="text-sm text-gray-500 py-4">No active user items logged in database.</p>
                ) : (
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left text-[#5c4a3d]">
                        <th className="font-semibold py-3">Item</th>
                        <th className="font-semibold py-3">Status</th>
                        <th className="font-semibold py-3 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((r) => (
                        <tr key={r.id} className="border-t border-[#eaddcf]">
                          <td className="py-4 text-[#2d1e13] font-semibold pr-2 max-w-[180px] truncate">
                            {r.title}
                          </td>
                          <td className="py-4">
                            <span className={`px-2 py-0.5 text-xs font-bold rounded-full ${
                              r.status === 'Found' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
                            }`}>
                              {r.status}
                            </span>
                          </td>
                          <td className="py-4 text-right">
                            <button 
                              onClick={() => promptDelete(r.id, r.title)}
                              className="rounded-md border border-red-300 bg-red-50 hover:bg-red-100 px-3 py-1.5 text-xs font-bold text-red-700 transition"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </Card>

          <Card title="Users" subtitle="Active account metrics">
            <div className="mt-6 grid gap-3">
              {['Members', 'Moderators', 'Suspended'].map((t, idx) => (
                <div key={t} className="rounded-xl border border-[#eaddcf] bg-[#f5efe9] p-4 flex items-center justify-between">
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

export default AdminDashboard