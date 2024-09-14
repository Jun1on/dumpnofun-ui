"use client";

import React from "react";
import Link from "next/link";

export default function Header() {
  return (
    <div className="w-full fixed top-0 z-10 h-16 flex flex-row justify-between items-center px-5 bg-slate-600">
      <div className="flex flex-row items-center">
        <Link href="/" legacyBehavior>
          <a>
            <img src="/logo.png" alt="Logo" className="h-10 w-auto" />
          </a>
        </Link>
        <h1 className="text-white md:text-2xl p-5">Dump No Fun</h1>
      </div>
      <w3m-button />
    </div>
  );
}
