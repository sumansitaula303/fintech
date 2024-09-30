import { View, Text } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import CryptoDetailsScreen from "@/screens/cryptoDetails";
type CryptoDetailsScreenProps = {
  id: number;
};
const CryptoDetails = () => {
  const id = useLocalSearchParams();
  const num = String(id.id);
  return <CryptoDetailsScreen id={num} />;
};

export default CryptoDetails;
