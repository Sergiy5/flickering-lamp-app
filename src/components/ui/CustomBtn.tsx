import { Pressable, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
// import { cssInterop } from 'nativewind';

// cssInterop(LinearGradient, {
//   className: {
//     target: 'style',
//   },
// }); Need to check if we can style the gradient!!!

interface CustomBtnProps {
  onPress: () => void;
  label: string;
}
export const CustomBtn: React.FC<CustomBtnProps> = ({ onPress, label }) => {

  // animate-[spin_4s_linear_infinite] Need to check!!!
  return (
    <Pressable
      onPress={onPress}
      className="relative overflow-hidden rounded-full w-full h-12 flex items-center justify-center"
    >
      {' '}
      <LinearGradient
        colors={['#ffd600', '#fff', 'rgba(0,57,154,1.0)']}
        useAngle={true}
        angle={160}
        className={`absolute inset-0`}
      />
      <View className="absolute inset-0 flex items-center justify-center m-2 rounded-full bg-[#0057b8ff] ">
        <Text className="text-[12px] text-slate-900">{label}</Text>
      </View>
    </Pressable>
  );
};
