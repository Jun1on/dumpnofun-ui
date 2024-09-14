// app/token/[ticker]/page.tsx
"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";

const TokenPage = () => {
  const { ticker } = useParams();
  const [priceData, setPriceData] = useState<number[]>([]);
  const [labels, setLabels] = useState<string[]>([]);
  const [currentPrice, setCurrentPrice] = useState<number>(0);
  const [initialPrice, setInitialPrice] = useState<number>(0);
  const [liquidityLockProgress, setLiquidityLockProgress] = useState<number>(0);
  const [transactions, setTransactions] = useState<
    { type: string; amount: number; price: number; time: string }[]
  >([]);

  // Constants for simulation
  const SIMULATION_DURATION = 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds
  const LOCK_START_DATE = Date.now();
  const LOCK_END_DATE = LOCK_START_DATE + SIMULATION_DURATION;
  const PRICE_UPDATE_INTERVAL = 1000;

  useEffect(() => {
    // Initialize data
    const initialPrice = generateInitialPrice();
    setInitialPrice(initialPrice);
    setCurrentPrice(initialPrice);
    setPriceData([initialPrice]);
    setLabels([new Date().toLocaleTimeString()]);
    setTransactions([]);

    // Start price simulation
    const priceInterval = setInterval(() => {
      if (Math.random() > 0.5) {
        updatePrice();
      }
    }, PRICE_UPDATE_INTERVAL);

    // Update liquidity lock progress
    const lockInterval = setInterval(() => {
      updateLiquidityLockProgress();
    }, 60000); // Update every minute

    return () => {
      clearInterval(priceInterval);
      clearInterval(lockInterval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const generateInitialPrice = () => {
    // Generate a random initial price between $0.001 and $0.01
    return parseFloat((Math.random() * 0.009 + 0.001).toFixed(6));
  };

  const updatePrice = () => {
    setPriceData((prevData) => {
      const lastPrice = prevData[prevData.length - 1] || initialPrice;
      const newPrice = generateNewPrice(lastPrice);
      setCurrentPrice(newPrice);

      // Update labels
      setLabels((prevLabels) => [
        ...prevLabels,
        new Date().toLocaleTimeString(),
      ]);

      // Simulate a transaction
      simulateTransaction(newPrice);

      return [...prevData, newPrice];
    });
  };

  const generateNewPrice = (lastPrice: number) => {
    // Simulate price increase with random fluctuations, ensuring it doesn't fall below initial price
    const priceChange = parseFloat(
      ((Math.random() * 0.005 - 0.001) * lastPrice).toFixed(6)
    );
    const newPrice = Math.max(initialPrice, lastPrice + priceChange);
    return parseFloat(newPrice.toFixed(6));
  };

  const updateLiquidityLockProgress = () => {
    const now = Date.now();
    const progress =
      ((now - LOCK_START_DATE) / (LOCK_END_DATE - LOCK_START_DATE)) * 100;
    setLiquidityLockProgress(Math.min(progress, 100));
  };

  const simulateTransaction = (price: number) => {
    const transactionType = Math.random() > 0.1 ? "Buy" : "Sell";
    const amount = parseFloat((Math.random() * 1000 + 100).toFixed(2));
    const time = new Date().toLocaleTimeString();

    setTransactions((prevTransactions) => [
      {
        type: transactionType,
        amount,
        price,
        time,
      },
      ...prevTransactions.slice(0, 9), // Keep only the latest 10 transactions
    ]);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>
        {ticker.charAt(0).toUpperCase() + ticker.slice(1).toLowerCase()} Token (
        {ticker.toUpperCase()})
      </h1>
      <p style={styles.price}>Current Price: ${currentPrice.toFixed(6)}</p>

      <div style={styles.chartContainer}></div>

      <div style={styles.liquidityLockContainer}>
        <p style={styles.liquidityText}>Liquidity Locked for 30 Days</p>
        <div style={styles.progressBarBackground}>
          <div
            style={{
              ...styles.progressBarFill,
              width: `${100}%`,
              backgroundColor: "gray",
            }}
          ></div>
        </div>
      </div>

      <div style={styles.transactionsContainer}>
        <h2 style={styles.subtitle}>Recent Transactions</h2>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Type</th>
              <th style={styles.th}>Amount</th>
              <th style={styles.th}>Price</th>
              <th style={styles.th}>Time</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx, index) => (
              <tr key={index}>
                <td
                  style={{
                    ...styles.td,
                    color: tx.type === "Buy" ? "#00FFA3" : "#FF5555",
                  }}
                >
                  {tx.type}
                </td>
                <td style={styles.td}>{tx.amount}</td>
                <td style={styles.td}>${tx.price.toFixed(6)}</td>
                <td style={styles.td}>{tx.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const formatTimeRemaining = (milliseconds: number) => {
  if (milliseconds <= 0) {
    return "Liquidity Unlocked";
  }
  const totalSeconds = Math.floor(milliseconds / 1000);
  const days = Math.floor(totalSeconds / (24 * 3600));
  const hours = Math.floor((totalSeconds % (24 * 3600)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${days}d ${hours}h ${minutes}m ${seconds}s`;
};

const styles = {
  container: {
    fontFamily: "'Inter', sans-serif",
    textAlign: "center" as const,
    color: "#fff",
    backgroundColor: "#121212",
    minHeight: "100vh",
    padding: "50px 20px",
  },
  title: {
    fontSize: "2.5rem",
    marginBottom: "10px",
    color: "#00FFA3",
  },
  price: {
    fontSize: "1.5rem",
    marginBottom: "20px",
  },
  chartContainer: {
    width: "100%",
    maxWidth: "800px",
    margin: "0 auto 40px",
  },
  liquidityLockContainer: {
    marginBottom: "40px",
  },
  liquidityText: {
    fontSize: "1.2rem",
    marginBottom: "10px",
  },
  progressBarBackground: {
    width: "80%",
    height: "20px",
    backgroundColor: "#2A2A2A",
    borderRadius: "10px",
    margin: "0 auto",
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#00FFA3",
  },
  transactionsContainer: {
    marginTop: "40px",
  },
  subtitle: {
    fontSize: "1.8rem",
    marginBottom: "20px",
  },
  table: {
    width: "80%",
    margin: "0 auto",
    borderCollapse: "collapse" as const,
  },
  th: {
    borderBottom: "1px solid #444",
    padding: "10px",
    fontSize: "1rem",
  },
  td: {
    padding: "10px",
    fontSize: "1rem",
  },
};

export default TokenPage;
