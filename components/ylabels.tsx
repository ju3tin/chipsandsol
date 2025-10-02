type Props = {
    currentMultiplier: number;
    timer5: number;
  };
  
  export default function YLabels({ currentMultiplier, timer5 }: Props) {
    // Define arrays for each multiplier range with a time property (in seconds)
    const ranges = [
      { min: 1.0, max: 2.0, values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], time: 5 },
      { min: 2.01, max: 4.0, values: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20], time: 4 },
      { min: 4.01, max: 8.0, values: [3, 6, 9, 12, 15, 18, 21, 24, 27, 30], time: 3 },
      { min: 8.01, max: 16.0, values: [4, 8, 12, 16, 20, 24, 28, 32, 36, 40], time: 2.5 },
      { min: 16.01, max: 32.0, values: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50], time: 2 },
      { min: 32.01, max: 64.0, values: [6, 12, 18, 24, 30, 36, 42, 48, 54, 60], time: 1.5 },
      { min: 64.01, max: 128.0, values: [7, 14, 21, 28, 35, 42, 49, 56, 63, 70], time: 1 },
    ];
  
    // Find the matching range for currentMultiplier
    const currentRange = ranges.find(
      (range) => currentMultiplier > range.min && currentMultiplier < range.max
    );
  
    // Inverted spacing logic — more time = more spacing, less time = tighter
    const time = currentRange?.time || timer5;
    const baseSpacing = 30; // Max spacing when time is longest
    const invertedSpacing = baseSpacing / time; // e.g. 30/5 = 6px, 30/1 = 30px
  
    return (
      <>
        <span
          style={{
            top: "180px",
            left: "50%",
            transform: "translateX(-50%)",
            position: "absolute",
            fontSize: "1.5rem",
            zIndex: 10,
            animation: `moveHorizontally ${time}s linear infinite`,
          }}
        >
          <style>
            {`
              @keyframes moveHorizontally {
                0% { transform: translateX(-50%); }
                100% { transform: translateX(calc(50% + 100px)); }
              }
            `}
          </style>
  
          {currentRange && (
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                position: "absolute",
                zIndex: 11,
              }}
            >
              {currentRange.values.map((value, index) => (
                <li
                  key={value}
                  style={{
                    marginRight: `${invertedSpacing}px`,
                  }}
                >
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
  