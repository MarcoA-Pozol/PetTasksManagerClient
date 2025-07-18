import { useScreenWidth } from "./useScreenWidth";

export function useResponsiveCssValue() {
  const screenWidth = useScreenWidth();

  return function<T>(smallScreenValue: T, largeScreenValue: T): T {
    return screenWidth < 768 ? smallScreenValue : largeScreenValue;
  };
}