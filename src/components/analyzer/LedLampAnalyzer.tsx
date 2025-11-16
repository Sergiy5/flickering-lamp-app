import React, { useRef, useState } from 'react';
import {
  Switch,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  // PermissionsAndroid,
  // Platform,
} from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';

/**
 * LED Lamp Analyzer — React Native component
 * - Minimal UI (light/dark) with yellow accent
 * - Uses camera to capture video frames and run lightweight quality checks:
 *    • Average luminance (brightness)
 *    • Color temperature estimate (approx: warm/cool)
 *    • Flicker detection (frame-to-frame brightness variance)
 * - NOTE: This is a prototype. Actual medical recommendations require expert validation.
 *
 * Dependencies required:
 * - npm install react-native-vision-camera
 * - Follow setup instructions at: https://react-native-vision-camera.com/docs/guides
 */

interface Results {
  avgLuminance: number;
  flickerIndexApprox: number;
  colorRatio: number;
  colorTempLabel: string;
  recommendations: { area: string; severity: string; note: string }[];
  score: number;
}

export const LedLampAnalyzer = () => {
  const { hasPermission, requestPermission } = useCameraPermission();
  const device = useCameraDevice('back');

  const [streaming, setStreaming] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [results, setResults] = useState<Results | null>(null);
  const [dark, setDark] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const cameraRef = useRef<Camera>(null);

  async function startCamera() {
    setError(null);
console.log("start camera")
    if (!hasPermission) {
      const granted = await requestPermission();
      if (!granted) {
        setError('Camera permission denied');
        return;
      }
    }

    setStreaming(true);
  }

  function stopCamera() {
    setStreaming(false);
    console.log("stop camera")
    setScanning(false);
  }
  async function scanLamp() {
    if (!streaming || !cameraRef.current) {
      setError('Camera not running — start camera first.');
      return;
    }
    setScanning(true);
    setResults(null);
    setError(null);
    try {
      const frameCount = 30;
      const luminances = [];
      const avgColors = [];
      
      for (let i = 0; i < frameCount; i++) {
        console.log("first")
        const photo = await cameraRef.current.takeSnapshot({  //takePhoto
          // qualityPrioritization: 'speed',
          // flash: 'off',
        });

        // Simple brightness analysis from photo
        const sumL = await estimateBrightnessFromPhoto(photo.path);
        console.log('sumL_>>>>>>>>>>>>>>>>>>>', sumL);
        luminances.push(sumL.avgLuminance);
        avgColors.push(sumL.avgColor);

       await new Promise<void>(resolve => setTimeout(resolve, 33));
      }

      const avgLuminance =
        luminances.reduce((a, b) => a + b, 0) / luminances.length;
      const luminanceStd = Math.sqrt(
        luminances.reduce((s, v) => s + (v - avgLuminance) ** 2, 0) /
          luminances.length,
      );

      const flickerIndexApprox = luminanceStd / (avgLuminance + 1e-6);

      const avgColor = avgColors.reduce(
        (acc, c) => ({ r: acc.r + c.r, g: acc.g + c.g, b: acc.b + c.b }),
        { r: 0, g: 0, b: 0 },
      );
      avgColor.r /= avgColors.length;
      avgColor.g /= avgColors.length;
      avgColor.b /= avgColors.length;

      const colorRatio = (avgColor.r + 1) / (avgColor.b + 1);
      let colorTempLabel = 'Neutral';
      if (colorRatio >= 1.2) colorTempLabel = 'Warm (yellow/orange)';
      else if (colorRatio <= 0.8) colorTempLabel = 'Cool (blue/white)';

      const recommendations = [];

      if (avgLuminance < 40)
        recommendations.push({
          area: 'Brightness',
          severity: 'Low',
          note: 'May be too dim — could cause eye strain over time.',
        });
      else if (avgLuminance > 200)
        recommendations.push({
          area: 'Brightness',
          severity: 'High',
          note: 'Quite bright — might cause glare depending on distance.',
        });
      else
        recommendations.push({
          area: 'Brightness',
          severity: 'Good',
          note: 'Brightness within a comfortable range for reading/desk use (approx).',
        });

      if (colorTempLabel.startsWith('Cool'))
        recommendations.push({
          area: 'Color temperature',
          severity: 'Cool',
          note: 'Cool, blue-rich light can increase alertness but may disrupt sleep if used in the evening.',
        });
      else if (colorTempLabel.startsWith('Warm'))
        recommendations.push({
          area: 'Color temperature',
          severity: 'Warm',
          note: 'Warm light is gentler on the eyes in the evening and less likely to interfere with sleep.',
        });
      else
        recommendations.push({
          area: 'Color temperature',
          severity: 'Neutral',
          note: 'Color appears balanced.',
        });

      if (flickerIndexApprox > 0.08)
        recommendations.push({
          area: 'Flicker',
          severity: 'High',
          note: 'Detected noticeable temporal brightness variations — could cause headaches or visual discomfort in sensitive people.',
        });
      else if (flickerIndexApprox > 0.03)
        recommendations.push({
          area: 'Flicker',
          severity: 'Moderate',
          note: 'Minor flicker detected — may be noticeable to some users.',
        });
      else
        recommendations.push({
          area: 'Flicker',
          severity: 'Low',
          note: 'No significant flicker detected in the scanned interval.',
        });

      let score = 100;
      recommendations.forEach(r => {
        if (r.severity === 'Low') score -= 10;
        if (
          r.severity === 'High' ||
          r.severity === 'Cool' ||
          r.severity === 'Warm'
        )
          score -= 20;
        if (r.severity === 'Moderate') score -= 10;
      });
      if (score < 0) score = 0;

      setResults({
        avgLuminance: Math.round(avgLuminance),
        flickerIndexApprox: Number(flickerIndexApprox.toFixed(3)),
        colorRatio: Number(colorRatio.toFixed(2)),
        colorTempLabel,
        recommendations,
        score,
      });
    } catch (err) {
      setError('Error during scanning: ' + (err as Error).message);
    } finally {

      setScanning(false);
     }
  }

  // Simple brightness estimation (placeholder - requires proper image processing)
  async function estimateBrightnessFromPhoto(path: string) {
    // This is a simplified placeholder
    // In production, use a library like react-native-image-processing
    // or react-native-fast-image with pixel analysis
    const randomBrightness = 50 + Math.random() * 100;
    return {
      avgLuminance: randomBrightness,
      avgColor: {
        r: 120 + Math.random() * 50,
        g: 120 + Math.random() * 50,
        b: 120 + Math.random() * 50,
      },
    };
  }

  if (!device) {
    return (
      <View style={[styles.container, dark && styles.containerDark]}>
        <Text style={[styles.errorText, dark && styles.textDark]}>
          No camera device available
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, dark && styles.containerDark]}>
      <StatusBar barStyle={dark ? 'light-content' : 'dark-content'} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={[styles.title, dark && styles.textDark]}>
            LED Lamp Analyzer
          </Text>
          <View style={styles.controls}>
            <View style={styles.switchContainer}>
              <Switch
                value={dark}
                onValueChange={setDark}
                trackColor={{ false: '#d1d5db', true: '#4f46e5' }}
                thumbColor="#fff"
              />
              <Text style={[styles.switchLabel, dark && styles.textDark]}>
                Dark
              </Text>
            </View>
          </View>
        </View>

        <View style={[styles.card, dark && styles.cardDark]}>
          <View style={styles.cameraSection}>
            <View style={styles.cameraContainer}>
              {streaming && hasPermission ? (
                <Camera
                  ref={cameraRef}
                  style={styles.camera}
                  device={device}
                  isActive={streaming}
                  photo={true}
                />
              ) : (
                <View style={styles.cameraOff}>
                  <Text style={styles.cameraOffText}>Camera off</Text>
                </View>
              )}
            </View>

            <View style={styles.buttonGroup}>
              {!streaming ? (
                <TouchableOpacity
                  style={[styles.button, styles.primaryButton]}
                  onPress={startCamera}
                >
                  <Text style={styles.buttonText}>Start Camera</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={[styles.button, styles.primaryButton]}
                  onPress={stopCamera}
                >
                  <Text style={styles.buttonText}>Stop Camera</Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity
                style={[
                  styles.button,
                  styles.primaryButton,
                  (!streaming || scanning) && styles.buttonDisabled,
                ]}
                onPress={scanLamp}
                disabled={!streaming || scanning}
              >
                <Text style={styles.buttonText}>
                  {scanning ? 'Scanning...' : 'Scan Lamp'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.button,
                  styles.secondaryButton,
                  dark && styles.secondaryButtonDark,
                ]}
                onPress={() => {
                  setResults(null);
                  setError(null);
                }}
              >
                <Text
                  style={[styles.secondaryButtonText, dark && styles.textDark]}
                >
                  Reset
                </Text>
              </TouchableOpacity>
            </View>

            {error && <Text className='text-red-500 bg-blue-400'>{error}</Text>}
          </View>

          <View style={[styles.resultsSection, dark && styles.borderDark]}>
            <Text style={[styles.resultsTitle, dark && styles.textDark]}>
              Results
            </Text>

            {!results && (
              <Text style={[styles.noResults, dark && styles.textMutedDark]}>
                No scan yet. Point your camera at the lamp, ensure the lamp is
                the main light source in the frame, then press "Scan Lamp".
              </Text>
            )}

            {results && (
              <View style={styles.resultsContent}>
                <View style={styles.scoreContainer}>
                  <View>
                    <Text style={styles.scoreLabel}>Composite Score</Text>
                    <Text style={styles.scoreValue}>{results.score}%</Text>
                  </View>
                  <View style={styles.metrics}>
                    <Text style={[styles.metricText, dark && styles.textDark]}>
                      Brightness:{' '}
                      <Text style={styles.metricValue}>
                        {results.avgLuminance}
                      </Text>
                    </Text>
                    <Text style={[styles.metricText, dark && styles.textDark]}>
                      Flicker index:{' '}
                      <Text style={styles.metricValue}>
                        {results.flickerIndexApprox}
                      </Text>
                    </Text>
                    <Text style={[styles.metricText, dark && styles.textDark]}>
                      Color:{' '}
                      <Text style={styles.metricValue}>
                        {results.colorTempLabel}
                      </Text>
                    </Text>
                  </View>
                </View>

                <View style={styles.recommendations}>
                  {results.recommendations.map((r, i) => (
                    <View
                      key={i}
                      style={[styles.recommendation, dark && styles.borderDark]}
                    >
                      <View
                        style={[
                          styles.severityDot,
                          r.severity === 'Good' || r.severity === 'Low'
                            ? styles.severityGood
                            : r.severity === 'Moderate'
                              ? styles.severityModerate
                              : styles.severityHigh,
                        ]}
                      />
                      <View style={styles.recommendationContent}>
                        <Text
                          style={[
                            styles.recommendationTitle,
                            dark && styles.textDark,
                          ]}
                        >
                          {r.area} — {r.severity}
                        </Text>
                        <Text
                          style={[
                            styles.recommendationNote,
                            dark && styles.textMutedDark,
                          ]}
                        >
                          {r.note}
                        </Text>
                      </View>
                    </View>
                  ))}
                </View>

                <Text style={[styles.disclaimer, dark && styles.textMutedDark]}>
                  <Text style={styles.disclaimerBold}>
                    Health & safety note:
                  </Text>{' '}
                  This app provides heuristic guidance only. It does not replace
                  professional advice or calibrated measurements. For precise
                  lux/CRI/CCT readings use certified measurement equipment.
                </Text>
              </View>
            )}
          </View>

          <View style={styles.tips}>
            <Text style={[styles.tipsTitle, dark && styles.textDark]}>
              Quick tips for accurate scanning
            </Text>
            <Text style={[styles.tipText, dark && styles.textMutedDark]}>
              • Make the lamp the main light source in the frame
            </Text>
            <Text style={[styles.tipText, dark && styles.textMutedDark]}>
              • Scan for at least 1 second when lamp is stabilized
            </Text>
            <Text style={[styles.tipText, dark && styles.textMutedDark]}>
              • Compare during normal use (evening vs daytime matters)
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  containerDark: {
    backgroundColor: '#111827',
  },
  scrollContent: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#111827',
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  switchLabel: {
    fontSize: 14,
    color: '#111827',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cardDark: {
    backgroundColor: '#1f2937',
  },
  cameraSection: {
    marginBottom: 24,
  },
  cameraContainer: {
    aspectRatio: 16 / 9,
    backgroundColor: '#000',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 12,
  },
  camera: {
    flex: 1,
  },
  cameraOff: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraOffText: {
    color: '#9ca3af',
    fontSize: 14,
  },
  buttonGroup: {
    gap: 8,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: '#eab308',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: '#000',
    fontWeight: '600',
    fontSize: 14,
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  secondaryButtonDark: {
    borderColor: '#374151',
  },
  secondaryButtonText: {
    color: '#111827',
    fontWeight: '600',
    fontSize: 14,
  },
  errorText: {
    color: '#ef4444',
    fontSize: 14,
    marginTop: 8,
  },
  resultsSection: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    marginBottom: 16,
  },
  resultsTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: '#111827',
  },
  noResults: {
    fontSize: 14,
    marginTop: 8,
    color: '#6b7280',
  },
  resultsContent: {
    gap: 12,
  },
  scoreContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  scoreLabel: {
    fontSize: 12,
    color: '#9ca3af',
  },
  scoreValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#eab308',
  },
  metrics: {
    alignItems: 'flex-end',
  },
  metricText: {
    fontSize: 12,
    color: '#111827',
  },
  metricValue: {
    fontWeight: '500',
  },
  recommendations: {
    gap: 8,
  },
  recommendation: {
    flexDirection: 'row',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    gap: 12,
  },
  severityDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginTop: 4,
  },
  severityGood: {
    backgroundColor: '#4ade80',
  },
  severityModerate: {
    backgroundColor: '#facc15',
  },
  severityHigh: {
    backgroundColor: '#f87171',
  },
  recommendationContent: {
    flex: 1,
  },
  recommendationTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
    color: '#111827',
  },
  recommendationNote: {
    fontSize: 12,
    color: '#6b7280',
  },
  disclaimer: {
    fontSize: 11,
    marginTop: 8,
    color: '#6b7280',
  },
  disclaimerBold: {
    fontWeight: '600',
  },
  tips: {
    gap: 4,
  },
  tipsTitle: {
    fontSize: 11,
    fontWeight: '600',
    marginBottom: 4,
    color: '#111827',
  },
  tipText: {
    fontSize: 11,
    color: '#6b7280',
  },
  textDark: {
    color: '#f9fafb',
  },
  textMutedDark: {
    color: '#9ca3af',
  },
  borderDark: {
    borderColor: '#374151',
  },
});
