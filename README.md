# 📈 Professional Trading Chart Component

A high-performance, responsive financial charting application built with **React 19**, **Vite**, and **Lightweight Charts**. This project was developed as part of a technical internship exercise to demonstrate advanced DOM manipulation, real-time data visualization, and technical analysis integration.

## 🚀 Key Features

* **Dynamic Candlestick Rendering**: Utilizes a Canvas-based engine for buttery-smooth zooming and panning.
* **Technical Indicators**: Integrated support for:
    * **SMA** (Simple Moving Average)
    * **EMA** (Exponential Moving Average)
    * **VWAP** (Volume Weighted Average Price)
    * **Bollinger Bands** (Upper, Lower, and Basis lines)
* **Responsive Design**: Automatically recalibrates `clientWidth` on window resize using optimized event listeners.
* **Interactive HUD**: Real-time Heads-Up Display showing Open, High, Low, and Close (OHLC) values on crosshair hover.
* **Smart Cleanup**: Implements strict memory management to prevent memory leaks and duplicate chart instances in React Strict Mode.

## 🛠️ Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **React 19** | UI Framework & Component Logic |
| **Lightweight Charts** | High-performance Canvas Charting |
| **TechnicalIndicators** | Financial math & formula logic |
| **Tailwind CSS** | Modern Slate-themed styling |
| **Vite** | Lightning-fast development build tool |

## 📂 Project Structure

* `src/components/TradingChart.jsx` - The core charting engine and UI.
* `src/utils/indicators.js` - Technical analysis logic and data mapping.
* `src/utils/generateMockTradingData.js` - Simulated market data generator with volatility logic.

## ⚙️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone [https://github.com/nitesh-chaudhary8740/Netbeans-Day2-TradingChart.git](https://github.com/nitesh-chaudhary8740/Netbeans-Day2-TradingChart.git)
