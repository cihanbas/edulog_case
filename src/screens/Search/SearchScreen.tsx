import React, { FC, useEffect, useRef } from "react";
import { FlatList, ListRenderItem, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Loading } from "src/components/Loader";
import { RenderProduct } from "src/components/RenderProduct";
import SearchBar from "src/components/SearchBar";
import { ICompositeBottomProps } from "src/navigation/types";
import {
  getAllProducts,
  searchProducts,
} from "src/store/features/search/searchSlices";
import { useAppDispatch, useAppSelector } from "src/store/hooks";
import { Product } from "src/types/Product";
type Props = ICompositeBottomProps<"Search">;
const SearchScreen: FC<Props> = () => {
  const {
    products = [],
    isLoading,
    searchResult,
  } = useAppSelector((s) => s.searchSlice);

  const timeout = useRef<NodeJS.Timeout>();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllProducts());
  }, []);
  const onChangeText = (text: string) => {
    clearTimeout(timeout.current);
    timeout.current = setTimeout(() => {
      if (products?.length > 0) {
        dispatch(searchProducts(text));
      }
    }, 500);
  };

  const renderProduct: ListRenderItem<Product> = ({ item }) => {
    return <RenderProduct item={item} />;
  };

  return (
    <SafeAreaView className="flex-1" edges={["top"]}>
      <SearchBar onChangeText={onChangeText} showFilter />
      <FlatList
        contentContainerStyle={styles.container}
        data={searchResult || []}
        renderItem={renderProduct}
        numColumns={2}
      />
      <Loading loading={isLoading} />
    </SafeAreaView>
  );
};

export { SearchScreen };
const styles = StyleSheet.create({
  container: { flexGrow: 1, marginTop: 9 },
});
