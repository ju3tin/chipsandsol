# Crash Game Fake API & GameStore3

This implementation provides a complete fake API for a crash game with data storage in GameStore3 using Zustand.

## Files Created

### 1. API Endpoint
- **`pages/api/crash/fake-api.ts`** - Main API endpoint with all crash game functionality

### 2. State Management
- **`store/gameStore3.ts`** - Zustand store for crash game state management

### 3. Utilities
- **`utils/crashApi.ts`** - API client and utility functions

### 4. Demo Component
- **`components/CrashGameDemo.tsx`** - Complete demo component showing usage

## API Endpoints

The fake API supports the following actions:

### Start Game
```
POST /api/crash/fake-api?action=start
```
Starts a new crash game with random crash point and fake players.

### Get Game Status
```
GET /api/crash/fake-api?action=status
```
Returns current game state including multiplier, players, and status.

### Crash Game
```
POST /api/crash/fake-api?action=crash
```
Manually crashes the current game.

### Place Bet
```
POST /api/crash/fake-api?action=place-bet
Body: { playerId: string, username: string, betAmount: number }
```
Places a bet for a player in the current game.

### Cash Out
```
POST /api/crash/fake-api?action=cash-out
Body: { playerId: string }
```
Cashes out a player's bet at current multiplier.

### Get History
```
GET /api/crash/fake-api?action=history&limit=10
```
Returns recent game history.

## GameStore3 Usage

```typescript
import { useGameStore3 } from '@/store/gameStore3';

function MyComponent() {
  const {
    currentGame,
    gameHistory,
    startGame,
    crashGame,
    placeBet,
    cashOut,
    fetchGameStatus,
    getTotalPlayers,
    getTotalBets,
    getActivePlayers,
  } = useGameStore3();

  // Start a new game
  const handleStart = async () => {
    await startGame();
  };

  // Place a bet
  const handleBet = async () => {
    await placeBet('player123', 'PlayerName', 100);
  };

  // Cash out
  const handleCashOut = async () => {
    await cashOut('player123');
  };

  return (
    <div>
      <p>Current Multiplier: {currentGame?.multiplier.toFixed(2)}x</p>
      <p>Total Players: {getTotalPlayers()}</p>
      <p>Total Bets: ${getTotalBets()}</p>
      
      <button onClick={handleStart}>Start Game</button>
      <button onClick={handleBet}>Place Bet</button>
      <button onClick={handleCashOut}>Cash Out</button>
    </div>
  );
}
```

## Features

### Fake API Features
- ✅ Random crash point generation (1.01x to 100x)
- ✅ Real-time multiplier updates
- ✅ Fake player generation with random bets
- ✅ Bet placement and cash-out functionality
- ✅ Game history tracking
- ✅ In-memory data storage

### GameStore3 Features
- ✅ Real-time state management with Zustand
- ✅ Automatic API polling during active games
- ✅ Type-safe interfaces for all game data
- ✅ Computed values (total players, bets, active players)
- ✅ Error handling for all API calls
- ✅ Game history management

### Demo Component Features
- ✅ Complete UI for testing all functionality
- ✅ Real-time game status display
- ✅ Player bet and cash-out controls
- ✅ Game statistics display
- ✅ Game history viewer
- ✅ Responsive design

## Game Logic

### Crash Point Generation
- 10% chance: 1.01x - 3x
- 20% chance: 1.01x - 6x  
- 30% chance: 1.01x - 11x
- 25% chance: 1.01x - 21x
- 15% chance: 1.01x - 81x

### Multiplier Updates
- Updates every 100ms
- Increments by 0.01x each update
- Stops when reaching crash point

### Player Simulation
- 5-25 fake players per game
- Random bet amounts ($10-$1010)
- 70% of players cash out before crash
- Profit/loss calculation

## Testing the Implementation

1. Import and use the `CrashGameDemo` component in any page
2. Start a game and watch the multiplier increase
3. Place bets and cash out to test player functionality
4. View game history and statistics
5. Test manual crash functionality

## Data Flow

1. **API Layer**: Handles all game logic and fake data generation
2. **Store Layer**: Manages state and provides reactive updates
3. **Component Layer**: Consumes store data and triggers actions
4. **Polling**: Automatic updates every 100ms during active games

The implementation provides a complete, working crash game system that can be easily integrated into your application.
