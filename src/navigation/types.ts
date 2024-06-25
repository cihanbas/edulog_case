import { NavigatorScreenParams } from "@react-navigation/native";

export type RootStackParamList = {
  Tabs: NavigatorScreenParams<TabParamList>;
};
export type TabParamList = {
  Home: undefined;
  Search: undefined;
  Cart: undefined;
  WishList: undefined;
  Account: undefined;
};
