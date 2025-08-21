"use client";

import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [tweets, setTweets] = useState<any[]>([]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();

    if (data.token) {
      setMessage("Login successful!");

      // Fetch all tweets from database
      const tweetsRes = await fetch("/api/tweets");
      const tweetsData = await tweetsRes.json();
      setTweets(tweetsData);
    } else {
      setMessage(data.error);
      setTweets([]);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        /><br/>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br/>
        <button type="submit">Login</button>
      </form>
      <p>{message}</p>

      {tweets.length > 0 && (
        <div style={{ marginTop: "2rem" }}>
          <h3>All Tweet Submissions:</h3>
          {tweets.map((tweet) => (
            <div key={tweet._id} style={{ border: "1px solid #ccc", margin: "0.5rem 0", padding: "0.5rem" }}>
              <p><strong>Wallet:</strong> {tweet.walletAddress}</p>
              <p><strong>Tweet:</strong> <a href={tweet.tweet} target="_blank">{tweet.tweet}</a></p>
              <p><strong>Date:</strong> {new Date(tweet.date).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
