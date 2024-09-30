import {
  View,
  Text,
  SectionList,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { CartesianChart, Line, useChartPressState } from "victory-native";
import { useQuery } from "@tanstack/react-query";
import { CryptoInfo } from "@/services/info";
Animated.addWhitelistedNativeProps({ text: true });
import { Stack } from "expo-router";
import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import { Ionicons } from "@expo/vector-icons";
import { tickers } from "@/services/tickers";
import { Circle, useFont } from "@shopify/react-native-skia";
import { format } from "date-fns";
import * as Haptics from "expo-haptics";
import Animated, {
  SharedValue,
  useAnimatedProps,
} from "react-native-reanimated";
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);
const categories = ["Overview", "News", "Orders", "Transactions"];
type CryptoDetailsScreenProps = {
  id: string;
};
function ToolTip({ x, y }: { x: SharedValue<number>; y: SharedValue<number> }) {
  return <Circle cx={x} cy={y} r={8} color={Colors.primary} />;
}
const CryptoDetailsScreen = ({ id }: CryptoDetailsScreenProps) => {
  const [active, setActive] = useState(0);
  const font = useFont(require("@/assets/fonts/SpaceMono-Regular.ttf"), 12);
  const { state, isActive } = useChartPressState({ x: 0, y: { price: 0 } });

  const animatedText = useAnimatedProps(() => {
    return {
      text: `${state.y.price.value.value.toFixed(2)} €`,
      defaultValue: "",
    };
  });

  const animatedDateText = useAnimatedProps(() => {
    const date = new Date(state.x.value.value);
    return {
      text: `${date.toLocaleDateString()}`,
      defaultValue: "",
    };
  });

  useEffect(() => {
    console.log(isActive);
    if (isActive) Haptics.selectionAsync;
  }, [isActive]);
  //api
  const { data: ticker, isLoading: check } = useQuery({
    queryKey: ["tickers"],
    queryFn: (): Promise<any[]> => tickers(),
  });
  //api
  const { data, isLoading } = useQuery({
    queryKey: ["cryptoDetails", id],
    queryFn: () => CryptoInfo(id),
  });
  // console.log(data?.[id].description);
  // console.log(query.data);
  if (isLoading || check) {
    return <Text>Loading...</Text>;
  }
  return (
    <>
      {isLoading ? null : <Stack.Screen options={{ title: data?.[id].name }} />}
      <SectionList
        contentInsetAdjustmentBehavior="automatic"
        keyExtractor={(i) => i.title}
        stickySectionHeadersEnabled={true}
        renderItem={({ item }) => (
          <>
            <View style={[defaultStyles.block, { height: 500 }]}>
              {ticker && (
                <>
                  {!isActive ? (
                    <View>
                      <Text style={styles.priceStyle}>
                        {ticker[ticker.length - 1].price.toFixed(2)}€
                      </Text>
                      <Text style={styles.dayStyle}>Today</Text>
                    </View>
                  ) : (
                    <View>
                      <AnimatedTextInput
                        editable={false}
                        underlineColorAndroid={"transparent"}
                        style={styles.priceStyle}
                        animatedProps={animatedText}
                      ></AnimatedTextInput>
                      <AnimatedTextInput
                        editable={false}
                        underlineColorAndroid={"transparent"}
                        style={styles.dayStyle}
                        animatedProps={animatedDateText}
                      ></AnimatedTextInput>
                    </View>
                  )}
                  <CartesianChart
                    axisOptions={{
                      font,
                      tickCount: 5,
                      labelOffset: { x: -2, y: 0 },
                      labelColor: Colors.gray,
                      formatYLabel: (v) => `${v}€`,
                      formatXLabel: (m) => format(new Date(m), "MM/yy"),
                    }}
                    chartPressState={state}
                    data={ticker!}
                    xKey="timestamp"
                    yKeys={["price"]}
                  >
                    {({ points }) => (
                      <>
                        <Line
                          points={points.price}
                          color={Colors.primary}
                          strokeWidth={3}
                        />
                        {isActive && (
                          <ToolTip
                            x={state.x.position}
                            y={state.y.price.position}
                          />
                        )}
                      </>
                    )}
                  </CartesianChart>
                </>
              )}
            </View>
            <View style={[defaultStyles.block, { marginTop: 20 }]}>
              <Text style={styles.subtitle}>Overview</Text>
              <Text>{data?.[id].description} </Text>
            </View>
          </>
        )}
        renderSectionHeader={() => (
          <>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                alignItems: "center",
                width: "100%",
                justifyContent: "space-between",
                paddingHorizontal: 16,
                paddingBottom: 8,
                paddingTop: 8,
                backgroundColor: Colors.background,
                borderBottomColor: Colors.lightGray,
                borderBottomWidth: StyleSheet.hairlineWidth,
              }}
            >
              {categories.map((item, index) => (
                <TouchableOpacity
                  onPress={() => setActive(index)}
                  style={
                    active === index
                      ? styles.categoriesBtnActive
                      : styles.categoriesBtn
                  }
                  key={item}
                >
                  <Text
                    style={
                      active === index
                        ? styles.categoryTextActive
                        : styles.categoryText
                    }
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </>
        )}
        sections={[{ data: [{ title: "hello" }] }]}
        ListHeaderComponent={() => (
          <>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginHorizontal: 16,
              }}
            >
              <Text style={defaultStyles.header}>{data?.[id].symbol}</Text>
              <Image
                source={{ uri: data?.[id].logo }}
                style={{ height: 50, width: 50 }}
              />
            </View>
            <View style={{ flexDirection: "row", gap: 10, margin: 12 }}>
              <TouchableOpacity
                style={[
                  defaultStyles.pillButtonSmall,
                  {
                    backgroundColor: Colors.primary,
                    flexDirection: "row",
                    gap: 16,
                  },
                ]}
              >
                <Ionicons name="add" size={24} color={"#fff"} />
                <Text style={[defaultStyles.buttonText, { color: "#fff" }]}>
                  Buy
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  defaultStyles.pillButtonSmall,
                  {
                    backgroundColor: Colors.primaryMuted,
                    flexDirection: "row",
                    gap: 16,
                  },
                ]}
              >
                <Ionicons name="arrow-back" size={24} color={Colors.primary} />
                <Text
                  style={[defaultStyles.buttonText, { color: Colors.primary }]}
                >
                  Receive
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      ></SectionList>
    </>
  );
};
const styles = StyleSheet.create({
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: Colors.gray,
  },
  categoryText: {
    fontSize: 14,
    color: Colors.gray,
  },
  categoryTextActive: {
    fontSize: 14,
    color: "#000",
  },
  categoriesBtn: {
    padding: 10,
    paddingHorizontal: 14,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
  categoriesBtnActive: {
    padding: 10,
    paddingHorizontal: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderRadius: 20,
  },
  priceStyle: {
    fontSize: 30,
    fontWeight: "bold",
    color: Colors.dark,
  },
  dayStyle: {
    fontSize: 18,
    color: Colors.gray,
  },
});

export default CryptoDetailsScreen;
