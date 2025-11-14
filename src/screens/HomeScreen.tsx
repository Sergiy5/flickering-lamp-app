import {
  ActivityIndicator,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { Container } from '@/components/ui/Container';
import { CustomBtn } from '@/components/ui/CustomBtn';
import { Header } from '@/components/common/header/Header';
import { SafeAreaContainer } from '@/components/ui/SafeAreaContainer';

const HomeScreen: React.FC = () => {
  // const handleLink = () => {
  //   Linking.openURL('https://google.com');
  //     };
  return (
    <SafeAreaContainer className="relative">
      <ScrollView className="flex flex-col w-full">
        <Container className="w-full">
          <Header />
          <View>
            <Text>Section</Text>
          </View>
          <CustomBtn onPress={() => {}} label="Button" />
        </Container>
      </ScrollView>
      {false && (
        <ActivityIndicator
          size="large"
          color={'#0057b9'}
          className="absolute top-1/2 left-1/2"
        />
      )}
    </SafeAreaContainer>
  );
};

export default HomeScreen;
