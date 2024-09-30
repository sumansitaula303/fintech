import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { BlurView } from "expo-blur";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";
import { defaultStyles } from "@/constants/Styles";
import { Link, useRouter } from "expo-router";

const CustomHeader = () => {
  const router = useRouter();
  const { top } = useSafeAreaInsets();
  return (
    <BlurView intensity={80} tint="extraLight" style={{ paddingTop: top }}>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: "/(authenticated)/(modals)/account",
            })
          }
          style={defaultStyles.circle}
        >
          <Text>SS</Text>
        </TouchableOpacity>
        <View style={styles.searchSection}>
          <Ionicons
            style={styles.searchIcon}
            name="search"
            size={20}
            color={Colors.dark}
          />
          <TextInput style={styles.input} placeholder="Search" />
        </View>
        <View style={defaultStyles.circle}>
          <Ionicons name="stats-chart" size={20} color={Colors.dark} />
        </View>
        <View style={defaultStyles.circle}>
          <Ionicons name="card" size={20} color={Colors.dark} />
        </View>
      </View>
    </BlurView>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    borderRadius: 20,
    gap: 10,
    height: 60,
    backgroundColor: "transparent",
  },
  roundedBtn: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    color: Colors.gray,
  },
  searchSection: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 30,
    alignItems: "center",
    backgroundColor: Colors.lightGray,
  },
  searchIcon: {
    padding: 10,
  },
  input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    borderRadius: 30,
    paddingLeft: 0,
    backgroundColor: Colors.lightGray,
    color: Colors.dark,
  },
});
export default CustomHeader;
