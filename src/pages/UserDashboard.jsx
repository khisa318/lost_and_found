import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getItems } from '../api';

const UserDashboard = () => {
  const navigate = useNavigate();
  const [myItems, setMyItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const username = localStorage.getItem('username') || 'User';

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const data = await getItems();
        setMyItems(data);
      } catch (err) {
        console.error("Session expired or invalid token", err);
        localStorage.removeItem('userToken');
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('username');
    navigate('/');
  };

  return (
    <main className="w-full min-h-screen bg-[#fbf6ef] px-6 py-12">
      <div className="mx-auto max-w-4xl">
        
        {/* Welcome Header */}
        <div className="border-b border-[#c1a084]/40 pb-6 mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-[#2d1e13]">Welcome back, {username}</h1>
            <p className="text-sm text-[#5c4a3d] mt-1">Track the processing state of items you have submitted.</p>
          </div>
          <button 
            onClick={handleLogout}
            className="px-4 py-2 border border-[#c1a084] text-sm font-bold text-[#2d1e13] rounded-md bg-white hover:bg-[#eaddcf] transition"
          >
            Sign Out
          </button>
        </div>

        {/* Listings Display Grid */}
        <h2 className="text-xl font-bold text-[#2d1e13] mb-4">My Submitted Reports</h2>
        
        {loading ? (
          <p className="text-sm text-[#5c4a3d]">Loading your history records...</p>
        ) : myItems.length === 0 ? (
          <div className="bg-white border border-[#c1a084]/30 rounded-2xl p-8 text-center shadow-sm">
            <p className="text-[#2d1e13] font-semibold">You haven't reported any items yet.</p>
            <Link to="/items" className="mt-3 inline-block bg-[#2d1e13] text-white px-4 py-2 rounded-md text-sm font-bold">
              Report an Item
            </Link>
          </div>
        ) : (
          <div className="grid gap-4">
            {myItems.map((item) => (
              <div key={item.id} className="bg-white border border-[#c1a084]/30 rounded-xl p-5 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-bold text-lg text-[#2d1e13]">{item.title}</h3>
                  <p className="text-xs text-[#c1a084] font-semibold uppercase tracking-wider">{item.category}</p>
                  <p className="text-sm text-[#5c4a3d] mt-1 max-w-xl truncate">{item.description}</p>
                </div>
                <div className="flex sm:flex-col items-start sm:items-end justify-between sm:justify-center gap-2">
                  <span className={`px-2.5 py-1 text-xs font-bold rounded-full ${
                    item.status === 'Found' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {item.status}
                  </span>
                  <span className="text-xs text-[#5c4a3d]">Logged: {item.date}</span>
                </div>
              </div>
            ))}
          </div>
        )}
        
      </div>
    </main>
  );
};

export default UserDashboard;