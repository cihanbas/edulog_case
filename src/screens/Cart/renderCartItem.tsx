import { AntDesign, Feather } from "@expo/vector-icons";
import { Image } from "expo-image";
import React, { FC } from "react";
import { Pressable, StyleSheet, View } from "react-native";

import { FontFamily } from "assets/fonts/fontFamilyTypes";
import { NativeText } from "src/components";
import {
  ICartItem,
  decrementCount,
  incrementCount,
  removeItem,
} from "src/store/features/cart/cartSlice";
import { useAppDispatch } from "src/store/hooks";
import { normalize } from "src/utils/normalize";
import { COLORS } from "src/utils/theme";
import { useNavigation } from "@react-navigation/native";
import { ICompositeStackNavigationProps } from "src/navigation/types";
interface Props {
  item: ICartItem;
}
export const RenderCartItem: FC<Props> = ({ item }) => {
  const dispatch = useAppDispatch();
  const navigation =
    useNavigation<ICompositeStackNavigationProps<"ProductDetail">>();
  const deletProductFromBasket = (id: number) => {
    dispatch(removeItem(id));
  };
  const incrementProductCount = (id: number) => {
    dispatch(incrementCount(id));
  };
  const decrementProductCount = (id: number) => {
    dispatch(decrementCount(id));
  };
  const navigateToDetail = () => {
    navigation.navigate("ProductDetail", { productID: item.id });
  };
  return (
    <Pressable
      className="flex-row p-2 bg-white mb-2"
      style={styles.container}
      onPress={navigateToDetail}
    >
      <Image
        source={{ uri: item.image }}
        style={styles.image}
        contentFit="contain"
      ></Image>
      <View className="flex-1 pl-4 justify-between pr-2">
        <View className="flex-row flex-1">
          <NativeText className="flex-1" numberOfLines={3}>
            {item.title}
          </NativeText>
          <Pressable
            style={styles.countBtn}
            onPress={() => deletProductFromBasket(item.id)}
          >
            <Feather name="trash" size={24} color={COLORS.gray} />
          </Pressable>
        </View>

        <View className="flex-row justify-between items-center">
          <View style={styles.countWrapper}>
            <Pressable
              style={styles.countBtn}
              onPress={() => decrementProductCount(item.id)}
            >
              <AntDesign name="minus" size={16} color="black" />
            </Pressable>
            <Pressable>
              <NativeText style={styles.countText} fontSize={16}>
                {item.count}
              </NativeText>
            </Pressable>
            <Pressable
              style={styles.countBtn}
              onPress={() => incrementProductCount(item.id)}
            >
              <AntDesign name="plus" size={16} color="black" />
            </Pressable>
          </View>

          <NativeText style={styles.priceText}>
            ${Math.floor(item.price * item.count!).toFixed(2)}
          </NativeText>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    backgroundColor: "white",
  },
  image: {
    height: 120,
    width: 90,
  },
  countWrapper: {
    borderRadius: 12,
    flexDirection: "row",
    borderWidth: StyleSheet.hairlineWidth,
    alignSelf: "flex-start",
    alignItems: "center",
  },
  countText: {
    paddingHorizontal: 12,
  },
  countBtn: {
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  priceText: {
    fontFamily: FontFamily.Bold,
    color: COLORS.primary,
    fontSize: normalize(16),
  },
});
