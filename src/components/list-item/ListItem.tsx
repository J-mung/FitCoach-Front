import React from "react";
import {
  Pressable,
  Text,
  View,
  type PressableStateCallbackType,
} from "react-native";
import {
  listItemBaseStyle,
  listItemDescriptionStyle,
  listItemTitleStyle,
} from "./constants";
import { styles } from "./styles";
import type { ListItemProps } from "./type";

export function ListItem({
  title,
  description,
  rightElement,
  containerStyle,
  style,
  hitSlop,
  accessibilityRole,
  ...props
}: ListItemProps) {
  const resolvedHitSlop = hitSlop ?? { top: 4, bottom: 4, left: 6, right: 6 };
  const resolvedAccessibilityRole = accessibilityRole ?? "button";
  // Pressable은 상태 기반 스타일 함수를 지원한다.
  const resolveStyle = (state: PressableStateCallbackType) => {
    const resolvedStyle = typeof style === "function" ? style(state) : style;
    return [
      listItemBaseStyle,
      state.pressed ? styles.pressed : null,
      containerStyle,
      resolvedStyle,
    ];
  };

  return (
    <Pressable
      style={resolveStyle}
      hitSlop={resolvedHitSlop}
      accessibilityRole={resolvedAccessibilityRole}
      {...props}
    >
      <View style={styles.content}>
        <Text style={listItemTitleStyle}>{title}</Text>
        {description ? (
          <Text style={listItemDescriptionStyle}>{description}</Text>
        ) : null}
      </View>
      {rightElement ? (
        // 우측 부가 요소는 간격을 확보한다.
        <View style={styles.rightSpacing}>{rightElement}</View>
      ) : null}
    </Pressable>
  );
}
