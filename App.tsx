/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { StatusBar, Text, View } from 'react-native';
import {
  SafeAreaProvider,
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { tailwind } from './src/theme/tailwind';

function App() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" />
      <AppContent />
    </SafeAreaProvider>
  );
}

function AppContent() {
  const safeAreaInsets = useSafeAreaInsets();

  return (
    <SafeAreaView style={tailwind('flex-1 bg-bg-screen')} edges={['top', 'bottom']}>
      <View style={[tailwind('flex-1 bg-bg-screen px-16 pb-24'), { paddingTop: safeAreaInsets.top }]}>
        <Text style={tailwind('font-sans text-text-primary text-title-lg font-bold mt-16')}>
          FitCoach Tokens
        </Text>
        <Text style={tailwind('font-sans text-text-secondary text-body-md mt-8 mb-24')}>
          Design tokens baseline preview
        </Text>

        <View style={tailwind('bg-bg-card border border-border rounded-md p-16 shadow-sm')}>
          <Text style={tailwind('font-sans text-text-primary text-title-md font-semibold mb-8')}>
            Recommendation
          </Text>
          <Text style={tailwind('font-sans text-text-secondary text-body-md mb-16')}>
            오늘은 하체 루틴이 적합해요. 최근 2일간 상체 비중이 높았습니다.
          </Text>
          <View style={tailwind('bg-primary-500 py-12 rounded-md items-center')}>
            <Text style={tailwind('font-sans text-bg-card text-body-md font-semibold')}>
              Start Workout
            </Text>
          </View>
        </View>

        <View style={tailwind('flex-row mt-20')} >
          <View style={tailwind('bg-primary-100 border border-primary-500 rounded-full px-12 py-6 mr-8')}>
            <Text style={tailwind('font-sans text-primary-500 text-body-sm font-semibold')}>
              Selected
            </Text>
          </View>
          <View style={tailwind('bg-bg-card border border-border rounded-full px-12 py-6')}>
            <Text style={tailwind('font-sans text-text-secondary text-body-sm')}>
              Default
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default App;
