import { Dimensions, Platform } from "react-native";
import { normalize } from "./normalize";

const HEADER_HEIGHT = Platform.OS === "ios" ? 44 : 56;
const BASE_URL = "https://fakestoreapi.com/";
const { width, height } = Dimensions.get("window");
const appPadding = normalize(18);
const spacing = [4, 8, 12, 16, 20, 24, 32].map((item) => normalize(item));
export { HEADER_HEIGHT, BASE_URL, width, height, appPadding, spacing };
