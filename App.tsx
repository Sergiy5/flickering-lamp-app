import { useState } from 'react';
import { StatusBar, Text, View } from 'react-native';
import {
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useColorScheme } from 'nativewind';
import './global.css';
import PermissionsScreen from '@/screens/PermissionScreen';
import { Navigation } from '@/navigation/Navigation';
import { LedLampAnalyzer } from '@/components/analyzer/LedLampAnalyzer';

function App() {
  const [permissionsGranted, setPermissionsGranted] = useState(false);
  const device = useCameraDevice('front');
  const { hasPermission } = useCameraPermission();
  const isDarkMode = useColorScheme().colorScheme === 'dark';

   if (!hasPermission) {
     return <PermissionsScreen onGranted={() => setPermissionsGranted(true)} />;
   }
  const isDevMode = __DEV__;

  // console.log('device', device);
  // console.log('hasPermission', hasPermission);

  return (
    <SafeAreaProvider>
      <StatusBar
        barStyle={isDarkMode || isDevMode ? 'dark-content' : 'light-content'}
      />
      <View className={'flex-1'}>
        {/* <Navigation /> */}
        {/* <Camera device={device} isActive={true} className="bg-red-500" />; */}
        {device == null ? (
          <Text className="text-red-500">Camera device not found</Text>
        ) : (
            <LedLampAnalyzer />
        )}
      </View>
    </SafeAreaProvider>
  );
}

export default App;
