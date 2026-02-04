import { Platform } from "react-native";

export type PlatformOS = (typeof Platform)["OS"];

export type UsePlatformResult = {
  os: PlatformOS;
  isIOS: boolean;
  isAndroid: boolean;
  isWeb: boolean;
  isNative: boolean;
  select: typeof Platform.select;
};

export function usePlatform(): UsePlatformResult {
  const os = Platform.OS;

  return {
    os,
    isIOS: os === "ios",
    isAndroid: os === "android",
    isWeb: os === "web",
    isNative: os === "ios" || os === "android",
    select: Platform.select,
  };
}
