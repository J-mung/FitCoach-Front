import React from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Header } from "../components";
import { NAV_BAR_HEIGHT, TAB_BAR_HEIGHT } from "./constants";
import { styles } from "./styles";
import type { LayoutShellProps } from "./types";

export function LayoutShell({
  title,
  children,
  contentBottomInset = "tab",
}: LayoutShellProps) {
  const safeAreaInsets = useSafeAreaInsets();
  const contentPaddingBottom =
    contentBottomInset === "tab" ? TAB_BAR_HEIGHT + safeAreaInsets.bottom : 0;

  return (
    <View style={styles.shell}>
      {/* 상태바 영역(노치/상단 안전 영역)을 비운다. */}
      <View style={[styles.statusBar, { height: safeAreaInsets.top }]} />
      <Header title={title} containerStyle={{ height: NAV_BAR_HEIGHT }} />
      <View
        style={[
          styles.content,
          { paddingBottom: contentPaddingBottom },
        ]}
      >
        {children}
      </View>
    </View>
  );
}
