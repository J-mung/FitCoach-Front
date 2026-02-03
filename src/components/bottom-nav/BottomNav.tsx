import React from "react";
import {
  Pressable,
  Text,
  View,
  type PressableStateCallbackType,
} from "react-native";
import { tailwind } from "../../theme/tailwind";
import {
  bottomNavActiveTextClass,
  bottomNavContainerClass,
  bottomNavHeight,
  bottomNavInactiveTextClass,
  bottomNavItemBaseClass,
  bottomNavLabelClass,
} from "./constants";
import type { BottomNavProps } from "./type";
import { bottomNavIconSpacingClass, bottomNavItemPressedClass } from "./styles";

export function BottomNav({
  items,
  activeKey,
  onChange,
  disabled,
  containerStyle,
}: BottomNavProps) {
  return (
    <View style={[tailwind(bottomNavContainerClass), { height: bottomNavHeight }, containerStyle]}>
      {items.map((item) => {
        const isActive = item.key === activeKey;
        const labelClass = `${bottomNavLabelClass} ${
          isActive ? bottomNavActiveTextClass : bottomNavInactiveTextClass
        }`;
        const resolveStyle = (state: PressableStateCallbackType) => [
          tailwind(bottomNavItemBaseClass),
          state.pressed ? tailwind(bottomNavItemPressedClass) : null,
        ];

        return (
          <Pressable
            key={item.key}
            style={resolveStyle}
            disabled={disabled}
            onPress={() => onChange?.(item.key)}
          >
            {item.icon ? (
              <View style={tailwind(bottomNavIconSpacingClass)}>{item.icon}</View>
            ) : null}
            <Text style={tailwind(labelClass)}>{item.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}
