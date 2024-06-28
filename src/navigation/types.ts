import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParamList = {
  Tabs: NavigatorScreenParams<TabParamList>;
  ProductDetail: {
    productID: number;
  };
  Filter: undefined;
};
export type TabParamList = {
  Home: undefined;
  Search: undefined;
  Cart: undefined;

  ChartScreen: undefined;
};
export type ICompositeStackProps<T extends keyof RootStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<RootStackParamList, T>,
    BottomTabScreenProps<TabParamList>
  >;
export type ICompositeStackNavigationProps<T extends keyof RootStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<RootStackParamList, T>,
    BottomTabScreenProps<TabParamList>
  >["navigation"];
export type ICompositeBottomProps<T extends keyof TabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<TabParamList, T>,
    NativeStackScreenProps<RootStackParamList>
  >;
export type IStackProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;
export type IStackNavigationProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>["navigation"];
export type IBottomTabProps<T extends keyof TabParamList> =
  NativeStackScreenProps<TabParamList, T>;
