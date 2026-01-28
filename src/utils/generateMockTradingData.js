/**
 * Mock Trading Data Generator
 * Optimized for lightweight-charts v5.1.0
 */

const generateMockData = () => {
  const data = [];
  let currentPrice = 3445.00;
  // Use current Unix timestamp if you want "Live" looking data
  let currentTime = Math.floor(Date.now() / 1000) - (500 * 60); 

  for (let i = 0; i < 500; i++) {
    const volatility = (Math.random() - 0.5) * 10;
    const open = currentPrice;
    const close = open + volatility;
    const high = Math.max(open, close) + Math.random() * 5; //does these are responsible for wicked lines
    const low = Math.min(open, close) - Math.random() * 5;

    data.push({
      time: currentTime, // Must be seconds (Integer)
      open: Number(open.toFixed(2)),
      high: Number(high.toFixed(2)),
      low: Number(low.toFixed(2)),
      close: Number(close.toFixed(2)),
    });

    currentPrice = close;
    currentTime += 60; // 1-minute intervals
  }
  
  // Sort data by time to be 100% sure it's increasing (The library crashes if not)
  return data.sort((a, b) => a.time - b.time);
};

export const tradingData = generateMockData();