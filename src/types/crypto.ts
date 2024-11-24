export interface CryptoData {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  total_volume: number;
  price_change_percentage_1h_in_currency: number;
}

export interface MarketStats {
  total_market_cap: number;
  total_volume: number;
  btc_dominance: number;
}