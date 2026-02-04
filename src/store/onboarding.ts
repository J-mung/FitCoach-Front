import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

// 온보딩 완료 여부를 저장하는 AsyncStorage 키.
const STORAGE_KEY = "fitcoach.onboarding.completed";

type OnboardingState = {
  isReady: boolean;
  isCompleted: boolean;
  refresh: () => Promise<void>;
  setCompleted: (value: boolean) => Promise<void>;
};

export const useOnboardingStore = create<OnboardingState>((set) => ({
  isReady: false,
  isCompleted: false,
  refresh: async () => {
    // 앱 시작 시 1회 스토리지 값을 복원.
    const storedValue = await AsyncStorage.getItem(STORAGE_KEY);
    set({
      isCompleted: storedValue === "true",
      isReady: true,
    });
  },
  setCompleted: async (value: boolean) => {
    // 메모리 상태와 스토리지를 동기화.
    set({ isCompleted: value });
    await AsyncStorage.setItem(STORAGE_KEY, value ? "true" : "false");
  },
}));
