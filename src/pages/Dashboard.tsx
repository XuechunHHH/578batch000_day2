import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { LogOut } from 'lucide-react';
import { Background } from '../components/Background';
import { CryptoCard } from '../components/CryptoCard';
import { MarketStatsCard } from '../components/MarketStatsCard';
import { useAuthStore } from '../store/authStore';
import type { CryptoData, MarketStats } from '../types/crypto';

export const Dashboard = () => {
  const { isAuthenticated, username, logout } = useAuthStore();
  const [cryptos, setCryptos] = useState<CryptoData[]>([]);
  const [marketStats, setMarketStats] = useState<MarketStats>({
    total_market_cap: 0,
    total_volume: 0,
    btc_dominance: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(null);
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/crypto`);
        setCryptos(data.cryptos);
        setMarketStats(data.marketStats);
      } catch (err) {
        setError('Failed to fetch crypto data. Please try again later.');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    // Poll every 2 minutes
    const interval = setInterval(fetchData, 120000);
    return () => clearInterval(interval);
  }, []);

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-[#030012] text-white">
      <Background />
      <div className="cyber-grid relative">
        <div className="container mx-auto px-4 py-8">
          <header className="flex justify-between items-center mb-12">
            <div>
              <motion.h1 
                className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-[#00fff2]"
                animate={{ 
                  textShadow: [
                    "0 0 20px rgba(0,236,255,0.5)",
                    "0 0 40px rgba(0,236,255,0.5)",
                    "0 0 20px rgba(0,236,255,0.5)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                CryptoBoard
              </motion.h1>
              <p className="text-[#00fff2]/70">Welcome back, {username}</p>
            </div>
            <button
              onClick={logout}
              className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500/20 transition-colors border border-red-500/20"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </header>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00fff2]"></div>
            </div>
          ) : error ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-center text-red-500"
            >
              {error}
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              <div className="lg:col-span-2 xl:col-span-3">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {cryptos.map((crypto, index) => (
                    <CryptoCard key={crypto.id} crypto={crypto} index={index} />
                  ))}
                </div>
              </div>
              <div>
                <MarketStatsCard stats={marketStats} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};