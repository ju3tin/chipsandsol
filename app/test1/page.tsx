import styles from "./page.module.css";
import BuyChippy from "../../components/buychippy";
import Script from "next/script";
import Game from '../../components/Game';
import CrashList from '../../components/CrashList';
import GameControls from '../../components/GameControls';
import BetList from '../../components/BetList';

import GameLayout from '../../components/GameLayout';

export default function Home() {
	return (
		<main className={styles.main}>
 <div className="p-6 max-w-md mx-auto border rounded-2xl shadow-lg space-y-4">
   
<button id="connectButton">Connect Wallet</button><br />
    <p id="walletAddress"></p>
    
    <label htmlFor="amount">Amount of SOL to spend:</label>
    <input type="number" id="amount" step="0.01" min="0.01" value="0.1" />
    
    <button id="buyButton" disabled>Buy $CHIPPY</button>
    <p id="status"></p>
</div>
    <Script src="https://cdn.jsdelivr.net/npm/@solana/web3.js@latest/lib/index.iife.min.js" strategy="beforeInteractive" />
			<Script src="/buychippy.js" strategy="beforeInteractive" />
	{/*			<BuyChippy />
		<GameLayout>
			<CrashList />
				<Game />
			<GameControls />
				<BetList />
			</GameLayout>*/}
		</main>
	);
}