import { Text } from 'react-native';
import { createStaticNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHome, faCalendar } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { CalendarScreen } from '@/screens/CalendarScreen';
import HomeScreen from '@/screens/HomeScreen';

export const NavTabs = createBottomTabNavigator({
  screenOptions: {
    headerShown: false,
    tabBarActiveTintColor: '#007aff', // ✅ Moved here
    tabBarInactiveTintColor: '#8e8e93', // ✅ Uncommented and moved
    tabBarStyle: {
      backgroundColor: 'rgba(255, 255, 255, 1)', // ✅ Fixed typo: regba → rgba
    },
  },
  screens: {
    Home: {
      screen: HomeScreen,
      options: {
        tabBarLabel: () => <Text>Home</Text>,
        tabBarIcon: ({ color }) => (
          <FontAwesomeIcon
            icon={faHome as IconProp}
            color={color}
            size={24} // ✅ Added size
          />
        ),
      },
    },
    Next: {
      screen: CalendarScreen,
      options: {
        tabBarLabel: () => <Text>Calendar</Text>,
        tabBarIcon: ({ color }) => (
          <FontAwesomeIcon
            icon={faCalendar as IconProp}
            color={color}
            size={24} // ✅ Added size
          />
        ),
      },
    },
  },
});

export const Navigation = createStaticNavigation(NavTabs);
