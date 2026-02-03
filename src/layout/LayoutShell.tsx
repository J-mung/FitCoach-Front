import React from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { tailwind } from "../theme/tailwind";
import { Header } from "../components";
import { NAV_BAR_HEIGHT, TAB_BAR_HEIGHT } from "./constants";
import { layoutContentClass, layoutShellClass } from "./styles";
import type { LayoutShellProps } from "./types";

export function LayoutShell({ title, children }: LayoutShellProps) {
  const safeAreaInsets = useSafeAreaInsets();

  return (
    <View style={tailwind(layoutShellClass)}> 
      <View style={{ height: safeAreaInsets.top }} />
      <Header title={title} containerStyle={{ height: NAV_BAR_HEIGHT }} />
      <View
        style={[
          tailwind(layoutContentClass),
          { paddingBottom: TAB_BAR_HEIGHT + safeAreaInsets.bottom },
        ]}
      >
        {children}
      </View>
    </View>
  );
}
