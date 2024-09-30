import { View, Text, ScrollView, StyleSheet, Button } from "react-native";
import React, { useMemo, useRef } from "react";
import { SubTrigger } from "zeego/context-menu";
import RoundButton from "@/components/RoundButton";
import { Ionicons } from "@expo/vector-icons";
import Dropdown from "./components/Dropdown";
import { useBalanceStore } from "@/store/balanceStore";
import { defaultStyles } from "@/constants/Styles";
import Colors from "@/constants/Colors";
import WidgetList from "@/components/SortableList/WidgetList";
import { useHeaderHeight } from "@react-navigation/elements";
import BottomSheet from "@gorhom/bottom-sheet";

const HomeScreen = () => {
  const { balance, runTransaction, transaction, clearTransaction } =
    useBalanceStore();
  const headerHeight = useHeaderHeight();
  const addMoney = () => {
    runTransaction({
      id: Math.floor(Math.random() * 100) + "a",
      amount: 100,
      date: new Date(),
      title: "Money added",
    });
  };
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["25%", "50%", "90%"], []);

  // handler to open bottom sheet
  const handleOpenBottomSheet = () => {
    bottomSheetRef.current?.expand();
  };

  // handler to close bottom sheet
  const handleCloseBottomSheet = () => {
    bottomSheetRef.current?.close();
  };
  const reversedTransaction = [...transaction].reverse();
  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={{ backgroundColor: Colors.background }}
        contentContainerStyle={{ paddingTop: headerHeight }}
      >
        <View style={styles.account}>
          <View style={styles.row}>
            <Text style={styles.balance}>{balance()}</Text>
            <Text style={styles.currency}>$</Text>
          </View>
        </View>
        <View style={styles.actionRow}>
          <RoundButton
            text="Add money"
            icon={"add"}
            onClick={handleOpenBottomSheet}
          />
          <RoundButton text="Exchange" icon={"refresh"} onClick={addMoney} />
          <RoundButton text="Details" icon={"list"} onClick={addMoney} />
          <Dropdown />
        </View>
        <Text style={defaultStyles.sectionHeader}>Transactions</Text>
        <View style={styles.transactions}>
          {transaction.length === 0 ? (
            <Text>No transcations performed</Text>
          ) : (
            reversedTransaction.map((transaction) => {
              const date = transaction.date + "a";
              const newDate = date.slice(0, 9);
              const newTime = date.slice(11, 18);
              return (
                <View
                  key={transaction.id}
                  style={{
                    flexDirection: "row",
                    padding: 10,
                    alignItems: "center",
                    gap: 5,
                  }}
                >
                  <View style={styles.circle}>
                    <Ionicons
                      name={transaction.amount > 0 ? "add" : "remove"}
                      size={24}
                      color={Colors.dark}
                    />
                  </View>
                  <View>
                    <Text>{transaction.title}</Text>
                    <Text>{newDate + ", " + newTime}</Text>
                  </View>
                  <View style={{ flex: 1 }} />
                  <View style={styles.details}>
                    <Text
                      style={
                        transaction.amount > 0
                          ? { color: "green" }
                          : { color: "red" }
                      }
                    >
                      {transaction.amount}
                    </Text>
                  </View>
                </View>
              );
            })
          )}
        </View>

        <WidgetList />
      </ScrollView>
      <BottomSheet snapPoints={snapPoints} ref={bottomSheetRef} index={-1}>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            borderRadius: 40,
            padding: 16,
          }}
        >
          <Text>hello</Text>
        </View>
      </BottomSheet>
    </View>
  );
};
const styles = StyleSheet.create({
  account: {
    margin: 80,
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "center",
    gap: 10,
  },
  balance: {
    fontSize: 60,
    fontWeight: "bold",
  },
  currency: {
    fontSize: 30,
    fontWeight: "500",
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
  transactions: {
    marginHorizontal: 5,
    backgroundColor: "white",
    borderRadius: 16,
    marginBottom: 20,
  },
  circle: {
    padding: 10,
    borderRadius: 30,
    backgroundColor: Colors.lightGray,
    justifyContent: "center",
    alignItems: "center",
  },
  details: {
    alignSelf: "flex-end",
    padding: 10,
    borderRadius: 16,
  },
});
export default HomeScreen;
