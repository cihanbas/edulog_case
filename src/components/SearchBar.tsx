import { AntDesign } from "@expo/vector-icons";
import React, { FC } from "react";
import { StyleSheet, TextInput, TextInputProps, View } from "react-native";
import { COLORS, padding } from "src/utils/theme";
interface Props extends TextInputProps {}
const SearchBar: FC<Props> = (props) => {
  return (
    <View style={styles.container}>
      <AntDesign name="search1" size={24} color={COLORS.primary} />
      <TextInput
        style={styles.text}
        placeholder="Ara"
        placeholderTextColor={"#7C7B7B"}
        {...props}
      />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.bg_2,
    padding: padding.s,
    marginHorizontal: padding.l,
    borderRadius: padding.xl,
    paddingLeft: padding.l,
    flexDirection: "row",
    alignItems: "center",
    marginTop: padding.l,
  },
  text: {
    color: "#000",
    paddingLeft: padding.s,
    flex: 1,
    padding: padding.m,
  },
});
