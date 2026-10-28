import { StyleProp, ViewStyle } from "react-native";

export default interface KeypadProps {
  keys: string[];
  columns?: number;
  onKeyPress: (symbol: string) => void;
  style?: StyleProp<ViewStyle>;
  isLandscape?: boolean;
}