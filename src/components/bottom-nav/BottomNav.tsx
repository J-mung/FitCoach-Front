import React from "react";
import {
  Pressable,
  Text,
  View,
  type PressableStateCallbackType,
} from "react-native";
import {
  bottomNavActiveTextStyle,
  bottomNavContainerStyle,
  bottomNavHeight,
  bottomNavInactiveTextStyle,
  bottomNavItemBaseStyle,
  bottomNavLabelStyle,
} from "./constants";
import type { BottomNavProps } from "./type";
import { styles } from "./styles";

export function BottomNav({
  items,
  activeKey,
  onChange,
  disabled,
  containerStyle,
}: BottomNavProps) {
  return (
    <View style={[bottomNavContainerStyle, { height: bottomNavHeight }, containerStyle]}>
      {items.map((item) => {
        // 현재 활성 탭 여부에 따라 라벨 색상을 결정한다.
        const isActive = item.key === activeKey;
        const labelStyle = isActive ? bottomNavActiveTextStyle : bottomNavInactiveTextStyle;
        // 눌림 상태에 반응하는 Pressable 스타일.
        const resolveStyle = (state: PressableStateCallbackType) => [
          bottomNavItemBaseStyle,
          state.pressed ? styles.itemPressed : null,
        ];

        return (
          <Pressable
            key={item.key}
            style={resolveStyle}
            disabled={disabled}
            onPress={() => onChange?.(item.key)}
          >
            {item.icon ? (
              <View style={styles.iconSpacing}>{item.icon}</View>
            ) : null}
            <Text style={[bottomNavLabelStyle, labelStyle]}>{item.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}
