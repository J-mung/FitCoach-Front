/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { StatusBar, View } from 'react-native';
import {
  SafeAreaProvider,
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { Button, Card, Typography } from './src/components';
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
    <SafeAreaView
      style={tailwind('flex-1 bg-bg-screen')}
      edges={['top', 'bottom']}
    >
      <View
        style={[
          tailwind('flex-1 bg-bg-screen px-16 pb-24'),
          { paddingTop: safeAreaInsets.top },
        ]}
      >
        <Typography variant="titleLg">FitCoach Tokens</Typography>
        <Typography
          variant="bodyMd"
          tone="secondary"
          style={tailwind('mt-8 mb-24')}
        >
          Design tokens baseline preview
        </Typography>

        <Card style={tailwind('shadow-sm')}>
          <Typography variant="titleMd" style={tailwind('mb-8')}>
            Recommendation
          </Typography>
          <Typography
            variant="bodyMd"
            tone="secondary"
            style={tailwind('mb-16')}
          >
            오늘은 하체 루틴이 적합해요. 최근 2일간 상체 비중이 높았습니다.
          </Typography>
          <Button title="Start Workout" />
        </Card>

        <View style={tailwind('flex-row mt-20')}>
          <View
            style={tailwind(
              'bg-primary-100 border border-primary-500 rounded-full px-12 py-6 mr-8',
            )}
          >
            <Typography
              variant="bodySm"
              style={tailwind('text-primary-500 font-semibold')}
            >
              Selected
            </Typography>
          </View>
          <View
            style={tailwind(
              'bg-bg-card border border-border rounded-full px-12 py-6',
            )}
          >
            <Typography variant="bodySm" tone="secondary">
              Default
            </Typography>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default App;
