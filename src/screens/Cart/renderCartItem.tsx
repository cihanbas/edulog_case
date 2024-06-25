import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";
import { Image } from "expo-image";
import { AntDesign, Feather } from "@expo/vector-icons";

import { NativeText } from "src/components";
import { useAppDispatch } from "src/store/hooks";
import {
  ICartItem,
  decrementCount,
  incrementCount,
  removeItem,
} from "src/store/features/cart/cartSlice";
import { COLORS } from "src/utils/theme";
import { FontFamily } from "assets/fonts/fontFamilyTypes";
import { normalize } from "src/utils/normalize";
interface Props {
  item: ICartItem;
}
export const RenderCartItem: FC<Props> = ({ item }) => {
  const dispatch = useAppDispatch();
  const deletProductFromBasket = (id: number) => {
    dispatch(removeItem(id));
  };
  const incrementProductCount = (id: number) => {
    dispatch(incrementCount(id));
  };
  const decrementProductCount = (id: number) => {
    dispatch(decrementCount(id));
  };
  return (
    <View className="flex-row p-2 bg-white mb-2 ">
      <Image source={{ uri: item.image }} style={styles.image}></Image>
      <View className="flex-1 p-2 justify-between">
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
            ${item.price * item.count!}
          </NativeText>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 120,
    width: 90,
    resizeMode: "contain",
    borderWidth: StyleSheet.hairlineWidth,
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
