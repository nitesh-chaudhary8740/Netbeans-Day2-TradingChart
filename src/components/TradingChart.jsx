import React, { useEffect, useRef, useState } from 'react';
import { createChart, ColorType } from 'lightweight-charts';
import { tradingData } from '../utils/generateMockTradingData.js';
import { getIndicators } from '../utils/indicators.js';

const TradingChart = () => {
    const chartContainerRef = useRef(null);
    const chartRef = useRef(null);
    const [hoverData, setHoverData] = useState(null);
    const [selectedIndicator, setSelectedIndicator] = useState('none');

    useEffect(() => {
        if (!chartContainerRef.current) return;

        // 1. Cleanup
        chartContainerRef.current.innerHTML = '';

        // 2. Create Chart
        const chart = createChart(chartContainerRef.current, {
            width: chartContainerRef.current.clientWidth,
            height: 450,
            layout: {
                background: { type: ColorType.Solid, color: '#0f172a' },
                textColor: '#94a3b8',
            },
            grid: {
                vertLines: { color: '#1e293b' },
                horzLines: { color: '#1e293b' },
            },
            timeScale: { borderColor: '#334155', timeVisible: true },
        });

        // 3. Main Series
        const candlestickSeries = chart.addCandlestickSeries({
            upColor: '#22c55e',
            downColor: '#ef4444',
            borderVisible: false,
            wickUpColor: '#22c55e',
            wickDownColor: '#ef4444',
        });
        candlestickSeries.setData(tradingData);

        // 4. Indicator Logic
        const indicators = getIndicators(tradingData);

        if (selectedIndicator === 'SMA') {
            const line = chart.addLineSeries({ color: '#3b82f6', lineWidth: 2, title: 'SMA 20' });
            line.setData(indicators.getSMA());
        } 
        else if (selectedIndicator === 'EMA') {
            const line = chart.addLineSeries({ color: '#f59e0b', lineWidth: 2, title: 'EMA 20' });
            line.setData(indicators.getEMA());
        }
        else if (selectedIndicator === 'VWAP') {
            const line = chart.addLineSeries({ color: '#ec4899', lineWidth: 2, title: 'VWAP' });
            line.setData(indicators.getVWAP());
        }
        else if (selectedIndicator === 'BB') {
            const bb = indicators.getBB();
            // Upper Band
            chart.addLineSeries({ color: '#94a3b8', lineWidth: 1, lineStyle: 2 }).setData(bb.upper);
            // Lower Band
            chart.addLineSeries({ color: '#94a3b8', lineWidth: 1, lineStyle: 2 }).setData(bb.lower);
            // Middle Band (Basis)
            chart.addLineSeries({ color: '#6366f1', lineWidth: 1 }).setData(bb.middle);
        }

        chartRef.current = chart;

        // 5. Crosshair & Tooltip
        const handleCrosshairMove = (param) => {
            if (param.time && param.point) {
                const price = param.seriesData.get(candlestickSeries);
                setHoverData(price);
            } else {
                setHoverData(null);
            }
        };

        chart.subscribeCrosshairMove(handleCrosshairMove);

        // 6. Resize handler
        const handleResize = () => {
            if (chartRef.current) {
                chartRef.current.applyOptions({ width: chartContainerRef.current.clientWidth });
            }
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            chart.remove();
        };
    }, [selectedIndicator]);

    return (
        <div className="w-full bg-slate-950 p-6 rounded-3xl shadow-2xl border border-slate-800">
            <div className="mb-4 flex flex-wrap justify-between items-center gap-4">
                <div>
                    <h2 className="text-slate-200 font-bold text-xl">Reliance Industries</h2>
                    <select 
                        value={selectedIndicator}
                        onChange={(e) => setSelectedIndicator(e.target.value)}
                        className="mt-2 bg-slate-900 text-slate-400 text-xs border border-slate-700 rounded px-2 py-1 outline-none focus:ring-1 focus:ring-blue-500"
                    >
                        <option value="none">Select Indicator</option>
                        <option value="SMA">SMA (20)</option>
                        <option value="EMA">EMA (20)</option>
                        <option value="VWAP">VWAP</option>
                        <option value="BB">Bollinger Bands</option>
                    </select>
                </div>

                {hoverData && (
                    <div className="flex gap-3 font-mono text-[10px] sm:text-xs">
                        <span className="text-slate-500">O: <span className="text-slate-200">{hoverData.open}</span></span>
                        <span className="text-slate-500">H: <span className="text-slate-200">{hoverData.high}</span></span>
                        <span className="text-slate-500">L: <span className="text-slate-200">{hoverData.low}</span></span>
                        <span className="text-slate-500">C: <span className={hoverData.close >= hoverData.open ? 'text-green-400' : 'text-red-400'}>{hoverData.close}</span></span>
                    </div>
                )}
            </div>

            <div ref={chartContainerRef} className="w-full" />
        </div>
    );
};

export default TradingChart;