import { useEffect, useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Camera, CameraPermissionStatus } from 'react-native-vision-camera';

export default function PermissionsScreen({
  onGranted,
}: {
  onGranted: () => void;
}) {
  const [cameraPermission, setCameraPermission] =
    useState<CameraPermissionStatus>();

  useEffect(() => {
    const checkPermissions = async () => {
      const cam = await Camera.getCameraPermissionStatus();
      setCameraPermission(cam);
    };

    checkPermissions();
  }, []);

  const requestPermissions = async () => {
    const cam = await Camera.requestCameraPermission();

    // requestCameraPermission returns 'granted' or 'denied'
    // So we check the current status after requesting
    if (cam === 'granted') {
      const status = await Camera.getCameraPermissionStatus();
      setCameraPermission(status);
      onGranted();
    } else {
      // If denied, get the current status
      const status = await Camera.getCameraPermissionStatus();
      setCameraPermission(status);
    }
  };

  const allGranted = cameraPermission === 'granted';

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Permissions Required</Text>

      <Text style={styles.text}>This app needs access to your Camera</Text>

      {!allGranted && (
        <Pressable onPress={requestPermissions} style={styles.btn}>
          <Text style={styles.btnText}>Grant Permissions</Text>
        </Pressable>
      )}

      {allGranted && (
        <Pressable onPress={onGranted} style={styles.btn}>
          <Text style={styles.btnText}>Continue</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: { fontSize: 22, fontWeight: '600', marginBottom: 16 },
  text: { fontSize: 16, textAlign: 'center', marginBottom: 30 },
  btn: {
    padding: 14,
    paddingHorizontal: 30,
    backgroundColor: '#007AFF',
    borderRadius: 10,
  },
  btnText: { color: '#fff', fontSize: 16 },
});