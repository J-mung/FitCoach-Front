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
  ...props
}: ListItemProps) {
  // Pressable은 상태 기반 스타일 함수를 지원한다.
  const resolveStyle = (state: PressableStateCallbackType) => {
    const resolvedStyle = typeof style === "function" ? style(state) : style;
    return [listItemBaseStyle, containerStyle, resolvedStyle];
  };

  return (
    <Pressable style={resolveStyle} {...props}>
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
