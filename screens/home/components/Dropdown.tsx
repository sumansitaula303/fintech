import { View, Text } from "react-native";
import React from "react";
import * as DropdownMenu from "zeego/dropdown-menu";
import RoundButton from "@/components/RoundButton";
const Dropdown = () => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <RoundButton icon={"ellipsis-horizontal"} text={"more"} />
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Item key="statement">
          <DropdownMenu.ItemTitle>Statement</DropdownMenu.ItemTitle>
        </DropdownMenu.Item>
        <DropdownMenu.Item key="statement">
          <DropdownMenu.ItemTitle>Statement</DropdownMenu.ItemTitle>
        </DropdownMenu.Item>
        <DropdownMenu.Item key="statement">
          <DropdownMenu.ItemTitle>Statement</DropdownMenu.ItemTitle>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default Dropdown;
