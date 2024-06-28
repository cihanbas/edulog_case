import { FontFamily } from "assets/fonts/fontFamilyTypes";
import React, { FC, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Header, NativeText } from "src/components";
import { Button } from "src/components/Button";
import { IStackProps } from "src/navigation/types";
import { selectFilter } from "src/store/features/search/searchSlices";
import { useAppDispatch, useAppSelector } from "src/store/hooks";
import { appPadding, spacing } from "src/utils/constants";
import { normalize } from "src/utils/normalize";
import { COLORS } from "src/utils/theme";
import { IFilterState } from "./types";
import { AllCategoryName } from "src/types/Categories";
import { getColorOfFilterCategory } from "src/utils/helper";

const FilterScreen: FC<IStackProps<"Filter">> = ({ navigation, route }) => {
  const { bottom, top } = useSafeAreaInsets();
  const { categories, selectCategory, minPrice, maxPrice } = useAppSelector(
    (s) => s.searchSlice
  );
  const dispatch = useAppDispatch();
  const [state, setState] = useState<IFilterState>({
    minPrice: `${minPrice || ""}`,
    maxPrice: `${maxPrice || ""}`,
    selectCategory: selectCategory,
  });
  const save = async () => {
    await dispatch(
      selectFilter({
        maxPrice: parseInt(state.maxPrice || "0"),
        minPrice: parseInt(state.minPrice || "0"),
        selectCategory:
          state.selectCategory === AllCategoryName.All
            ? ""
            : state.selectCategory,
      })
    );
    navigation.goBack();
  };
  const onSelect = (item: string) => {
    //
    // dispatch(onSelectCategory(item));
    setState((s) => ({ ...s, selectCategory: item }));
  };
  return (
    <View style={[styles.container]}>
      <Header text="Filter" showBack></Header>
      <ScrollView style={styles.itemContainer}>
        <NativeText style={styles.itemTitle}>Price</NativeText>
        <View style={styles.inputWrapper}>
          <TextInput
            value={state.minPrice}
            style={styles.input}
            placeholder="Min Price"
            keyboardType="number-pad"
            onChangeText={(text) => setState((s) => ({ ...s, minPrice: text }))}
          />
          <TextInput
            value={state.maxPrice}
            onChangeText={(text) => setState((s) => ({ ...s, maxPrice: text }))}
            style={[styles.input, styles.rightInput]}
            placeholder="Max Price"
            keyboardType="number-pad"
          />
        </View>
        <NativeText style={styles.itemTitle}>Categories</NativeText>
        <View style={styles.categoryWrapper}>
          {categories.map((item) => (
            <Pressable
              onPress={() => onSelect(item)}
              key={item}
              style={[
                styles.categoryItem,
                {
                  backgroundColor: getColorOfFilterCategory(
                    item,
                    state.selectCategory
                  ),
                },
              ]}
            >
              <NativeText
                color={
                  state.selectCategory === item ? COLORS.white : COLORS.primary
                }
                fontSize={normalize(16)}
              >
                {item}
              </NativeText>
            </Pressable>
          ))}
        </View>
      </ScrollView>
      <View
        style={[
          { paddingBottom: bottom + appPadding, paddingHorizontal: appPadding },
        ]}
      >
        <Button text="Save" onPress={save}></Button>
      </View>
    </View>
  );
};

export { FilterScreen };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  emptyView: {
    flex: 1,
  },
  content: {
    backgroundColor: "white",

    borderRadius: appPadding,
    overflow: "hidden",
  },
  titleWrapper: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: COLORS.black,
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignItems: "center",
  },
  title: {
    fontFamily: FontFamily.Bold,
    fontSize: normalize(20),
    paddingLeft: normalize(4),
  },
  input: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
    borderColor: COLORS.primary,
    padding: spacing[1],
    minWidth: "25%",
  },
  inputWrapper: {
    flexDirection: "row",
    paddingHorizontal: appPadding,
    paddingTop: spacing[1],
  },
  rightInput: {
    marginLeft: appPadding,
  },
  itemTitle: {
    paddingHorizontal: appPadding,
    paddingTop: spacing[3],
    fontFamily: FontFamily.Semi,
    fontSize: normalize(15),
  },
  itemContainer: {
    paddingBottom: spacing[3],
  },
  contentContainer: {
    justifyContent: "space-between",
    backgroundColor: "red",
  },
  categoryItem: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.primary,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginLeft: spacing[2],
    borderRadius: 10,
    marginBottom: spacing[2],
  },
  categoryWrapper: {
    flexWrap: "wrap",
    flexDirection: "row",
    marginHorizontal: spacing[2],
    marginTop: spacing[2],
  },
});
