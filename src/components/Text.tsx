import React, { FC } from "react";
import { StyleSheet, Text, TextProps } from "react-native";
import { FontFamily } from "../../assets/fonts/fontFamilyTypes";
import { normalize } from "../utils/normalize";
interface Props extends TextProps {
  fontFamily?: FontFamily;
  color?: string;
  fontSize?: number;
}
const NativeText: FC<Props> = (props) => {
  return (
    <Text
      {...props}
      style={StyleSheet.flatten([
        {
          fontFamily: props.fontFamily || FontFamily.Medium,
          color: props.color || "black",
          fontSize: props.fontSize || normalize(14),
        },
        props.style,
      ])}
    >
      {props.children}
    </Text>
  );
};
export { NativeText };
