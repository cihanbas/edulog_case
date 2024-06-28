import React from "react";
import { FlatList, ListRenderItem, StyleSheet, View } from "react-native";
import { FontFamily } from "assets/fonts/fontFamilyTypes";
import { Header, NativeText } from "src/components";
import { Button } from "src/components/Button";
import { ICartItem } from "src/store/features/cart/cartSlice";
import { useAppSelector } from "src/store/hooks";
import { RenderCartItem } from "./renderCartItem";
const CartScreen = () => {
  const { cart, totalPrice } = useAppSelector((state) => state.cartSlice);

  const renderItem: ListRenderItem<ICartItem> = ({ item }) => {
    return <RenderCartItem item={item} />;
  };
  const onComplete = () => {};
  return (
    <View style={styles.container}>
      <Header text="Shopping bag" />
      {cart.length > 0 ? (
        <>
          <FlatList
            data={cart}
            renderItem={renderItem}
            keyExtractor={(item) => `${item.id}`}
          ></FlatList>
          <View style={styles.checkOutWrapper}>
            <View>
              <NativeText className="pb-2">Total Price</NativeText>
              <NativeText fontFamily={FontFamily.Bold}>
                ${Math.floor(totalPrice).toFixed(2)}
              </NativeText>
            </View>
            <Button text="CHECK OUT" onPress={onComplete}></Button>
          </View>
        </>
      ) : (
        <View className="flex-1 bg-white items-center justify-center">
          <NativeText
            fontFamily={FontFamily.Bold}
            fontSize={24}
            className="uppercase pb-4"
          >
            Your Cart is empty
          </NativeText>
          <NativeText>Add items to your shopping cart to checkout</NativeText>
        </View>
      )}
    </View>
  );
};

export default CartScreen;
const styles = StyleSheet.create({
  checkOutWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "white",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  container: {
    backgroundColor: "#edf5fc",
    flex: 1,
  },
});
