"use client";

import { useEffect, useState } from "react";
import { useWalletStore } from "../../store/walletstore1";

export default function Page() {
  const walletAddress = useWalletStore((state) => state.walletAddress);

  const [balance, setBalance] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Helius config
  const API_URL = "https://mainnet.helius-rpc.com";
  const API_KEY = "4859defa-46ae-4d87-abe4-1355598c6d76";

  // Token mint
  const TOKEN_MINT = "Bz7Nx1F3Mti1BVS7ZAVDLSKGEaejufxvX2DPdjpf8PqT";

  useEffect(() => {
    const fetchBalance = async () => {
      if (!walletAddress) return;

      setLoading(true);
      setError(null);

      try {
        // Step 1: find token accounts for this wallet & token mint
        const res = await fetch(`${API_URL}/?api-key=${API_KEY}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            jsonrpc: "2.0",
            id: "1",
            method: "getTokenAccountsByOwner",
            params: [
              walletAddress,
              { mint: TOKEN_MINT },
              { encoding: "jsonParsed" },
            ],
          }),
        });

        const data = await res.json();
        const accounts = data.result?.value || [];

        if (accounts.length === 0) {
          setBalance(0);
          return;
        }

        // Step 2: check balance of the first token account
        const tokenAccount = accounts[0].pubkey;

        const balRes = await fetch(`${API_URL}/?api-key=${API_KEY}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            jsonrpc: "2.0",
            id: "1",
            method: "getTokenAccountBalance",
            params: [tokenAccount],
          }),
        });

        const balData = await balRes.json();
        const value = balData.result?.value;

        setBalance(value?.uiAmount ?? 0); // store as number
      } catch (err: any) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBalance();
  }, [walletAddress]);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Token Balance</h1>

      {!walletAddress && (
        <p className="text-gray-500">No wallet connected yet...</p>
      )}

      {walletAddress && loading && <p>Loading...</p>}
      {walletAddress && error && (
        <p className="text-red-500">Error: {error}</p>
      )}

      {walletAddress && !loading && !error && balance !== null && (
        <div>
          <p style={{display:'none'}}>
            Wallet <span className="font-mono">{walletAddress}</span> has{" "}
            <strong>{balance}</strong> of token{" "}
            <span className="font-mono">{TOKEN_MINT}</span>
          </p>
          {balance}

          {balance < 100 ? (
            <p className="text-red-600 font-semibold mt-2">
              ⚠️ Balance is below 100!
            </p>
          ) : (
            <p className="text-green-600 font-semibold mt-2">
              ✅ Balance is 100 or more.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
