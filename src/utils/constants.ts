import { Dimensions, Platform } from "react-native";

const HEADER_HEIGHT = Platform.OS === "ios" ? 44 : 56;
const BASE_URL = "https://fakestoreapi.com/";
const { width, height } = Dimensions.get("window");
export { HEADER_HEIGHT, BASE_URL, width, height };
