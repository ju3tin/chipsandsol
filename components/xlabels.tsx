import AnimatedList from './AnimatedList';

type Props = {
  currentMultiplier: number;
};

export default function XLabels({ currentMultiplier }: Props) {
  const getLabelsForMultiplier = (): string[] | null => {
    if (currentMultiplier > 1 && currentMultiplier < 5) {
      return ['5x', '4x', '3x', '2x', '1x'];
    } else if (currentMultiplier > 5 && currentMultiplier < 10) {
      return ['10x', '9x', '8x', '7x', '6x', '5x'];
    } else if (currentMultiplier > 10 && currentMultiplier < 15) {
      return ['15x', '14x', '13x', '12x', '11x', '10x'];
    }
    // Add other ranges here
    return null;
  };

  const labels = getLabelsForMultiplier();

  return labels ? (
    <AnimatedList
      items={labels}
      duration={3000}  // 3 seconds animation
      distance={150}   // move 150px downward
    />
  ) : null;
}
