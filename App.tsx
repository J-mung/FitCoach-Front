/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RootNavigator } from '@app/navigation';
import { ToastProvider } from '@shared/ui';

// 앱 전역에서 공유하는 QueryClient.
const queryClient = new QueryClient();

function App() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" />
      {/* 서버 연동 대비용 React Query Provider */}
      <QueryClientProvider client={queryClient}>
        <ToastProvider>
          <RootNavigator />
        </ToastProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}

export default App;
