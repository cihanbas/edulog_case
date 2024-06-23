import { NavigatorScreenParams } from "@react-navigation/native";

export type RootStackParamList = {
  Tabs: NavigatorScreenParams<TabParamList>;
};
export type TabParamList = {
  Home: undefined;
  Cart: undefined;
  WishList: undefined;
  Account: undefined;
};
