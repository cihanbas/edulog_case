import React, { FC, memo } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { NativeText } from "./Text";
import { COLORS } from "src/utils/theme";
import { spacing } from "src/utils/constants";
import { normalize } from "src/utils/normalize";
interface Props {
  loading: boolean;
}
const Loading: FC<Props> = memo(({ loading }) => {
  return loading ? (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={COLORS.primary} />
      <NativeText style={styles.text}>Please Wait...</NativeText>
    </View>
  ) : null;
});

export { Loading };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...StyleSheet.absoluteFillObject,
    zIndex: 3,
    backgroundColor: "rgba(255,255,255,0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: COLORS.primary,
    padding: spacing[1],
    fontSize: normalize(18),
    fontWeight: "600",
  },
  lottie: { height: 250, width: 250 },
});
