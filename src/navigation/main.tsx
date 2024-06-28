import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { COLORS } from "src/utils/theme";
import { TabNavigator } from "./tabs";
import { RootStackParamList } from "./types";
import { ProductDetail } from "src/screens/ProductDetail/ProductDetailScreen";
import { FilterScreen } from "src/screens/Search/Filter/FilterScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();
const MainStack = () => {
  return (
    <NavigationContainer theme={{ dark: false, colors: COLORS }}>
      <Stack.Navigator>
        <Stack.Screen
          name="Tabs"
          component={TabNavigator}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ProductDetail"
          component={ProductDetail}
          options={{
            headerShown: false,
            animation: "fade_from_bottom",
          }}
        />
        <Stack.Screen
          name="Filter"
          component={FilterScreen}
          options={{
            headerShown: false,
            animation: "fade",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export { MainStack };
