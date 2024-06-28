import { FontFamily } from "assets/fonts/fontFamilyTypes";
import React, { FC } from "react";
import { Pressable, PressableProps, StyleSheet, ViewStyle } from "react-native";
import { COLORS } from "src/utils/theme";
import { NativeText } from "../Text";
interface Props extends PressableProps {
  text: string;
  style?: ViewStyle;
}
const Button: FC<Props> = (props) => {
  return (
    <Pressable
      onPress={props.onPress}
      testID="btn"
      {...props}
      style={StyleSheet.flatten([styles.btn, props.style])}
    >
      <NativeText testID="btnText" style={styles.btnText}>
        {props.text}
      </NativeText>
    </Pressable>
  );
};

export { Button };

const styles = StyleSheet.create({
  btn: {
    paddingVertical: 12,
    paddingHorizontal: 10,
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
