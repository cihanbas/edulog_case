import { AntDesign } from "@expo/vector-icons";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import React, { FC, useEffect } from "react";
import {
  Pressable,
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
} from "react-native";
import { IStackNavigationProps } from "src/navigation/types";
import { appPadding } from "src/utils/constants";
import { normalize } from "src/utils/normalize";
import { COLORS, padding } from "src/utils/theme";
import { NativeText } from "./Text";
import { useAppSelector } from "src/store/hooks";
interface Props extends TextInputProps {
  showFilter?: boolean;
}
const SearchBar: FC<Props> = (props) => {
  const ref = React.useRef<TextInput>(null);
  const { filterBadge } = useAppSelector((s) => s.searchSlice);
  const isfocused = useIsFocused();
  const navigation = useNavigation<IStackNavigationProps<"ProductDetail">>();
  useEffect(() => {
    if (isfocused) {
      ref.current?.focus();
    }
  }, [isfocused]);
  const navigateToFilter = () => {
    navigation.navigate("Filter");
  };
  return (
    <View style={styles.contentWrapper}>
      <View style={styles.container}>
        <AntDesign name="search1" size={24} color={COLORS.primary} />
        <TextInput
          style={styles.text}
          placeholder="Search"
          ref={ref}
          autoCorrect={false}
          placeholderTextColor={"#7C7B7B"}
          {...props}
        />
      </View>
      {props.showFilter && (
        <Pressable style={styles.filterWrapper} onPress={navigateToFilter}>
          {filterBadge > 0 && (
            <View style={styles.badge}>
              <NativeText style={styles.badgeText}>{filterBadge}</NativeText>
            </View>
          )}
          <AntDesign name="filter" size={24} color="black" />
        </Pressable>
      )}
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    borderRadius: padding.xl,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.bg_2,
    flex: 1,
    marginHorizontal: appPadding,
    paddingHorizontal: padding.l,
  },
  contentWrapper: {
    flexDirection: "row",
    height: normalize(50),
    alignItems: "center",
    borderBottomColor: COLORS.primary,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  text: {
    color: "#000",
    paddingLeft: padding.s,
    flex: 1,
    padding: padding.m,
  },
  filterWrapper: {
    paddingRight: appPadding,
    justifyContent: "center",
    height: normalize(50),
  },
  badge: {
    position: "absolute",
    top: 4,
    left: 15,
    backgroundColor: "red",

    borderRadius: 10,
    height: 15,
    width: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "white",
    fontSize: 12,
  },
});
