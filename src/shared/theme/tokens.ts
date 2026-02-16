import { Platform } from "react-native";

export const colors = {
  primary: {
    500: "#4C8DFF",
    400: "#6FA4FF",
    100: "#EAF1FF",
  },
  text: {
    primary: "#111111",
    secondary: "#6B7280",
    disabled: "#9CA3AF",
  },
  background: {
    screen: "#F7F8FA",
    card: "#FFFFFF",
    highlight: "#EEF4FF",
  },
  border: {
    default: "#E5E7EB",
    active: "#4C8DFF",
  },
};

export const radius = {
  sm: 6,
  md: 10,
  lg: 14,
  full: 999,
};

export const spacing = {
  4: 4,
  8: 8,
  12: 12,
  16: 16,
  20: 20,
  24: 24,
};

export const typography = {
  fontFamily: Platform.select({
    ios: "SF Pro Text",
    android: "Roboto",
    default: "System",
  }),
  titleLg: {
    fontSize: 20,
    fontWeight: "700" as const,
    lineHeight: 26,
  },
  titleMd: {
    fontSize: 16,
    fontWeight: "600" as const,
    lineHeight: 22,
  },
  bodyMd: {
    fontSize: 14,
    fontWeight: "400" as const,
    lineHeight: 20,
  },
  bodySm: {
    fontSize: 12,
    fontWeight: "400" as const,
    lineHeight: 18,
  },
  caption: {
    fontSize: 11,
    fontWeight: "400" as const,
    lineHeight: 16,
  },
};

export const shadows = {
  card: {
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
    elevation: 2,
  },
};
