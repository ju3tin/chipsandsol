import AnimatedHorizontalList from './AnimatedHorizontalList';

type Props = {
  currentMultiplier: number;
  timer5: number;
};

export default function YLabels({ currentMultiplier, timer5 }: Props) {
  const getList = () => {
    if (currentMultiplier > 1.00 && currentMultiplier < 2.00) {
      return [1,2,3,4,5,6,7,8,9,10];
    } else if (currentMultiplier > 2.01 && currentMultiplier < 4.00) {
      return [2,4,6,8,10,12,14,16,18,20];
    } else if (currentMultiplier > 4.01 && currentMultiplier < 8.00) {
      return [3,6,9,12,15,18,21,24,27,30];
    } else if (currentMultiplier > 8.01 && currentMultiplier < 16.00) {
      return [4,8,12,16,20,24,28,32,36,40];
    } else if (currentMultiplier > 16.01 && currentMultiplier < 32.00) {
      return [5,10,15,20,25,30,35,40,45,50];
    } else if (currentMultiplier > 32.01 && currentMultiplier < 64.00) {
      return [6,12,18,24,30,36,42,48,54,60];
    } else if (currentMultiplier > 64.01 && currentMultiplier < 128.00) {
      return [7,14,21,28,35,42,49,56,63,70];
    }
    return null;
  };

  const labels = getList();

  return (
    <>
      {labels && (
        <AnimatedHorizontalList timerMs={timer5} distance={300}>
          <ul
            style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              display: 'flex',
              gap: '5px'
            }}
          >
            {labels.map((label) => (
              <li key={label} style={{ marginRight: '5px' }}>
                {label}
              </li>
            ))}
          </ul>
        </AnimatedHorizontalList>
      )}
      {console.log(timer5 + " timer5 this is it dude")}
    </>
  );
}
