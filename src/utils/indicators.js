import { 
    SMA, EMA, RSI, BollingerBands, VWAP, ATR, ADX, 
    MACD, AwesomeOscillator, PSAR 
} from 'technicalindicators';

export const getIndicators = (tradingData) => {
    const prices = tradingData.map(d => d.close);
    const highs = tradingData.map(d => d.high);
    const lows = tradingData.map(d => d.low);
    const volumes = tradingData.map(d => d.volume || 0); // Fallback if volume is missing
    const times = tradingData.map(d => d.time);

    return {
        getSMA: (period = 20) => {
            const values = SMA.calculate({ period, values: prices });
            return values.map((val, index) => ({ time: times[index + (period - 1)], value: val }));
        },
        getEMA: (period = 20) => {
            const values = EMA.calculate({ period, values: prices });
            return values.map((val, index) => ({ time: times[index + (period - 1)], value: val }));
        },
        getVWAP: () => {
            // VWAP uses High, Low, Close, and Volume
            const values = VWAP.calculate({ high: highs, low: lows, close: prices, volume: volumes });
            return values.map((val, index) => ({ time: times[index], value: val }));
        },
        getBB: (period = 20, stdDev = 2) => {
            const values = BollingerBands.calculate({ period, stdDev, values: prices });
            const offset = period - 1;
            return {
                upper: values.map((val, index) => ({ time: times[index + offset], value: val.upper })),
                middle: values.map((val, index) => ({ time: times[index + offset], value: val.middle })),
                lower: values.map((val, index) => ({ time: times[index + offset], value: val.lower })),
            };
        },
        // Note: RSI/MACD/ATR/ADX usually need separate panes. 
        // We calculate them here so you have the data ready.
        getRSI: (period = 14) => {
            const values = RSI.calculate({ period, values: prices });
            return values.map((val, index) => ({ time: times[index + period], value: val }));
        }
    };
};