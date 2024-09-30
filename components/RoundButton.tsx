import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
type RoundButtonProps = {
  text: string;
  icon: typeof Ionicons.defaultProps;
  onClick?: () => void;
};
const RoundButton = ({ text, icon, onClick }: RoundButtonProps) => {
  return (
    <TouchableOpacity onPress={onClick} style={styles.container}>
      <View style={styles.circle}>
        <Ionicons name={icon} size={30} color={Colors.dark} />
      </View>
      <Text>{text}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    gap: 10,
  },
  circle: {
    padding: 10,
    borderRadius: 30,
    backgroundColor: Colors.lightGray,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default RoundButton;
