import { FontFamily } from "assets/fonts/fontFamilyTypes";
import { Image } from "expo-image";
import { FC } from "react";
import { View, Pressable, StyleSheet, Alert } from "react-native";
import { NativeText } from "src/components";
import { Button } from "src/components/Button";
import { Product } from "src/types/Product";
import { AntDesign } from "@expo/vector-icons";
import { spacing, width } from "src/utils/constants";
import { COLORS } from "src/utils/theme";
import { useAppDispatch } from "src/store/hooks";
import { addItem } from "src/store/features/cart/cartSlice";
import { useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "src/navigation/types";

interface Props {
  item: Product;
}
export const RenderProduct: FC<Props> = ({ item }) => {
  const dispatch = useAppDispatch();
  const navigation =
    useNavigation<
      NativeStackScreenProps<RootStackParamList, "ProductDetail">["navigation"]
    >();
  const addToBasket = () => {
    dispatch(addItem(item));
    Alert.alert("Success", "Product Added To Cart", [
      {
        text: "Continue Shopping",
        onPress: () => {},
        style: "cancel",
      },
      {
        text: "View Cart",
        onPress: () => navigation.navigate("Tabs", { screen: "Cart" }),
      },
    ]);
  };

  const navigateToDetail = () => {
    navigation.navigate("ProductDetail", { productID: item.id });
  };
  return (
    <Pressable style={styles.item} onPress={navigateToDetail}>
      <Image
        source={{ uri: item.image }}
        style={styles.image}
        contentFit="contain"
      />
      <View style={styles.content}>
        <NativeText className="my-2">{item.title}</NativeText>
        <NativeText
          fontFamily={FontFamily.Bold}
          className="color-primary text-right"
        >
          ${Math.floor(item.price).toFixed(2)}
        </NativeText>
        <Button text="Add to Basket" onPress={addToBasket} />
      </View>
    </Pressable>
  );
};

const contentWidth = width / 2 - 10;
const styles = StyleSheet.create({
  image: {
    height: contentWidth,
    width: contentWidth,
  },
  item: {
    width: contentWidth,
    marginLeft: 5,
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderRadius: 8,
    marginBottom: 10,
    justifyContent: "space-between",
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
  favContainer: {
    margin: 8,
    borderRadius: 50,
    padding: 4,
    backgroundColor: "white",
    position: "absolute",
    right: 0,
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
  content: {
    justifyContent: "space-between",
    flex: 1,
  },
});
