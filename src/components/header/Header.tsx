import React from "react";
import { Text, View } from "react-native";
import { tailwind } from "../../theme/tailwind";
import { headerBaseClass, headerHeight, headerTitleClass } from "./constants";
import { headerLeftSlotClass, headerRightSlotClass } from "./styles";
import type { HeaderProps } from "./type";

export function Header({
  title,
  leftElement,
  rightElement,
  containerStyle,
  style,
  ...props
}: HeaderProps) {
  return (
    <View
      style={[tailwind(headerBaseClass), { height: headerHeight }, containerStyle, style]}
      {...props}
    >
      <View style={tailwind(headerLeftSlotClass)}>{leftElement}</View>
      <Text style={tailwind(headerTitleClass)}>{title}</Text>
      <View style={tailwind(headerRightSlotClass)}>{rightElement}</View>
    </View>
  );
}
