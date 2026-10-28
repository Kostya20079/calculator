export default interface CalcButtonProps {
  label: string;
  onPress: (symbol: string) => void;
  flex?: number;
  isLandscape?: boolean;
}
