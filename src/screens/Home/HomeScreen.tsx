import React, { FC, useState } from "react";
import {
  FlatList,
  ListRenderItem,
  Pressable,
  StyleSheet,
  View,
} from "react-native";

import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { useQuery } from "@tanstack/react-query";
import { FontFamily, fonts } from "assets/fonts/fontFamilyTypes";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeText } from "src/components";
import SearchBar from "src/components/SearchBar";
import { TabParamList } from "src/navigation/types";
import { api } from "src/services/api";
import { AllCategoryName } from "src/types/Categories";
import { COLORS } from "src/utils/theme";
import ProductList from "./ProductList";
type HomeScreenProps = BottomTabScreenProps<TabParamList, "Home">;
let renderCount = 0;
const HomeScreen: FC<HomeScreenProps> = ({ navigation }) => {
  const [selectCategory, setSelectCategory] = useState("");
  const { data, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await (await api.getAllCategories()).data;
      console.log("response", response.length);
      if (response.length > 0) {
        return [AllCategoryName.All, ...response];
      }
      return [];
    },
  });
  const [fontsLoaded, fontError] = useFonts(fonts);
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
  const getCategoryColor = (item: string) => {
    if (selectCategory === "" && item === AllCategoryName.All) {
      return COLORS.primary;
    }
    return selectCategory === item ? COLORS.primary : COLORS.black;
  };
  renderCount += 1;
  console.log("renderCount", renderCount);
  const renderCategories: ListRenderItem<string> = ({ item, index }) => {
    return (
      <Pressable style={styles.category} onPress={() => updateCategory(item)}>
        <NativeText
          fontFamily={FontFamily.Medium}
          style={[styles.categoryText, { color: getCategoryColor(item) }]}
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
      <View>
        <FlatList
          data={data || []}
          renderItem={renderCategories}
          keyExtractor={(item) => item}
          horizontal
          style={styles.categories}
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
    alignSelf: "flex-start",
    borderBottomWidth: StyleSheet.hairlineWidth,
    margin: 10,
  },
  category: {
    padding: 8,
    alignSelf: "flex-start",
  },
  categoryText: {
    textTransform: "uppercase",
  },
});
