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
      width: "100",
        position: "absolute",
        fontSize: "1.5rem",
        zIndex: 10, // High z-index to ensure visibility
      }}
    >
    
    
      {
  currentMultiplier > 1.00 && currentMultiplier < 2.00 && (

   
   
  <ul style={{listStyle: 'none',  padding: 0, margin: 0, display: 'flex', gap: 5, position: 'absolute', zIndex: 11,}}>
   <li style={{marginRight: "5px"}}>1</li>
    <li style={{marginRight: "5px"}}>2</li>
    <li style={{marginRight: "5px"}}>3</li>
    <li style={{marginRight: "5px"}}>4</li>
    <li style={{marginRight: "5px"}}>5</li>
    <li style={{marginRight: "5px"}}>6</li>
    <li style={{marginRight: "5px"}}>7</li>
    <li style={{marginRight: "5px"}}>8</li>
    <li style={{marginRight: "5px"}}>9</li>
    <li style={{marginRight: "5px"}}>10</li>
  </ul>

)
}
{
  currentMultiplier > 2.01 && currentMultiplier < 4.00 && (
    <ul style={{listStyle: 'none',  padding: 0, margin: 0, display: 'flex', gap: 5, position: 'absolute', zIndex: 11,}}>
   <li style={{marginRight: "5px"}}>2</li>
    <li style={{marginRight: "5px"}}>4</li>
    <li style={{marginRight: "5px"}}>6</li>
    <li style={{marginRight: "5px"}}>8</li>
    <li style={{marginRight: "5px"}}>10</li>
    <li style={{marginRight: "5px"}}>12</li>
    <li style={{marginRight: "5px"}}>14</li>
    <li style={{marginRight: "5px"}}>16</li>
    <li style={{marginRight: "5px"}}>18</li>
    <li style={{marginRight: "5px"}}>20</li>
  </ul>

)
}{
  currentMultiplier > 4.01 && currentMultiplier < 8.00 && (
    <ul style={{listStyle: 'none',  padding: 0, margin: 0, display: 'flex', gap: 5, position: 'absolute', zIndex: 11,}}>
   <li style={{marginRight: "5px"}}>3</li>
    <li style={{marginRight: "5px"}}>6</li>
    <li style={{marginRight: "5px"}}>9</li>
    <li style={{marginRight: "5px"}}>12</li>
    <li style={{marginRight: "5px"}}>15</li>
    <li style={{marginRight: "5px"}}>18</li>
    <li style={{marginRight: "5px"}}>21</li>
    <li style={{marginRight: "5px"}}>24</li>
    <li style={{marginRight: "5px"}}>27</li>
    <li style={{marginRight: "5px"}}>30</li>
  </ul>

)
}
{
  currentMultiplier > 8.01 && currentMultiplier < 16.00 && (
    <ul style={{listStyle: 'none',  padding: 0, margin: 0, display: 'flex', gap: 5, position: 'absolute', zIndex: 11,}}>
    <li style={{marginRight: "5px"}}>4</li>
    <li style={{marginRight: "5px"}}>8</li>
    <li style={{marginRight: "5px"}}>12</li>
    <li style={{marginRight: "5px"}}>16</li>
    <li style={{marginRight: "5px"}}>20</li>
    <li style={{marginRight: "5px"}}>24</li>
    <li style={{marginRight: "5px"}}>28</li>
    <li style={{marginRight: "5px"}}>32</li>
    <li style={{marginRight: "5px"}}>36</li>
    <li style={{marginRight: "5px"}}>40</li>
  </ul>

)
}
{
  currentMultiplier > 16.01 && currentMultiplier < 32.00 && (
    <ul style={{listStyle: 'none',  padding: 0, margin: 0, display: 'flex', gap: 5, position: 'absolute', zIndex: 11,}}>
   <li style={{marginRight: "5px"}}>5</li>
    <li style={{marginRight: "5px"}}>10</li>
    <li style={{marginRight: "5px"}}>15</li>
    <li style={{marginRight: "5px"}}>20</li>
    <li style={{marginRight: "5px"}}>25</li>
    <li style={{marginRight: "5px"}}>30</li>
    <li style={{marginRight: "5px"}}>35</li>
    <li style={{marginRight: "5px"}}>40</li>
    <li style={{marginRight: "5px"}}>45</li>
    <li style={{marginRight: "5px"}}>50</li>
  </ul>

)
}
{
  currentMultiplier > 32.01 && currentMultiplier < 64.00 && (
    <ul style={{listStyle: 'none',  padding: 0, margin: 0, display: 'flex', gap: 5, position: 'absolute', zIndex: 11,}}>
     <li style={{marginRight: "5px"}}>6</li>
    <li style={{marginRight: "5px"}}>12</li>
    <li style={{marginRight: "5px"}}>18</li>
    <li style={{marginRight: "5px"}}>24</li>
    <li style={{marginRight: "5px"}}>30</li>
    <li style={{marginRight: "5px"}}>36</li>
    <li style={{marginRight: "5px"}}>42</li>
    <li style={{marginRight: "5px"}}>48</li>
    <li style={{marginRight: "5px"}}>54</li>
    <li style={{marginRight: "5px"}}>60</li>
  </ul>

)
}
{
  currentMultiplier > 64.01 && currentMultiplier < 128.00 && (
    <ul style={{listStyle: 'none',  padding: 0, margin: 0, display: 'flex', gap: 5, position: 'absolute', zIndex: 11,}}>
    <li style={{marginRight: "5px"}}>7</li>
    <li style={{marginRight: "5px"}}>14</li>
    <li style={{marginRight: "5px"}}>21</li>
    <li style={{marginRight: "5px"}}>28</li>
    <li style={{marginRight: "5px"}}>35</li>
    <li style={{marginRight: "5px"}}>42</li>
    <li style={{marginRight: "5px"}}>49</li>
    <li style={{marginRight: "5px"}}>56</li>
    <li style={{marginRight: "5px"}}>63</li>
    <li style={{marginRight: "5px"}}>70</li>
  </ul>

)
}
</span>


    
       {console.log(timer5+ "timer5 this is it dude")}
      </>
    );
  }