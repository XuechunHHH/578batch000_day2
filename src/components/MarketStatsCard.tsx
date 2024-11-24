import { motion } from 'framer-motion';
import { LineChart, Bitcoin, Wallet } from 'lucide-react';
import type { MarketStats } from '../types/crypto';

interface MarketStatsCardProps {
  stats: MarketStats;
}

export const MarketStatsCard = ({ stats }: MarketStatsCardProps) => {
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 2,
      notation: 'compact',
    }).format(num || 0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-[#030012]/80 backdrop-blur-xl border border-[#00fff2]/20 rounded-xl p-6 hover:border-[#00fff2]/50 transition-all hover:shadow-[0_0_20px_rgba(0,236,255,0.1)]"
    >
      <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-[#00fff2] mb-6">Market Stats</h3>
      <div className="grid gap-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-[#00fff2]/5 rounded-lg border border-[#00fff2]/20">
            <LineChart className="w-6 h-6 text-[#00fff2]" />
          </div>
          <div>
            <p className="text-[#00fff2]/70">Global Market Cap</p>
            <p className="text-white font-medium">{formatNumber(stats?.total_market_cap || 0)}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="p-3 bg-[#00fff2]/5 rounded-lg border border-[#00fff2]/20">
            <Wallet className="w-6 h-6 text-[#00fff2]" />
          </div>
          <div>
            <p className="text-[#00fff2]/70">24h Volume</p>
            <p className="text-white font-medium">{formatNumber(stats?.total_volume || 0)}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="p-3 bg-[#00fff2]/5 rounded-lg border border-[#00fff2]/20">
            <Bitcoin className="w-6 h-6 text-[#00fff2]" />
          </div>
          <div>
            <p className="text-[#00fff2]/70">BTC Dominance</p>
            <p className="text-white font-medium">{(stats?.btc_dominance || 0).toFixed(2)}%</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};