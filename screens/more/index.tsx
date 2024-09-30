import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import {
  ArrowRight2,
  Lock1,
  Logout,
  Messages1,
  Profile2User,
} from "iconsax-react-native";
import { defaultStyles } from "@/constants/Styles";
import { useAuth, useUser } from "@clerk/clerk-expo";
import Colors from "@/constants/Colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
const seetingsOptions = [
  {
    image: <Lock1 size="32" color="#185cab" />,
    title: "Change Password",
    onPress: () => null,
  },
  {
    image: <Profile2User size="32" color="#185cab" />,
    title: "Switch Login Role",
    onPress: () => null,
  },
  {
    image: <Messages1 size="32" color="#185cab" />,
    title: "Feedbacks",
    onPress: () => null,
  },
  {
    image: <Logout size="32" color="#185cab" />,
    title: "Logout",
    onPress: () => null,
  },
];
const MoreScreen = () => {
  const { user } = useUser();
  const { top } = useSafeAreaInsets();
  return (
    <View style={[defaultStyles.container, { marginTop: top }]}>
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <View style={styles.shadowBox}>
          {user?.imageUrl && (
            <Image source={{ uri: user?.imageUrl }} style={styles.avatar} />
          )}
        </View>
      </View>
      <View
        style={{
          marginTop: 24,
          alignItems: "center",
          gap: 10,
          marginBottom: 20,
        }}
      >
        <Text style={styles.textStyle}>
          {user?.firstName} {user?.lastName}
        </Text>
        <Text style={{ fontSize: 16 }}>{`${user?.phoneNumbers}`}</Text>
        <Text style={{ fontSize: 16, color: "green" }}>RN </Text>
        <Text style={{ fontSize: 16 }}>Kathmandu Medical College</Text>
      </View>
      {seetingsOptions.map((option) => {
        return (
          <TouchableOpacity
            style={{ marginTop: 16 }}
            key={option.title}
            onPress={option.onPress}
          >
            <View style={{ flexDirection: "row", gap: 10 }}>
              {option.image}
              <Text style={{ fontSize: 16 }}>{option.title}</Text>
              <View style={{ flex: 1 }} />
              <ArrowRight2 size="28" color="#000" />
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
const styles = StyleSheet.create({
  avatar: {
    width: 165,
    borderWidth: 1,
    borderColor: "white",
    height: 165,
    borderRadius: 165,
  },
  shadowBox: {
    shadowColor: "black",
    borderRadius: 166,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0,
    shadowRadius: 5,
    elevation: 20, // This is for Android shadow
  },
  textStyle: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
export default MoreScreen;
