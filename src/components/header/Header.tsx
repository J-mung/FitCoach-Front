import React from "react";
import { Text, View } from "react-native";
import { headerBaseStyle, headerHeight, headerTitleStyle } from "./constants";
import { styles } from "./styles";
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
      style={[headerBaseStyle, { height: headerHeight }, containerStyle, style]}
      {...props}
    >
      {/* 좌/우 슬롯은 고정 폭으로 정렬한다. */}
      <View style={styles.leftSlot}>{leftElement}</View>
      <Text style={headerTitleStyle}>{title}</Text>
      <View style={styles.rightSlot}>{rightElement}</View>
    </View>
  );
}
