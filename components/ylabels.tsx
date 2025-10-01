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
      //  transform: "translateX(-50%)",
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
    
    <span>
      {
  timer5 > 10.00 && timer5 < 10000.00 && (
  <ul style={{listStyle: "none", padding: 0, margin: 0, display: 'inline-block', position: 'absolute', zIndex: 11,}}>
   <li style={{marginRight: "5px"}}>Item 1</li>
    <li style={{marginRight: "5px"}}>Item 2</li>
    <li style={{marginRight: "5px"}}>Item 3</li>
    <li style={{marginRight: "5px"}}>Item 4</li>
    <li style={{marginRight: "5px"}}>Item 5</li>
    <li style={{marginRight: "5px"}}>Item 6</li>
    <li style={{marginRight: "5px"}}>Item 7</li>
    <li style={{marginRight: "5px"}}>Item 8</li>
    <li style={{marginRight: "5px"}}>Item 9</li>
    <li style={{marginRight: "5px"}}>Item 10</li>
  </ul>

)
}
</span>


    </span>
       {console.log(timer5+ "timer5 this is it dude")}
      </>
    );
  }