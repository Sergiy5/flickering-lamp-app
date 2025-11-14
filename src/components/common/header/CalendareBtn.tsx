import { Pressable } from 'react-native';
import { SvgUri } from 'react-native-svg';

interface CalendareBtnProps {
  onPress?: () => void;
}
export const CalendareBtn: React.FC<CalendareBtnProps> = ({ onPress }) => {
  return (
    <Pressable onPress={onPress}>
      
      <SvgUri
        uri={'../../../assets/icons/slider-arrow.svg'}
        width={90}
        height={50}
      />
    </Pressable>
  );
};
