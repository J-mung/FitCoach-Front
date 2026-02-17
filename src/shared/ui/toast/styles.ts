import { StyleSheet } from "react-native";
import type { ViewStyle } from "react-native";

export const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 16,
    right: 16,
    bottom: 0,
    alignItems: "center",
  },
  toastBase: {
    minHeight: 44,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    width: "100%",
    justifyContent: "center",
  },
  message: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
});

export const toastToneStyles: Record<"success" | "error" | "info", ViewStyle> = {
  success: {
    backgroundColor: "#2F9E44",
  },
  error: {
    backgroundColor: "#E03131",
  },
  info: {
    backgroundColor: "#364FC7",
  },
};
