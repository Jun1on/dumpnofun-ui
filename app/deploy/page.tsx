// app/deploy/page.tsx
"use client";
import * as React from "react";
import { type BaseError, useWriteContract, useAccount } from "wagmi";
import { hookABI } from "@/contracts/hookABI";
import deployments from "@/contracts/deployments.json";
import { ethers } from "ethers";
import Confetti from "react-confetti";
import { useRouter } from "next/navigation";

export default function Deploy() {
  const { isConnected } = useAccount();
  const router = useRouter();
  const [transactionHash, setTransactionHash] = React.useState<string | null>(
    null
  );

  const { data, error, isPending, writeContract } = useWriteContract({
    address: deployments.hook as `0x${string}`,
    abi: hookABI,
    functionName: "deployPool",
    onSuccess(data) {
      setTransactionHash(data.hash);
    },
    onError(error) {
      console.error("Transaction Error:", error);
    },
  });

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!isConnected) {
      alert("Please connect your wallet!");
      return;
    }
    const formData = new FormData(e.target as HTMLFormElement);
    const name = formData.get("name") as string;
    const symbol = formData.get("symbol") as string;
    const decimals = Number(formData.get("decimals")) || 18;
    const totalSupplyInput = formData.get("totalSupply") as string;

    writeContract({
      address: deployments.hook,
      abi: hookABI,
      functionName: "deployPool",
      args: [
        {
          name: name,
          symbol: symbol,
          decimals: decimals,
          totalSupply: ethers.utils.parseUnits(totalSupplyInput, decimals),
        },
      ],
    });
  }

  return (
    <div style={styles.container}>
      {data && <Confetti />}
      <h1 style={styles.title}>🚀 Launch Your Token</h1>
      <p style={styles.subtitle}>Deploy a new token on the blockchain</p>
      <form onSubmit={submit} style={styles.form}>
        <input
          name="name"
          placeholder="Token Name"
          required
          style={styles.input}
        />
        <input
          name="symbol"
          placeholder="Symbol"
          required
          style={styles.input}
        />
        <input
          name="decimals"
          placeholder="Decimals"
          type="number"
          min="0"
          max="18"
          required
          style={styles.input}
        />
        <input
          name="totalSupply"
          placeholder="Total Supply"
          required
          style={styles.input}
        />
        <button
          disabled={isPending || false}
          type="submit"
          style={styles.button}
        >
          {isPending ? "Sending..." : false ? "Confirming..." : "Deploy 🚀"}
        </button>
        {transactionHash && (
          <div style={styles.txInfo}>
            <p>
              Transaction Hash:{" "}
              <a
                href={`https://sepolia.etherscan.io/tx/${transactionHash}`}
                target="_blank"
                rel="noopener noreferrer"
                style={styles.link}
              >
                {transactionHash.slice(0, 6)}...{transactionHash.slice(-4)}
              </a>
            </p>
          </div>
        )}
        {error && (
          <div style={styles.error}>
            Error: {error.shortMessage || error.message}
          </div>
        )}
      </form>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "'Inter', sans-serif",
    textAlign: "center" as const,
    color: "#fff",
    backgroundColor: "#121212",
    minHeight: "100vh",
    padding: "50px 20px",
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center" as const,
    justifyContent: "center" as const,
  },
  title: {
    fontSize: "3rem",
    marginBottom: "10px",
    color: "#00FFA3",
  },
  subtitle: {
    fontSize: "1.5rem",
    marginBottom: "30px",
    color: "#BBBBBB",
  },
  form: {
    width: "100%",
    maxWidth: "400px",
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center" as const,
    backgroundColor: "#1E1E1E",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
  },
  input: {
    width: "100%",
    padding: "15px",
    margin: "10px 0",
    fontSize: "1rem",
    borderRadius: "5px",
    border: "1px solid #333",
    backgroundColor: "#2A2A2A",
    color: "#fff",
    outline: "none",
  },
  button: {
    width: "100%",
    padding: "15px",
    fontSize: "1.2rem",
    backgroundColor: "#00FFA3",
    color: "#000",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "20px",
    transition: "background-color 0.3s ease",
  },
  txInfo: {
    marginTop: "20px",
    color: "#00FFA3",
  },
  error: {
    marginTop: "20px",
    color: "#FF5555",
  },
  link: {
    color: "#00FFA3",
    textDecoration: "underline",
  },
};
