import { AntDesign } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { FontFamily } from "assets/fonts/fontFamilyTypes";
import { Image } from "expo-image";
import React, { FC, memo } from "react";
import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import { NativeText } from "src/components";
import { api } from "src/services/api";
import { addItem } from "src/store/features/cart/cartSlice";
import { useAppDispatch } from "src/store/hooks";
import { Product } from "src/types/Product";
import { width } from "src/utils/constants";
import { COLORS } from "src/utils/theme";

interface Props {
  categoryName: string;
}
const ProductList: FC<Props> = ({ categoryName }) => {
  const { data } = useQuery({
    queryKey: ["allProduct", categoryName],
    queryFn: async () => await (await api.getAllProducts(categoryName)).data,
  });
  const dispatch = useAppDispatch();
  const addToBasket = (item: Product) => {
    dispatch(addItem(item));
  };
  const renderProduct: ListRenderItem<Product> = ({ item }) => {
    return (
      <View style={styles.item}>
        <Image
          source={{ uri: item.image }}
          style={styles.image}
          resizeMode="contain"
          cachePolicy={"disk"}
        >
          <Pressable style={styles.favContainer}>
            <AntDesign name="hearto" size={24} color={COLORS.notification} />
          </Pressable>
        </Image>
        <View className="my-2">
          <NativeText className="my-2" numberOfLines={2}>
            {item.title}
          </NativeText>
          <NativeText
            fontFamily={FontFamily.Bold}
            className="color-primary text-right"
          >
            ${item.price}
          </NativeText>
          <Pressable style={styles.btn} onPress={() => addToBasket(item)}>
            <NativeText style={styles.btnText}>Sepete Ekle</NativeText>
          </Pressable>
        </View>
      </View>
    );
  };
  return (
    <FlatList
      contentContainerStyle={{ flexGrow: 1, paddingTop: 16 }}
      data={data || []}
      renderItem={renderProduct}
      numColumns={2}
      ListEmptyComponent={<ActivityIndicator />}
    />
  );
};

export default memo(ProductList);
const contentWidth = width / 2 - 20;
const styles = StyleSheet.create({
  image: {
    height: contentWidth,
    width: contentWidth,
    alignItems: "flex-end",
  },
  item: {
    width: contentWidth,
    marginLeft: 10,
    marginBottom: 20,
  },
  favContainer: {
    margin: 8,
    borderRadius: 50,
    padding: 4,
    backgroundColor: "white",
  },
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
