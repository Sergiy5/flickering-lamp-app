import './global.css';
import { StatusBar, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Navigation } from '@/navigation/Navigation';
import { useColorScheme } from 'nativewind';

function App() {
  const isDarkMode = useColorScheme().colorScheme === 'dark';

  const isDevMode = __DEV__;

  return (
    <SafeAreaProvider>
      <View className={'flex-1'}>
        <StatusBar barStyle={isDarkMode || isDevMode ? 'dark-content' : 'light-content'} />
        <Navigation />
      </View>
    </SafeAreaProvider>
  );
}

export default App;
