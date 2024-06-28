import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { FontFamily } from "assets/fonts/fontFamilyTypes";
import React from "react";
import {
  ModalProps,
  Modal as NativeModal,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import { ICompositeStackNavigationProps } from "src/navigation/types";
import { appPadding, spacing } from "src/utils/constants";
import { normalize } from "src/utils/normalize";
import { Button } from "../Button";
import { OutLineButton } from "../Button/OutlineBtn";
import { NativeText } from "../Text";
interface Props extends ModalProps {
  onPress: () => void;
}

export function Modal(props: Props) {
  const navigation =
    useNavigation<ICompositeStackNavigationProps<"ProductDetail">>();
  const openCart = () => {
    navigation.navigate("Cart");
  };

  return (
    <NativeModal
      animationType="fade"
      transparent={true}
      {...props}
      onRequestClose={() => {
        props.onPress();
      }}
    >
      <Pressable style={styles.centeredView} onPress={props.onPress}>
        <View style={styles.modalView}>
          <AntDesign name="checkcircleo" size={32} color="#0D9F00" />
          <View style={{ width: "100%" }}>
            <NativeText style={styles.text}>Product Added To Cart</NativeText>
            <Button onPress={props.onPress} text="Continue Shopping"></Button>
            <OutLineButton onPress={openCart} text="View Cart"></OutLineButton>
          </View>
        </View>
      </Pressable>
    </NativeModal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: appPadding,
    padding: appPadding,
    margin: appPadding,
    width: "90%",
    alignItems: "center",
  },

  text: {
    textAlign: "center",
    paddingVertical: spacing[2],
    fontFamily: FontFamily.Medium,
    fontSize: normalize(16),
  },
});
