import { StyleSheet, Text, View } from "react-native";
import React from "react";

import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { FontFamily } from "../../../assets/fonts/fontFamilyTypes";
import NativeText from "../../components/Text";
const HomeScreen = () => {
  const [fontsLoaded, fontError] = useFonts({
    "AvenirNextCyr-Light": require("../../../assets/fonts/AvenirNextCyr-Light.ttf"),
    "AvenirNextCyr-Regular": require("../../../assets/fonts/AvenirNextCyr-Regular.ttf"),
    "AvenirNextCyr-Medium": require("../../../assets/fonts/AvenirNextCyr-Medium.ttf"),
    "AvenirNextCyr-Demi": require("../../../assets/fonts/AvenirNextCyr-Demi.ttf"),
    "AvenirNext-Bold": require("../../../assets/fonts/AvenirNextCyr-Bold.ttf"),
  });

  const onLayoutRootView = React.useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }
  return (
    <View onLayout={onLayoutRootView}>
      <Text>HomeScreen</Text>
      <NativeText style={{ fontFamily: FontFamily.light }}>
        Avenir LT Pro 35 Light
      </NativeText>
      <NativeText>Avenir LT Pro 35 Light</NativeText>
      <NativeText style={{ fontFamily: "AvenirNextCyr-Medium" }}>
        Avenir LT Pro 35 Light
      </NativeText>
      <NativeText style={{ fontFamily: "AvenirNextCyr-Demi" }}>
        Avenir LT Pro 35 Light
      </NativeText>
      <NativeText style={{ fontFamily: FontFamily.Bold }}>
        Avenir LT Pro 35 Light
      </NativeText>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
