import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { cryptoListings } from "@/services/listings";
import { Currency } from "@/interfaces/crypto";
import { CryptoInfo } from "@/services/info";
import { Link } from "expo-router";
import { useHeaderHeight } from "@react-navigation/elements";
import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import { Ionicons } from "@expo/vector-icons";

const CryptoScreen = () => {
  const headerHeight = useHeaderHeight();
  const { data, isError, isLoading } = useQuery({
    queryKey: ["cryptos"],
    queryFn: cryptoListings,
  });
  //getting ids
  const ids: string = data?.map((currency: Currency) => currency.id).join(",");
  const info = useQuery({
    queryKey: ["crypto-info", ids],
    queryFn: () => CryptoInfo(ids),
    enabled: !!ids,
  });
  //   console.log(info);
  //   console.log(typeof ids);
  return (
    <ScrollView style={{ backgroundColor: Colors.background }}>
      <Text style={defaultStyles.sectionHeader}> Latest Cryptos</Text>
      <View style={defaultStyles.block}>
        {isLoading ? (
          <Text>Loading</Text>
        ) : (
          data.map((currencry: Currency) => (
            <Link href={`/crypto/${currencry.id}`} key={currencry.id} asChild>
              <TouchableOpacity style={styles.listStyle}>
                <Image
                  source={{ uri: info.data?.[currencry.id].logo }}
                  style={{ height: 32, width: 32 }}
                />
                <View style={{ flex: 1 }}>
                  <Text style={{ color: Colors.dark }}>{currencry.name}</Text>
                  <Text>{currencry.symbol} </Text>
                </View>
                <View style={{ alignItems: "flex-end" }}>
                  <Text>{currencry.quote.EUR.price.toFixed(2)} €</Text>
                  <View style={{ flexDirection: "row", gap: 4 }}>
                    <Ionicons
                      name={
                        currencry.quote.EUR.percent_change_1h > 0
                          ? "caret-up"
                          : "caret-down"
                      }
                      size={16}
                      color={
                        currencry.quote.EUR.percent_change_1h > 0
                          ? "green"
                          : "red"
                      }
                    />
                    <Text
                      style={{
                        color:
                          currencry.quote.EUR.percent_change_1h > 0
                            ? "green"
                            : "red",
                      }}
                    >
                      {currencry.quote.EUR.percent_change_1h.toFixed(2)} %
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </Link>
          ))
        )}
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  listStyle: {
    flexDirection: "row",
    gap: 14,
    alignItems: "center",
  },
});
export default CryptoScreen;
