type Props = {
    currentMultiplier: number;
  };

export default function XLabels({ currentMultiplier }: Props) {
    return (
      <>
{
  currentMultiplier > 1 && currentMultiplier < 5 && (
    <span
      style={{
        top: "0px",
        left: "0px",
        position: 'absolute',
        zIndex: 11,
        display: 'inline-block'
      }}
    >
      <ul style={{ listStyle: 'none', marginLeft: 16, padding: 0 }}>
        <li style={{ marginBottom: '10px' }}>5x</li>
        <li style={{ marginBottom: '10px' }}>4x</li>
        <li style={{ marginBottom: '10px' }}>3x</li>
        <li style={{ marginBottom: '10px' }}>2x</li>
        <li style={{ marginBottom: '10px' }}>1x</li>
      </ul>
    </span>
  )
}
{
  currentMultiplier > 5.01 && currentMultiplier < 10 && (
    <span
      style={{
        top: "0px",
        left: "0px",
        position: 'absolute',
        zIndex: 11,
        display: 'inline-block'
      }}
    >
      <ul style={{ listStyle: 'none', marginLeft: 16, padding: 0 }}>
       
        <li style={{ marginBottom: '10px' }}>10x</li>
        <li style={{ marginBottom: '10px' }}>9x</li>
        <li style={{ marginBottom: '10px' }}>8x</li>
        <li style={{ marginBottom: '10px' }}>7x</li>
        <li style={{ marginBottom: '10px' }}>6x</li>
        <li style={{ marginBottom: '10px' }}>5x</li>
      </ul>
    </span>
  )
}
{
  currentMultiplier > 10.01 && currentMultiplier < 15 && (
    <span
      style={{
        top: "0px",
        left: "0px",
        position: 'absolute',
        zIndex: 11,
        display: 'inline-block'
      }}
    >
      <ul style={{ listStyle: 'none', marginLeft: 16, padding: 0 }}>
       
        <li style={{ marginBottom: '10px' }}>15x</li>
        <li style={{ marginBottom: '10px' }}>14x</li>
        <li style={{ marginBottom: '10px' }}>13x</li>
        <li style={{ marginBottom: '10px' }}>12x</li>
        <li style={{ marginBottom: '10px' }}>11x</li>
        <li style={{ marginBottom: '10px' }}>10x</li>
       
      </ul>
    </span>
  )
}
{
  currentMultiplier > 15.01 && currentMultiplier < 20 && (
    <span
      style={{
        top: "0px",
        left: "0px",
        position: 'absolute',
        zIndex: 11,
        display: 'inline-block'
      }}
    >
      <ul style={{ listStyle: 'none', marginLeft: 16, padding: 0 }}>
       
        <li style={{ marginBottom: '10px' }}>20x</li>
        <li style={{ marginBottom: '10px' }}>19x</li>
        <li style={{ marginBottom: '10px' }}>18x</li>
        <li style={{ marginBottom: '10px' }}>17x</li>
        <li style={{ marginBottom: '10px' }}>16x</li>
        <li style={{ marginBottom: '10px' }}>15x</li>
      </ul>
    </span>
  )
}
{
  currentMultiplier > 20.01 && currentMultiplier < 25 && (
    <span
      style={{
        top: "0px",
        left: "0px",
        position: 'absolute',
        zIndex: 11,
        display: 'inline-block'
      }}
    >
      <ul style={{ listStyle: 'none', marginLeft: 16, padding: 0 }}>
       
        <li style={{ marginBottom: '10px' }}>25x</li>
        <li style={{ marginBottom: '10px' }}>24x</li>
        <li style={{ marginBottom: '10px' }}>23x</li>
        <li style={{ marginBottom: '10px' }}>22x</li>
        <li style={{ marginBottom: '10px' }}>21x</li>
        <li style={{ marginBottom: '10px' }}>20x</li>
       
      </ul>
    </span>
  )
}
{
  currentMultiplier > 25.01 && currentMultiplier < 30 && (
    <span
      style={{
        top: "0px",
        left: "0px",
        position: 'absolute',
        zIndex: 11,
        display: 'inline-block'
      }}
    >
      <ul style={{ listStyle: 'none', marginLeft: 16, padding: 0 }}>
       
      <li style={{ marginBottom: '10px' }}>30x</li>
        <li style={{ marginBottom: '10px' }}>29x</li>
        <li style={{ marginBottom: '10px' }}>28x</li>
        <li style={{ marginBottom: '10px' }}>27x</li>
        <li style={{ marginBottom: '10px' }}>26x</li>
        <li style={{ marginBottom: '10px' }}>25x</li>
      </ul>
    </span>
  )
}
{
  currentMultiplier > 30.01 && currentMultiplier < 35 && (
    <span
      style={{
        top: "0px",
        left: "0px",
        position: 'absolute',
        zIndex: 11,
        display: 'inline-block'
      }}
    >
      <ul style={{ listStyle: 'none', marginLeft: 16, padding: 0 }}>
       
        <li style={{ marginBottom: '10px' }}>35x</li>
        <li style={{ marginBottom: '10px' }}>34x</li>
        <li style={{ marginBottom: '10px' }}>33x</li>
        <li style={{ marginBottom: '10px' }}>32x</li>
        <li style={{ marginBottom: '10px' }}>31x</li>
        <li style={{ marginBottom: '10px' }}>30x</li>
       
       
      </ul>
    </span>
  )
}
{
  currentMultiplier > 35.01 && currentMultiplier < 40 && (
    <span
      style={{
        top: "0px",
        left: "0px",
        position: 'absolute',
        zIndex: 11,
        display: 'inline-block'
      }}
    >
      <ul style={{ listStyle: 'none', marginLeft: 16, padding: 0 }}>
       
      <li style={{ marginBottom: '10px' }}>40x</li>
        <li style={{ marginBottom: '10px' }}>39x</li>
        <li style={{ marginBottom: '10px' }}>38x</li>
        <li style={{ marginBottom: '10px' }}>37x</li>
        <li style={{ marginBottom: '10px' }}>36x</li>
        <li style={{ marginBottom: '10px' }}>35x</li>
      </ul>
    </span>
  )
}
{
  currentMultiplier > 40.01 && currentMultiplier < 45 && (
    <span
      style={{
        top: "0px",
        left: "0px",
        position: 'absolute',
        zIndex: 11,
        display: 'inline-block'
      }}
    >
      <ul style={{ listStyle: 'none', marginLeft: 16, padding: 0 }}>
       
        <li style={{ marginBottom: '10px' }}>45x</li>
        <li style={{ marginBottom: '10px' }}>44x</li>
        <li style={{ marginBottom: '10px' }}>43x</li>
        <li style={{ marginBottom: '10px' }}>42x</li>
        <li style={{ marginBottom: '10px' }}>41x</li>
        <li style={{ marginBottom: '10px' }}>40x</li>
      </ul>
    </span>
  )
}
{
  currentMultiplier > 45.01 && currentMultiplier < 50 && (
    <span
      style={{
        top: "0px",
        left: "0px",
        position: 'absolute',
        zIndex: 11,
        display: 'inline-block'
      }}
    >
      <ul style={{ listStyle: 'none', marginLeft: 16, padding: 0 }}>
       
        <li style={{ marginBottom: '10px' }}>50x</li>
        <li style={{ marginBottom: '10px' }}>49x</li>
        <li style={{ marginBottom: '10px' }}>48x</li>
        <li style={{ marginBottom: '10px' }}>47x</li>
        <li style={{ marginBottom: '10px' }}>46x</li>
        <li style={{ marginBottom: '10px' }}>45x</li>
      </ul>
    </span>
  )
} 
{
  currentMultiplier > 50.01 && currentMultiplier < 55 && (
    <span
      style={{
        top: "0px",
        left: "0px",
        position: 'absolute',
        zIndex: 11,
        display: 'inline-block'
      }}
    >
      <ul style={{ listStyle: 'none', marginLeft: 16, padding: 0 }}>
        <li style={{ marginBottom: '10px' }}>55x</li>
        <li style={{ marginBottom: '10px' }}>54x</li>
        <li style={{ marginBottom: '10px' }}>53x</li>
        <li style={{ marginBottom: '10px' }}>52x</li>
        <li style={{ marginBottom: '10px' }}>51x</li>
        <li style={{ marginBottom: '10px' }}>50x</li>
      </ul>
    </span>
  )
}
{
  currentMultiplier > 55.01 && currentMultiplier < 60 && (
    <span
      style={{
        top: "0px",
        left: "0px",
        position: 'absolute',
        zIndex: 11,
        display: 'inline-block'
      }}
    >
      <ul style={{ listStyle: 'none', marginLeft: 16, padding: 0 }}>
       
        <li style={{ marginBottom: '10px' }}>60x</li>
        <li style={{ marginBottom: '10px' }}>59x</li>
        <li style={{ marginBottom: '10px' }}>58x</li>
        <li style={{ marginBottom: '10px' }}>57x</li>
        <li style={{ marginBottom: '10px' }}>56x</li>
        <li style={{ marginBottom: '10px' }}>55x</li>
      </ul>
    </span>
  )
}
{
  currentMultiplier > 60.01 && currentMultiplier < 65 && (
    <span
      style={{
        top: "0px",
        left: "0px",
        position: 'absolute',
        zIndex: 11,
        display: 'inline-block'
      }}
    >
      <ul style={{ listStyle: 'none', marginLeft: 16, padding: 0 }}>
       
        <li style={{ marginBottom: '10px' }}>65x</li>
        <li style={{ marginBottom: '10px' }}>65x</li>
        <li style={{ marginBottom: '10px' }}>64x</li>
        <li style={{ marginBottom: '10px' }}>63x</li>
        <li style={{ marginBottom: '10px' }}>62x</li>
        <li style={{ marginBottom: '10px' }}>61x</li>
        <li style={{ marginBottom: '10px' }}>60x</li>
        
       
      </ul>
    </span>
  )
}
{
  currentMultiplier > 65.01 && currentMultiplier < 70 && (
    <span
      style={{
        top: "0px",
        left: "0px",
        position: 'absolute',
        zIndex: 11,
        display: 'inline-block'
      }}
    >
      <ul style={{ listStyle: 'none', marginLeft: 16, padding: 0 }}>
       
        <li style={{ marginBottom: '10px' }}>70x</li>
        <li style={{ marginBottom: '10px' }}>69x</li>
        <li style={{ marginBottom: '10px' }}>68x</li>
        <li style={{ marginBottom: '10px' }}>67x</li>
        <li style={{ marginBottom: '10px' }}>66x</li>
        <li style={{ marginBottom: '10px' }}>65x</li>
      </ul>
    </span>
  )
}
{
  currentMultiplier > 70.01 && currentMultiplier < 75 && (
    <span
      style={{
        top: "0px",
        left: "0px",
        position: 'absolute',
        zIndex: 11,
        display: 'inline-block'
      }}
    >
      <ul style={{ listStyle: 'none', marginLeft: 16, padding: 0 }}>
       
        <li style={{ marginBottom: '10px' }}>75x</li>
        <li style={{ marginBottom: '10px' }}>74x</li>
        <li style={{ marginBottom: '10px' }}>73x</li>
        <li style={{ marginBottom: '10px' }}>72x</li>
        <li style={{ marginBottom: '10px' }}>71x</li>
        <li style={{ marginBottom: '10px' }}>70x</li>
       
      </ul>
    </span>
  )
}
{
  currentMultiplier > 75.01 && currentMultiplier < 80 && (
    <span
      style={{
        top: "0px",
        left: "0px",
        position: 'absolute',
        zIndex: 11,
        display: 'inline-block'
      }}
    >
      <ul style={{ listStyle: 'none', marginLeft: 16, padding: 0 }}>
       
        <li style={{ marginBottom: '10px' }}>80x</li>
        <li style={{ marginBottom: '10px' }}>79x</li>
        <li style={{ marginBottom: '10px' }}>78x</li>
        <li style={{ marginBottom: '10px' }}>77x</li>
        <li style={{ marginBottom: '10px' }}>76x</li>
        <li style={{ marginBottom: '10px' }}>75x</li>
      </ul>
    </span>
  )
}
{
  currentMultiplier > 80.01 && currentMultiplier < 85 && (
    <span
      style={{
        top: "0px",
        left: "0px",
        position: 'absolute',
        zIndex: 11,
        display: 'inline-block'
      }}
    >
      <ul style={{ listStyle: 'none', marginLeft: 16, padding: 0 }}>
       
        <li style={{ marginBottom: '10px' }}>85x</li>
        <li style={{ marginBottom: '10px' }}>84x</li>
        <li style={{ marginBottom: '10px' }}>83x</li>
        <li style={{ marginBottom: '10px' }}>82x</li>
        <li style={{ marginBottom: '10px' }}>81x</li>
        <li style={{ marginBottom: '10px' }}>80x</li>
      </ul>
    </span>
  )
}
{
  currentMultiplier > 85.01 && currentMultiplier < 90 && (
    <span
      style={{
        top: "0px",
        left: "0px",
        position: 'absolute',
        zIndex: 11,
        display: 'inline-block'
      }}
    >
      <ul style={{ listStyle: 'none', marginLeft: 16, padding: 0 }}>
       
        <li style={{ marginBottom: '10px' }}>85x</li>
        <li style={{ marginBottom: '10px' }}>84x</li>
        <li style={{ marginBottom: '10px' }}>83x</li>
        <li style={{ marginBottom: '10px' }}>82x</li>
        <li style={{ marginBottom: '10px' }}>81x</li>
        <li style={{ marginBottom: '10px' }}>80x</li>
      </ul>
    </span>
  )
}
{
  currentMultiplier > 90.01 && currentMultiplier < 95 && (
    <span
      style={{
        top: "0px",
        left: "0px",
        position: 'absolute',
        zIndex: 11,
        display: 'inline-block'
      }}
    >
      <ul style={{ listStyle: 'none', marginLeft: 16, padding: 0 }}>
       
        <li style={{ marginBottom: '10px' }}>95x</li>
        <li style={{ marginBottom: '10px' }}>94x</li>
        <li style={{ marginBottom: '10px' }}>93x</li>
        <li style={{ marginBottom: '10px' }}>92x</li>
        <li style={{ marginBottom: '10px' }}>91x</li>
        <li style={{ marginBottom: '10px' }}>90x</li>
       
      </ul>
    </span>
  )
}
{
  currentMultiplier > 95.01 && currentMultiplier < 100 && (
    <span
      style={{
        top: "0px",
        left: "0px",
        position: 'absolute',
        zIndex: 11,
        display: 'inline-block'
      }}
    >
      <ul style={{ listStyle: 'none', marginLeft: 16, padding: 0 }}>
       
        <li style={{ marginBottom: '10px' }}>100x</li>
        <li style={{ marginBottom: '10px' }}>99x</li>
        <li style={{ marginBottom: '10px' }}>98x</li>
        <li style={{ marginBottom: '10px' }}>97x</li>
        <li style={{ marginBottom: '10px' }}>96x</li>
        <li style={{ marginBottom: '10px' }}>95x</li>
      </ul>
    </span>
  )
}
       
      </>
    );
  }