import { SafeAreaContainer } from "../components/ui/SafeAreaContainer";
import { Text, View } from "react-native";
import React, { useState } from 'react';
import { Calendar, LocaleConfig } from 'react-native-calendars';

// interface ... {}
export const CalendarScreen: React.FC = () => {
  const [selected, setSelected] = useState('');

  return (
    <SafeAreaContainer >
      {' '}
      <Calendar
        onDayPress={day => {
          setSelected(day.dateString);
        }}
        markedDates={{
          [selected]: {
            selected: true,
            disableTouchEvent: true,
            // selectedDotColor: 'orange',
          },
        }}
      />
    </SafeAreaContainer>
  );
};