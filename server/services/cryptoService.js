import axios from 'axios';
import NodeCache from 'node-cache';

const cache = new NodeCache({ stdTTL: 120 }); // 2 minutes cache
const COINGECKO_API = 'https://api.coingecko.com/api/v3';

const CRYPTO_IDS = [
  'bitcoin',
  'ethereum',
  'binancecoin',
  'ripple',
  'solana',
  'cardano',
  'dogecoin',
  'polkadot',
  'matic-network',
  'chainlink'
];

export async function fetchCryptoData() {
  const cachedData = cache.get('cryptoData');
  if (cachedData) return cachedData;

  try {
    const response = await axios.get(`${COINGECKO_API}/coins/markets`, {
      params: {
        vs_currency: 'usd',
        ids: CRYPTO_IDS.join(','),
        order: 'market_cap_desc',
        per_page: 10,
        page: 1,
        sparkline: false,
        price_change_percentage: '1h'
      }
    });

    const cryptos = response.data.map(coin => ({
      id: coin.id,
      symbol: coin.symbol,
      name: coin.name,
      image: coin.image,
      current_price: coin.current_price,
      market_cap: coin.market_cap,
      total_volume: coin.total_volume,
      price_change_percentage_1h_in_currency: coin.price_change_percentage_1h_in_currency
    }));

    // Get global market data
    const globalData = await axios.get(`${COINGECKO_API}/global`);
    const { data } = globalData.data;

    const result = {
      cryptos,
      marketStats: {
        total_market_cap: data.total_market_cap.usd,
        total_volume: data.total_volume.usd,
        btc_dominance: data.market_cap_percentage.btc
      }
    };

    cache.set('cryptoData', result);
    return result;
  } catch (error) {
    console.error('Error in cryptoService:', error);
    throw new Error('Failed to fetch crypto data');
  }
}