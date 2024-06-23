import { moderateScale } from "react-native-size-matters";

const normalize = (number: number, factor = 0.25) => {
  return moderateScale(number, factor);
};
export { normalize };
