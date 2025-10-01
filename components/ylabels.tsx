type Props = {
    currentMultiplier: number;
    timer5: number;
  };

export default function YLabels({ currentMultiplier, timer5 }: Props) {
    return (
      <>
     <span
      style={{
        top: "180px", // Below multiplier to avoid overlap
        left: "50%",
        transform: "translateX(-50%)",
        display: "block",
        position: "absolute",
        color:
          currentMultiplier > 5
            ? "red"
            : currentMultiplier > 2
            ? "yellow"
            : "white",
        fontSize: "1.5rem",
        zIndex: 10, // High z-index to ensure visibility
      }}
    >
      {timer5.toFixed(1)}s
    </span>
       
      </>
    );
  }