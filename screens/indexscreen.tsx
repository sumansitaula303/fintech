import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useAssets } from "expo-asset";
import { ResizeMode, Video } from "expo-av";
import { Link } from "expo-router";
import { Route } from "expo-router/build/Route";
import { defaultStyles } from "@/constants/Styles";
import Colors from "@/constants/Colors";

const IndexScreen = () => {
  const [assets] = useAssets([require("@/assets/videos/intro.mp4")]);
  return (
    <View style={styles.container}>
      {assets && (
        <Video
          isMuted
          isLooping
          shouldPlay
          resizeMode={ResizeMode.COVER}
          style={styles.video}
          source={{ uri: assets[0].uri }}
        />
      )}
      <View style={{ marginTop: 40, padding: 20 }}>
        <Text style={styles.header}>Ready to change the way you money?</Text>
      </View>
      <View style={styles.buttons}>
        <Link
          href={"/login"}
          style={[
            defaultStyles.pillButton,
            { flex: 1, backgroundColor: Colors.dark },
          ]}
          asChild
        >
          <TouchableOpacity>
            <Text style={{ color: "white", fontSize: 22, fontWeight: "500" }}>
              Log In
            </Text>
          </TouchableOpacity>
        </Link>
        <Link
          href={"/signUp"}
          style={[
            defaultStyles.pillButton,
            { flex: 1, backgroundColor: "#fff" },
          ]}
          asChild
        >
          <TouchableOpacity>
            <Text style={{ color: "black", fontSize: 22, fontWeight: "500" }}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  video: {
    height: "100%",
    width: "100%",
    position: "absolute",
    resizeMode: "contain",
  },
  header: {
    fontSize: 40,
    color: "white",
    textTransform: "uppercase",
    fontWeight: "900",
  },
  buttons: {
    flexDirection: "row",
    marginBottom: 40,
    padding: 30,
    justifyContent: "center",
  },
});

export default IndexScreen;
