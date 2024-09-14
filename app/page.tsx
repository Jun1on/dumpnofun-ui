"use client";
import React from "react";
import Image from "next/image";

const Page = () => {
  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <h1 style={styles.title}>Dump No Fun 🚀</h1>
        <p style={styles.tagline}>Because dumping is no fun! 😂</p>
      </header>

      {/* Main content */}
      <main style={styles.main}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Image src="/wagmi.png" alt="WAGMI" width={400} height={300} />
        </div>
        <h2 style={styles.subtitle}>No Dumps, Only Fun!</h2>
        <p style={styles.paragraph}>
          Welcome to <strong>Dump No Fun</strong>, the ultimate{" "}
          <strong>Uniswap v4 hook interface</strong> that keeps the crypto game
          fair and fun!
        </p>
        <p style={styles.paragraph}>
          We create tokens and liquidity pools that are 100% legit—no scammy
          code, no rug pulls. Just pure, moon-bound potential!
        </p>
        <p style={styles.paragraph}>
          Lock in your capital and show the world you're in it for the long
          haul. Let's make crypto a better place together!
        </p>
        <button
          style={styles.button}
          onClick={() => (window.location.href = "/deploy")}
        >
          Get Started
        </button>
      </main>

      {/* Footer
      <footer style={styles.footer}>
        <p style={styles.footerText}>Join the movement. Say no to dumps! 🌊</p>
      </footer> */}
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "'Comic Sans MS', 'Comic Sans', cursive",
    textAlign: "center" as "center",
    color: "#fff",
    backgroundColor: "#0d0d0d",
    minHeight: "100vh",
    padding: "0 20px",
  },
  header: {
    padding: "20px 0",
    backgroundColor: "#1a1a1a",
  },
  title: {
    fontSize: "3rem",
  },
  tagline: {
    fontSize: "1.5rem",
    marginTop: "10px",
  },
  main: {
    padding: "40px 0",
  },
  subtitle: {
    fontSize: "2rem",
    marginBottom: "20px",
  },
  paragraph: {
    fontSize: "1.2rem",
    lineHeight: "1.6",
    marginBottom: "20px",
  },
  button: {
    fontSize: "1.5rem",
    padding: "15px 30px",
    backgroundColor: "#ff007a",
    color: "#fff",
    border: "none",
    borderRadius: "30px",
    cursor: "pointer",
  },
  footer: {
    padding: "20px 0",
    backgroundColor: "#1a1a1a",
    position: "fixed" as "fixed",
    width: "100%",
    bottom: 0,
  },
  footerText: {
    fontSize: "1rem",
  },
};

export default Page;
