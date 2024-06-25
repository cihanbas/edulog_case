import React from "react";
import { Keyboard, Pressable, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchBar from "src/components/SearchBar";

const SearchScreen = () => {
  return (
    <SafeAreaView className="flex-1">
      <Pressable onPress={Keyboard.dismiss} className="flex-1">
        <SearchBar autoFocus />
      </Pressable>
    </SafeAreaView>
  );
};

export { SearchScreen };

const styles = StyleSheet.create({});
