import React from "react";
import {
  Pressable,
  Text,
  View,
  type PressableStateCallbackType,
} from "react-native";
import { tailwind } from "../../theme/tailwind";
import {
  listItemBaseClass,
  listItemDescriptionClass,
  listItemTitleClass,
} from "./constants";
import type { ListItemProps } from "./type";

export function ListItem({
  title,
  description,
  rightElement,
  containerStyle,
  style,
  ...props
}: ListItemProps) {
  const resolveStyle = (state: PressableStateCallbackType) => {
    const resolvedStyle = typeof style === "function" ? style(state) : style;
    return [tailwind(listItemBaseClass), containerStyle, resolvedStyle];
  };

  return (
    <Pressable style={resolveStyle} {...props}>
      <View style={tailwind("flex-1")}> 
        <Text style={tailwind(listItemTitleClass)}>{title}</Text>
        {description ? (
          <Text style={tailwind(listItemDescriptionClass)}>{description}</Text>
        ) : null}
      </View>
      {rightElement ? <View style={tailwind("ml-12")}>{rightElement}</View> : null}
    </Pressable>
  );
}
