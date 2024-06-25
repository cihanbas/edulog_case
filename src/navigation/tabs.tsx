import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as React from "react";
import CartScreen from "../screens/Cart/CartScreen";
import HomeScreen from "../screens/Home/HomeScreen";
import { TabParamList } from "./types";
import WishList from "../screens/WishList/WishListScreen";
import AuthScreen from "../screens/Account/Auth/AuthScreen";
import { AntDesign } from "@expo/vector-icons";
import { SearchScreen } from "src/screens/Search/SearchScreen";
import { useAppSelector } from "src/store/hooks";
const Tab = createBottomTabNavigator<TabParamList>();

export const TabNavigator = () => {
  const { cartLength } = useAppSelector((state) => state.cartSlice);
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
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
        name="WishList"
        component={WishList}
        options={{
          tabBarIcon: ({ color }) => (
            <AntDesign name="hearto" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={AuthScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <AntDesign name="user" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
