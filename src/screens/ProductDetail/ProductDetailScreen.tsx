import { AntDesign } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useQuery } from "@tanstack/react-query";
import { FontFamily } from "assets/fonts/fontFamilyTypes";
import { Image } from "expo-image";
import React, { useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { NativeText } from "src/components";
import { Button } from "src/components/Button";
import { Loading } from "src/components/Loader";
import { Modal } from "src/components/Modal/AddToBasketModal";
import { RootStackParamList } from "src/navigation/types";
import { api } from "src/services/api";
import { addItem } from "src/store/features/cart/cartSlice";
import { useAppDispatch } from "src/store/hooks";
import { HEADER_HEIGHT, appPadding, spacing, width } from "src/utils/constants";
import { normalize } from "src/utils/normalize";
import { COLORS } from "src/utils/theme";

export const ProductDetail: React.FC<
  NativeStackScreenProps<RootStackParamList, "ProductDetail">
> = ({ route, navigation }) => {
  const [modalStatus, setModalStatus] = useState(false);
  const { productID } = route.params!;
  const { data } = useQuery({
    queryKey: ["categoryDetail", productID],
    queryFn: async () => {
      const response = await (await api.productDetail(productID)).data;
      return response;
    },
  });

  const insets = useSafeAreaInsets();
  const scrollY = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef<ScrollView>(null);
  const close = () => {
    navigation.goBack();
  };
  const down = () => {
    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
  };
  const dispatch = useAppDispatch();
  const addToBasket = () => {
    dispatch(addItem(data!));
    setModalStatus(true);
  };
  const imageOpacity = scrollY.interpolate({
    inputRange: [0, width],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });
  const borderRadius = scrollY.interpolate({
    inputRange: [0, width / 2],
    outputRange: [30, 0],
    extrapolate: "clamp",
  });
  const textOpacity = scrollY.interpolate({
    inputRange: [width, width + HEADER_HEIGHT],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });
  const backgroundOpacity = scrollY.interpolate({
    inputRange: [width - HEADER_HEIGHT - 20, width],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });
  const zIndex = scrollY.interpolate({
    inputRange: [0, 1],
    outputRange: [4, 0],
    extrapolate: "clamp",
  });

  return (
    <View
      style={StyleSheet.flatten([styles.container, { marginTop: insets.top }])}
    >
      <Animated.View style={StyleSheet.flatten([styles.header, {}])}>
        <Animated.View
          style={StyleSheet.flatten([
            styles.headerBackground,
            {
              opacity: backgroundOpacity,
            },
          ])}
        />
        <Pressable style={styles.headerIcon} onPress={close}>
          <AntDesign name="close" size={24} color="black" />
        </Pressable>
        <Animated.View
          style={StyleSheet.flatten([
            {
              opacity: textOpacity,
            },
            styles.headerTextContent,
          ])}
        >
          <View style={{ flex: 1 }}>
            <Text numberOfLines={1}>{data?.title}</Text>
            <Text numberOfLines={1}>{data?.category}</Text>
          </View>
          <Pressable style={styles.headerIcon} onPress={down}>
            <AntDesign name="down" size={24} color="black" />
          </Pressable>
        </Animated.View>
      </Animated.View>
      {data ? (
        <>
          <View style={styles.relativeContainer}>
            <Animated.View
              style={[styles.carouselContainer, { opacity: imageOpacity }]}
            >
              <Image
                style={{ height: width, width }}
                source={{
                  uri: data.image,
                }}
                contentFit="contain"
                cachePolicy="memory-disk"
              />
            </Animated.View>
            <Animated.ScrollView
              contentContainerStyle={[styles.scrollView]}
              style={[styles.scrollViewStyle]}
              ref={scrollViewRef}
              bounces={false}
              disableScrollViewPanResponder={false}
              showsVerticalScrollIndicator={false}
              scrollEventThrottle={4}
              onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                { useNativeDriver: true }
              )}
            >
              <Animated.View style={[styles.content, { borderRadius }]}>
                <View style={{ alignItems: "center" }}>
                  <View style={styles.minus} />
                </View>
                <NativeText style={styles.actionText}>
                  {data.category}
                </NativeText>

                <NativeText style={styles.textTitle}>{data.title}</NativeText>

                <NativeText
                  style={styles.priceText}
                  fontFamily={FontFamily.Bold}
                >
                  ${data.price}
                </NativeText>
                <NativeText
                  style={styles.descriptionText}
                  fontFamily={FontFamily.Medium}
                >
                  {data.description}
                </NativeText>
                <NativeText style={styles.descriptionText}>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Corrupti dolor impedit harum laborum. Eius, tempora quam
                  cumque maiores explicabo harum sed blanditiis totam, dolorum
                  accusantium praesentium consequuntur. Harum, vel dolores Lorem
                  ipsum dolor sit, amet consectetur adipisicing elit. Corrupti
                  dolor impedit harum laborum. Eius, tempora quam cumque maiores
                  explicabo harum sed blanditiis totam, dolorum accusantium
                  praesentium consequuntur. Harum, vel dolores Lorem ipsum dolor
                  sit, amet consectetur adipisicing elit. Corrupti dolor impedit
                  harum laborum. Eius, tempora quam cumque maiores explicabo
                  harum sed blanditiis totam, dolorum accusantium praesentium
                  consequuntur. Harum, vel dolores Lorem ipsum dolor sit, amet
                  consectetur adipisicing elit. Corrupti dolor impedit harum
                  laborum. Eius, tempora quam cumque maiores explicabo harum sed
                  blanditiis totam, dolorum accusantium praesentium
                  consequuntur. Harum, vel dolores Lorem ipsum dolor sit, amet
                  consectetur adipisicing elit. Corrupti dolor impedit harum
                  laborum. Eius, tempora quam cumque maiores explicabo harum sed
                  blanditiis totam, dolorum accusantium praesentium
                  consequuntur. Harum, vel dolores Lorem ipsum dolor sit, amet
                  consectetur adipisicing elit. Corrupti dolor impedit harum
                  laborum. Eius, tempora quam cumque maiores explicabo harum sed
                  blanditiis totam, dolorum accusantium praesentium
                  consequuntur. Harum, vel dolores Lorem ipsum dolor sit, amet
                  consectetur adipisicing elit. Corrupti dolor impedit harum
                  laborum. Eius, tempora quam cumque maiores explicabo harum sed
                  blanditiis totam, dolorum accusantium praesentium
                  consequuntur. Harum, vel dolores Lorem ipsum dolor sit, amet
                  consectetur adipisicing elit. Corrupti dolor impedit harum
                  laborum. Eius, tempora quam cumque maiores explicabo harum sed
                  blanditiis totam, dolorum accusantium praesentium
                  consequuntur. Harum, vel dolores Lorem ipsum dolor sit, amet
                  consectetur adipisicing elit. Corrupti dolor impedit harum
                  laborum. Eius, tempora quam cumque maiores explicabo harum sed
                  blanditiis totam, dolorum accusantium praesentium
                  consequuntur. Harum, vel dolores Lorem ipsum dolor sit, amet
                  consectetur adipisicing elit. Corrupti dolor impedit harum
                  laborum. Eius, tempora quam cumque maiores explicabo harum sed
                  blanditiis totam, dolorum accusantium praesentium
                  consequuntur. Harum, vel dolores Lorem ipsum dolor sit, amet
                  consectetur adipisicing elit. Corrupti dolor impedit harum
                  laborum. Eius, tempora quam cumque maiores explicabo harum sed
                  blanditiis totam, dolorum accusantium praesentium
                  consequuntur. Harum, vel dolores Lorem ipsum dolor sit, amet
                  consectetur adipisicing elit. Corrupti dolor impedit harum
                  laborum. Eius, tempora quam cumque maiores explicabo harum sed
                  blanditiis totam, dolorum accusantium praesentium
                  consequuntur. Harum, vel dolores Lorem ipsum dolor sit, amet
                  consectetur adipisicing elit. Corrupti dolor impedit harum
                  laborum. Eius, tempora quam cumque maiores explicabo harum sed
                  blanditiis totam, dolorum accusantium praesentium
                  consequuntur. Harum, vel dolores Lorem ipsum dolor sit, amet
                  consectetur adipisicing elit. Corrupti dolor impedit harum
                  laborum. Eius, tempora quam cumque maiores explicabo harum sed
                  blanditiis totam, dolorum accusantium praesentium
                  consequuntur. Harum, vel dolores Lorem ipsum dolor sit, amet
                  consectetur adipisicing elit. Corrupti dolor impedit harum
                  laborum. Eius, tempora quam cumque maiores explicabo harum sed
                  blanditiis totam, dolorum accusantium praesentium
                  consequuntur. Harum, vel dolores Lorem ipsum dolor sit, amet
                  consectetur adipisicing elit. Corrupti dolor impedit harum
                  laborum. Eius, tempora quam cumque maiores explicabo harum sed
                  blanditiis totam, dolorum accusantium praesentium
                  consequuntur. Harum, vel dolores Lorem ipsum dolor sit, amet
                  consectetur adipisicing elit. Corrupti dolor impedit harum
                  laborum. Eius, tempora quam cumque maiores explicabo harum sed
                  blanditiis totam, dolorum accusantium praesentium
                  consequuntur. Harum, vel dolores Lorem ipsum dolor sit, amet
                  consectetur adipisicing elit. Corrupti dolor impedit harum
                  laborum. Eius, tempora quam cumque maiores explicabo harum sed
                  blanditiis totam, dolorum accusantium praesentium
                  consequuntur. Harum, vel dolores
                </NativeText>
              </Animated.View>
            </Animated.ScrollView>
            <View
              style={[
                styles.footer,
                { paddingBottom: insets.bottom + appPadding },
              ]}
            >
              <NativeText style={styles.textTitle}>${data.price}</NativeText>
              <Button
                text="Add to basket"
                onPress={addToBasket}
                style={styles.btn}
              ></Button>
            </View>
          </View>
        </>
      ) : (
        <Loading loading={true} />
      )}
      <Modal visible={modalStatus} onPress={() => setModalStatus(false)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  relativeContainer: {
    // position: 'relative',
    flex: 1,
    backgroundColor: COLORS.white,
  },
  carouselContainer: {
    height: width,
    position: "absolute",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  scrollViewStyle: {
    zIndex: 0,
  },
  scrollView: {
    flexGrow: 1,
    paddingTop: width,
    // backgroundColor: "#edf5fc",
  },

  priceText: {
    paddingVertical: spacing[1],
    color: COLORS.primary,
    fontSize: normalize(24),
  },
  descriptionText: {
    fontWeight: "400",
    paddingVertical: spacing[1],
  },
  actionText: {
    fontWeight: "400",
    color: COLORS.primary,
  },
  content: {
    opacity: 1,
    padding: appPadding,
    backgroundColor: COLORS.white,
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    shadowColor: "#000",

    elevation: 5,
  },
  errorPage: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  error: {
    color: "red",
  },
  headerIcon: {
    justifyContent: "center",
    width: HEADER_HEIGHT,
    height: HEADER_HEIGHT,
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderRadius: HEADER_HEIGHT,
  },
  header: {
    width: "100%",
    position: "absolute",

    zIndex: 5,
    paddingHorizontal: appPadding,
    justifyContent: "space-between",
    flexDirection: "row",
    paddingVertical: spacing[1],
  },
  headerTextContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  headerBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.white,
  },
  textTitle: {
    fontFamily: FontFamily.Medium,
    fontSize: normalize(21),
    paddingVertical: 10,
    flex: 1,
  },
  minus: {
    height: 2,
    width: 40,
    backgroundColor: "black",
    marginBottom: 10,
  },
  footer: {
    paddingHorizontal: appPadding,
    flexDirection: "row",
    justifyContent: "space-between",

    paddingVertical: spacing[2],

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
  btn: { flex: 1, marginLeft: appPadding },
});
