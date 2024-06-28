import { AntDesign } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as React from "react";
import { shallowEqual } from "react-redux";
import { SearchScreen } from "src/screens/Search/SearchScreen";
import { useAppSelector } from "src/store/hooks";
import AuthScreen from "../screens/Account/Auth/AuthScreen";
import CartScreen from "../screens/Cart/CartScreen";
import HomeScreen from "../screens/Home/HomeScreen";
import { TabParamList } from "./types";
import ChartScreen from "src/screens/Chart/ChartScreen";
const Tab = createBottomTabNavigator<TabParamList>();

export const TabNavigator = () => {
  const { cartLength } = useAppSelector(
    (state) => state.cartSlice,
    shallowEqual
  );
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          shadowOffset: {
            width: 0,
            height: 12,
          },
          shadowOpacity: 0.58,
          shadowRadius: 16.0,
          elevation: 24,
          backgroundColor: "#fff",
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <AntDesign name="home" size={24} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <AntDesign name="search1" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <AntDesign name="shoppingcart" size={24} color={color} />
          ),
          tabBarBadge: cartLength || undefined,
        }}
      />

      <Tab.Screen
        name="ChartScreen"
        component={ChartScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <AntDesign name="linechart" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
