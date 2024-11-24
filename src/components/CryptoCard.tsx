import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';
import type { CryptoData } from '../types/crypto';

interface CryptoCardProps {
  crypto: CryptoData;
  index: number;
}

export const CryptoCard = ({ crypto, index }: CryptoCardProps) => {
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 2,
      notation: 'compact',
    }).format(num);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="bg-[#030012]/80 backdrop-blur-xl border border-[#00fff2]/20 rounded-xl p-6 hover:border-[#00fff2]/50 transition-all hover:shadow-[0_0_20px_rgba(0,236,255,0.1)]"
    >
      <div className="flex items-center gap-4 mb-4">
        <img src={crypto.image} alt={crypto.name} className="w-12 h-12" />
        <div>
          <h3 className="text-xl font-bold text-white">{crypto.name}</h3>
          <p className="text-[#00fff2]/70 uppercase">{crypto.symbol}</p>
        </div>
      </div>
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-[#00fff2]/70">Price</span>
          <span className="text-white font-medium">{formatNumber(crypto.current_price)}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[#00fff2]/70">Market Cap</span>
          <span className="text-white font-medium">{formatNumber(crypto.market_cap)}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[#00fff2]/70">24h Volume</span>
          <span className="text-white font-medium">{formatNumber(crypto.total_volume)}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[#00fff2]/70">1h Trend</span>
          <div className={`flex items-center gap-1 ${
            crypto.price_change_percentage_1h_in_currency >= 0 ? 'text-green-400' : 'text-red-400'
          }`}>
            {crypto.price_change_percentage_1h_in_currency >= 0 ? (
              <TrendingUp className="w-4 h-4" />
            ) : (
              <TrendingDown className="w-4 h-4" />
            )}
            <span className="font-medium">
              {Math.abs(crypto.price_change_percentage_1h_in_currency).toFixed(2)}%
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};