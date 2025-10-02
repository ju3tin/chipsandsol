type Props = {
  currentMultiplier: number;
  timer5: number;
};

export default function YLabels({ currentMultiplier, timer5 }: Props) {
  // Define arrays for each multiplier range with a time property (in seconds)
  const ranges = [
      { min: 1.00, max: 2.00, values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], time: 5 },
      { min: 2.01, max: 4.00, values: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20], time: 4 },
      { min: 4.01, max: 8.00, values: [3, 6, 9, 12, 15, 18, 21, 24, 27, 30], time: 3 },
      { min: 8.01, max: 16.00, values: [4, 8, 12, 16, 20, 24, 28, 32, 36, 40], time: 2.5 },
      { min: 16.01, max: 32.00, values: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50], time: 2 },
      { min: 32.01, max: 64.00, values: [6, 12, 18, 24, 30, 36, 42, 48, 54, 60], time: 1.5 },
      { min: 64.01, max: 128.00, values: [7, 14, 21, 28, 35, 42, 49, 56, 63, 70], time: 1 },
  ];

  // Find the matching range for currentMultiplier
  const currentRange = ranges.find(
      (range) => currentMultiplier > range.min && currentMultiplier < range.max
  );

  return (
      <>
          <span
              style={{
                  top: "180px", // Below multiplier to avoid overlap
                  left: "50%", // Center horizontally
                  transform: "translateX(-50%)", // Initial centering
                  position: "absolute",
                  fontSize: "1.5rem",
                  zIndex: 10, // High z-index to ensure visibility
                  animation: `moveHorizontally ${currentRange?.time || timer5}s linear infinite`, // Use range time or fallback to timer5
              }}
          >
              <style>
                  {`
                      @keyframes moveHorizontally {
                          0% { transform: translateX(-50%); }
                          100% { transform: translateX(calc(50% + 100px)); } // Move 100px to the right
                      }
                  `}
              </style>
              {currentRange && (
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', gap: 5, position: 'absolute', zIndex: 11 }}>
                      {currentRange.values.map((value) => (
                          <li key={value} style={{ marginRight: "5px" }}>
                              {value}
                          </li>
                      ))}
                  </ul>
              )}
          </span>
          {console.log(timer5 + " timer5 this is it dude")}
      </>
  );
}