import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import IndexScreen from "@/screens/indexscreen";
import { useAssets } from "expo-asset";
import { ResizeMode, Video } from "expo-av";
import { Link } from "expo-router";

const Page = () => {
  return <IndexScreen />;
};

export default Page;
