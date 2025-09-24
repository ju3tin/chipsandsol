'use client';

import React, { useMemo, useEffect } from "react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  ConnectionProvider,
  WalletProvider,
  useWallet,
} from "@solana/wallet-adapter-react";
import {
  WalletModalProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { Wallet } from "lucide-react";
import { useWalletStore } from "../store/walletstore1";
import "@solana/wallet-adapter-react-ui/styles.css";

// Custom wallet button when disconnected
function CustomWalletButton({ onClick }: { onClick?: () => void }) {
  return (
    <WalletMultiButton
      style={{ fontSize: "14px" }}
      className="custom-wallet-button"
      onClick={onClick}
    >
      <Wallet className="w-5 h-5 mr-2" />
      Select Wallet
    </WalletMultiButton>
  );
}

// Wrapper that handles wallet connection logic and sidebar collapse
interface WalletButtonWrapperProps {
  onPress?: () => void; // Callback to collapse sidebar
}

function WalletButtonWrapper({ onPress }: WalletButtonWrapperProps) {
  const { connected, publicKey } = useWallet();
  const setWalletAddress = useWalletStore((state) => state.setWalletAddress);

  // Function to check if user exists and create if needed
  const checkAndCreateUser = async (walletAddress: string) => {
    try {
      const checkResponse = await fetch("/api/users/check-wallet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ walletAddress }),
      });

      const checkResult = await checkResponse.json();

      if (!checkResult.exists) {
        console.log("User not found, creating new user...");

        const websocketMessage = {
          action: "createuser",
          walletAddress,
          username: walletAddress,
        };

        // Send via WebSocket if available
        if (typeof window !== "undefined" && window.WebSocket) {
          try {
            const ws = new WebSocket(
              process.env.NEXT_PUBLIC_CRASH_SERVER || "ws://localhost:8080"
            );
            ws.onopen = () => {
              ws.send(JSON.stringify(websocketMessage));
              console.log("WebSocket message sent for user creation:", websocketMessage);
              ws.close();
            };
            ws.onerror = (error) => {
              console.error("WebSocket error:", error);
              createUserViaAPI(walletAddress);
            };
          } catch (wsError) {
            console.error("WebSocket connection failed, falling back to API:", wsError);
            createUserViaAPI(walletAddress);
          }
        } else {
          createUserViaAPI(walletAddress);
        }
      } else {
        console.log("User exists:", checkResult.user);
      }
    } catch (error) {
      console.error("Error checking/creating user:", error);
    }
  };

  // Fallback function to create user via API
  const createUserViaAPI = async (walletAddress: string) => {
    try {
      const createResponse = await fetch("/api/users/createuser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ walletAddress, username: walletAddress }),
      });

      const createResult = await createResponse.json();

      if (createResult.success) {
        console.log("User created successfully via API:", createResult.user);
      } else {
        console.error("Failed to create user via API:", createResult.error);
      }
    } catch (error) {
      console.error("Error creating user via API:", error);
    }
  };

  useEffect(() => {
    if (connected && publicKey) {
      const address = publicKey.toBase58();
      setWalletAddress(address);

      // Collapse sidebar when wallet connects
      if (onPress) onPress();

      // Check/create user
      checkAndCreateUser(address);
    } else {
      setWalletAddress(null);
    }
  }, [connected, publicKey, setWalletAddress, onPress]);

  // Pass onPress as onClick to both buttons
  return connected ? (
    <WalletMultiButton onClick={onPress} />
  ) : (
    <CustomWalletButton onClick={onPress} />
  );
}

// Main LoginButton component
interface LoginButtonProps {
  onPress?: () => void; // Pass down sidebar collapse function
}

function LoginButton({ onPress }: LoginButtonProps) {
  const network = "https://rpc.test.honeycombprotocol.com";
  const endpoint = useMemo(() => network, []);

  const wallets = useMemo(
    () => [new PhantomWalletAdapter(), new SolflareWalletAdapter()],
    []
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <WalletButtonWrapper onPress={onPress} />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default LoginButton;
