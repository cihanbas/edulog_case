import React, { FC, useEffect, useState } from "react";
import {
  FlatList,
  ListRenderItem,
  Pressable,
  StyleSheet,
  View,
} from "react-native";

import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { FontFamily, fonts } from "assets/fonts/fontFamilyTypes";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeText } from "src/components";
import SearchBar from "src/components/SearchBar";
import { TabParamList } from "src/navigation/types";
import { fetchCategories } from "src/store/features/search/searchSlices";
import { useAppDispatch, useAppSelector } from "src/store/hooks";
import { AllCategoryName } from "src/types/Categories";
import ProductList from "./ProductList";
import { getCategoryColor } from "src/utils/helper";
type HomeScreenProps = BottomTabScreenProps<TabParamList, "Home">;

const HomeScreen: FC<HomeScreenProps> = ({ navigation }) => {
  const [selectCategory, setSelectCategory] = useState("");
  const { categories } = useAppSelector((state) => state.searchSlice);
  const [fontsLoaded, fontError] = useFonts(fonts);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (categories.length == 0) {
      dispatch(fetchCategories());
    }
  }, []);

  const onLayoutRootView = React.useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);
  if (!fontsLoaded && !fontError) {
    return null;
  }
  const navigateToSearch = () => {
    navigation.navigate("Search");
  };
  const updateCategory = (categoryName: string) => {
    if (categoryName === AllCategoryName.All) {
      setSelectCategory("");
    } else {
      setSelectCategory(categoryName);
    }
  };

  const renderCategories: ListRenderItem<string> = ({ item }) => {
    return (
      <Pressable style={styles.category} onPress={() => updateCategory(item)}>
        <NativeText
          fontFamily={FontFamily.Medium}
          style={StyleSheet.flatten([
            styles.categoryText,
            { color: getCategoryColor(item, selectCategory) },
          ])}
        >
          {item}
        </NativeText>
      </Pressable>
    );
  };
  return (
    <SafeAreaView
      onLayout={onLayoutRootView}
      className="flex-1"
      edges={["top"]}
    >
      <Pressable onPress={navigateToSearch}>
        <View pointerEvents="none">
          <SearchBar editable={false} />
        </View>
      </Pressable>
      <View style={styles.categoriesWrapper}>
        <FlatList
          data={categories || []}
          renderItem={renderCategories}
          keyExtractor={(item) => item}
          horizontal
          contentContainerStyle={styles.categories}
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <ProductList categoryName={selectCategory} />
    </SafeAreaView>
  );
};

export default HomeScreen;
const styles = StyleSheet.create({
  categories: {
    alignSelf: "baseline",
    paddingVertical: 4,
    paddingHorizontal: 20,
  },
  categoriesWrapper: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  category: {
    padding: 8,
    alignSelf: "flex-start",
  },
  categoryText: {
    textTransform: "uppercase",
  },
});
