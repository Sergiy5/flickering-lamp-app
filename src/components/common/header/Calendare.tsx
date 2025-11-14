import { Text, View } from 'react-native';
import { CalendareBtn } from './CalendareBtn';

// interface ... {}
export const Calendar: React.FC = () => {
  return (
    <View className="flex items-center flex-row gap-4 w-full">
      <Text>As for</Text>
      <View className="flex items-center justify-between bg-white rounded-full p-1 h-9 w-full">
              <CalendareBtn onPress={()=>{}} />
              <Text>6 November 2025</Text>
              <CalendareBtn onPress={()=>{}} />
      </View>
    </View>
  );
};
