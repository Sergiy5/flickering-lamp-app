import { cssInterop } from 'nativewind';
import { ImageBackground, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

cssInterop(LinearGradient, {
  className: {
    target: 'style', // className → style prop
  },
});

interface SAfeAreaContainerProps {
  className?: string;
  children?: React.ReactNode;
}
export const SafeAreaContainer: React.FC<SAfeAreaContainerProps> = ({
  className,
  children,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      className={`flex-1 bg-slate-100 ${className}`}
      style={{
        paddingTop: insets.top,
        paddingRight: insets.right,
        paddingLeft: insets.left,
      }}
    >
      <ImageBackground
        source={require('@/assets/images/bg-noise.png')}
        className="flex-1 justify-center items-center mix-blend-soft-light"
        resizeMode="repeat"
      >
        {children}
      </ImageBackground>
    </View>
  );
};
