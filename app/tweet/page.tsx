"use client";

import { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react"
import { PublicKey, SystemProgram } from "@solana/web3.js"
import { useWalletModal } from "@solana/wallet-adapter-react-ui"
import { getWalletAddress } from "../../store/walletStore";
import { useWalletStore } from "../../store/walletstore1";


export default function TweetVerificationForm() {
  const [tweetText, setTweetText] = useState("");
  const [tweetUrl, setTweetUrl] = useState("");
  const [status, setStatus] = useState("");
  const walletAddress = useWalletStore((state) => state.walletAddress);

  const generateTweet = () => {
    // Open Twitter composer with pre-filled text
    const twitterIntentUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
    window.open(twitterIntentUrl, "_blank");
  };

  const verifyTweet = async () => {
    if (!tweetUrl) {
      setStatus("Please paste your tweet URL.");
      return;
    }
     try {
      // In production you'd fetch & verify this with a serverless function or backend,
      // since CORS may block direct fetches from frontend
      setStatus(`✅ Tweet submitted: ${tweetUrl}`);
    } catch (error: any) {
      setStatus("❌ Could not verify tweet.");
    }
  };
  //const walletAddress = getWalletAddress();
  //const walletAddress1 = useWalletStore((state) => state.walletAddress);

  if (!walletAddress) return <p>No wallet connected</p>;

  //const { publicKey, connected } = useWallet()
  return (
    <>
     {walletAddress}  
  
    <div className="max-w-lg mx-auto p-6 space-y-4 border rounded-xl shadow-lg">
      <h2 className="text-xl font-bold">Step 1: Write your tweet</h2>
      <textarea
        value={tweetText}
        onChange={(e) => setTweetText(e.target.value)}
        placeholder="Write your tweet here..."
        className="w-full border rounded-lg p-2"
        rows={3}
      />
      <button
        onClick={generateTweet}
        disabled={!tweetText}
        className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-400"
      >
        Post on Twitter
      </button>

      <h2 className="text-xl font-bold">Step 2: Paste your tweet link</h2>
      <input
        type="url"
        value={tweetUrl}
        onChange={(e) => setTweetUrl(e.target.value)}
        placeholder="Paste your tweet URL here"
        className="w-full border rounded-lg p-2"
      />
      <button
        onClick={verifyTweet}
        disabled={!tweetUrl}
        className="w-full px-4 py-2 bg-green-600 text-white rounded-lg disabled:bg-gray-400"
      >
        Submit Tweet
      </button>

      {status && <p className="text-sm text-gray-800">{status}</p>}
    </div>
    </>
  );
}
