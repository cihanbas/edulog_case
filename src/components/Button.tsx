import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";
import { NativeText } from "./Text";
import { FontFamily } from "assets/fonts/fontFamilyTypes";
import { COLORS } from "src/utils/theme";
interface Props {
  onPress: () => void;
  text: string;
}
const Button: FC<Props> = ({ onPress, text }) => {
  return (
    <Pressable style={styles.btn} onPress={onPress}>
      <NativeText style={styles.btnText}>{text}</NativeText>
    </Pressable>
  );
};

export { Button };

const styles = StyleSheet.create({
  btn: {
    padding: 10,
    backgroundColor: COLORS.primary,
    borderRadius: 9,
    marginTop: 8,
  },
  btnText: {
    color: "white",
    fontFamily: FontFamily.Bold,
    textAlign: "center",
  },
});
