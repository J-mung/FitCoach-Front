import React from "react";
import { ActivityIndicator, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useOnboardingStatus } from "@features/onboarding/model";
import { CoachScreen } from "@pages/coach/CoachScreen";
import { HistoryScreen } from "@pages/history/HistoryScreen";
import { HomeScreen } from "@pages/home/HomeScreen";
import { OnboardingScreen } from "@pages/onboarding/OnboardingScreen";
import { ProfileScreen } from "@pages/profile/ProfileScreen";
import { getTabBarStyle, tabBarLabelStyle } from "./styles";
import { resolveAppGateState } from "./gate";

export type RootTabParamList = {
  Home: undefined;
  History: undefined;
  Coach: undefined;
  Profile: undefined;
};

export type RootStackParamList = {
  MainTabs: undefined;
  Onboarding: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

function MainTabs() {
  const insets = useSafeAreaInsets();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: getTabBarStyle(insets),
        tabBarLabelStyle,
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="History" component={HistoryScreen} />
      <Tab.Screen name="Coach" component={CoachScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export function RootNavigator() {
  const { isReady, isCompleted } = useOnboardingStatus();
  const insets = useSafeAreaInsets();
  const gate = resolveAppGateState({ isReady, isCompleted });

  if (gate === "booting") {
    // 온보딩 상태 복원 중에는 로딩 화면을 표시한다.
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        }}
      >
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {gate === "main-tabs" ? (
        // 완료 상태에서는 메인 탭만 렌더해 즉시 전환을 보장한다.
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="MainTabs" component={MainTabs} />
        </Stack.Navigator>
      ) : (
        // 미완료 상태에서는 온보딩 화면만 렌더한다.
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
