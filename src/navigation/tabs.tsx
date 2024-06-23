import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as React from "react";
import CartScreen from "../screens/Cart/CartScreen";
import HomeScreen from "../screens/Home/HomeScreen";
import { TabParamList } from "./types";
import WishList from "../screens/WishList/WishListScreen";
import AuthScreen from "../screens/Account/Auth/AuthScreen";

const Tab = createBottomTabNavigator<TabParamList>();

export const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
      <Tab.Screen name="WishList" component={WishList} />
      <Tab.Screen name="Account" component={AuthScreen} />
    </Tab.Navigator>
  );
};
