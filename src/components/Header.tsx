import { HEADER_HEIGHT } from "src/utils/constants";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { NativeText } from "./Text";
import { FontFamily } from "assets/fonts/fontFamilyTypes";
interface IProps {
  text: string;
  showBack?: boolean;
}
const Header = ({ text, showBack = false }: IProps) => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const handleBack = () => {
    if (showBack && navigation.canGoBack()) {
      navigation.goBack();
    }
  };
  return (
    <View
      style={[
        styles.container,
        { height: insets.top + HEADER_HEIGHT, paddingTop: insets.top },
      ]}
    >
      <Pressable className="flex-1 justify-center" onPress={handleBack}>
        {showBack && <AntDesign name="left" size={24} color="black" />}
      </Pressable>
      <View className="flex-[4] items-center justify-center">
        <NativeText
          className="color-black font-bold text-text20 uppercase"
          fontFamily={FontFamily.Medium}
        >
          {text}
        </NativeText>
      </View>
      <Pressable className="flex-1"></Pressable>
    </View>
  );
};
export { Header };

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    shadowColor: "#000",
    paddingHorizontal: 10,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: "row",
  },
});
