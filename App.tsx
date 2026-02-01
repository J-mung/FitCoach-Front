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
import { Button, Card, Chip, Input, ListItem, Typography } from './src/components';
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
          <Chip label="Selected" variant="selected" style={tailwind('mr-8')} />
          <Chip label="Default" />
        </View>

        <View style={tailwind('mt-20')}>
          <Input label="Weight" placeholder="Enter kg" keyboardType="numeric" />
        </View>

        <View style={tailwind('mt-20 rounded-md overflow-hidden border border-border')}>
          <ListItem
            title="Workout History"
            description="Last session: Upper Body"
          />
          <ListItem
            title="View Stats"
            description="Weekly volume overview"
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

export default App;
