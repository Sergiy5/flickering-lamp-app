import { Text, View } from 'react-native';
import { Calendar } from './Calendare';

export const Header: React.FC = () => {
  return (
    <View className="w-full">
      <Text className="text-black text-3xl font-semibold">Main Title</Text>
    </View>
  );
};
