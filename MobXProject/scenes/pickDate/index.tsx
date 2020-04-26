import React, {useState, useRef} from 'react';
import {View, TouchableOpacity, Image, Text, Platform} from 'react-native';
import styles from './styles';
import {NavigationStackProp} from 'react-navigation-stack';
import BackgroundForm from '../../components/organisms/backgroundForm';
import Header, {HeaderProps} from '../../components/molecules/header';
import strings from '../../translations';
import NavigationService from '../../navigations/NavigationService';
import {CalendarList, DateObject} from 'react-native-calendars';
import {Colors} from '../../styles';
import Button, {ButtonProps} from '../../components/atoms/button';
import {TimePicker} from 'react-native-wheel-picker-android';
import DateTimePicker from '@react-native-community/datetimepicker';

export interface PickDateScreenProps {
  navigation: NavigationStackProp;
}

const PickDateScreen = (props: PickDateScreenProps) => {
  const isTimeMode =
    props.navigation.state.params && props.navigation.state.params.isTimeMode;
  const onChange =
    props.navigation.state.params && props.navigation.state.params.onChange;

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [currentDate, setCurrentDate] = useState(new Date());

  const calendarListRef = useRef<CalendarList>(null);

  const renderHeader = () => {
    const headerProps: HeaderProps = {
      title: isTimeMode ? strings.pickTime : strings.pickDate,
      leftImage: require('../../assets/images/back.png'),
      onPressLeftButton: NavigationService.dismiss,
    };

    return <Header {...headerProps} />;
  };

  const onDayPress = (date: DateObject) => {    
    setSelectedDate(new Date(date.year, date.month, date.day));
  };

  const getMarkedDates = () => {
    const marked = {};
    if (selectedDate) {
      const dateFormat =
        selectedDate.getFullYear() +
        '-' +
        selectedDate
          .getMonth()
          .toString()
          .padStart(2, '0') +
        '-' +
        selectedDate
          .getDate()
          .toString()
          .padStart(2, '0');
      marked[dateFormat] = {selected: true};
    }

    return JSON.parse(JSON.stringify(marked));
  };

  const onPressScrollToPreviousMonthButton = () => {
    const newDate =
      currentDate.getMonth() == 0
        ? new Date(currentDate.getFullYear() - 1, 0, 1)
        : new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);

    const list =
      calendarListRef.current &&
      ((calendarListRef.current as unknown) as {
        scrollToMonth: (date: Date) => void;
      });
    list && list.scrollToMonth(newDate);
    setCurrentDate(newDate);
  };

  const onPressScrollToNextMonthButton = () => {
    const newDate =
      currentDate.getMonth() == 11
        ? new Date(currentDate.getFullYear() + 1, 0, 1)
        : new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);

    const list =
      calendarListRef.current &&
      ((calendarListRef.current as unknown) as {
        scrollToMonth: (date: Date) => void;
      });
    list && list.scrollToMonth(newDate);
    setCurrentDate(newDate);
  };

  const renderButtons = () => {
    return (
      <View style={styles.buttonsStyle}>
        <TouchableOpacity onPress={onPressScrollToPreviousMonthButton}>
          <Image source={require('../../assets/images/backHederMap.png')} />
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressScrollToNextMonthButton}>
          <Image source={require('../../assets/images/backHederMapCopy.png')} />
        </TouchableOpacity>
      </View>
    );
  };

  const renderCalendarTop = () => {
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    return (
      <View style={styles.topMonthContainerStyle}>
        <Text style={styles.monthTextStyle}>
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </Text>
        {renderButtons()}
      </View>
    );
  };

  const renderCalendarList = () => {
    return (
      <View style={styles.flexStyle}>
        {renderCalendarTop()}
        <CalendarList
          ref={calendarListRef}
          horizontal={true}
          pagingEnabled={true}
          onDayPress={onDayPress}
          markedDates={getMarkedDates()}
          minDate={new Date()}
          scrollEnabled={false}
          theme={{
            dayTextColor: Colors.dusk,
            textDayFontWeight: '500',
            selectedDayTextColor: Colors.dusk,
            selectedDayBackgroundColor: Colors.lightPeriwinkle30,
            todayTextColor: Colors.dusk,
            'stylesheet.calendar.header': {
              header: {
                height: 0,
                opacity: 0,
              },
              week: {
                flexDirection: 'row',
                justifyContent: 'space-between',
                borderBottomColor: Colors.lightBlueGreyTwo,
                borderBottomWidth: 1,
              },
            },
          }}
        />
      </View>
    );
  };

  const renderTimePicker = () => {
    return Platform.OS == 'android' ? (
      <TimePicker
        onTimeSelected={date => {
          setSelectedDate(date);
        }}
        itemTextColor={Colors.lightBlueGrey}
        itemTextSize={29}
        selectedItemTextColor={Colors.denimBlue}
        selectedItemTextSize={29}
        itemTextFontFamily={'SFProText-Medium'}
        selectedItemTextFontFamily={'SFProText-Medium'}
      />
    ) : (
      <View style={styles.timePickerStyle}>
        <DateTimePicker
          mode={'time'}
          value={selectedDate || new Date()}
          style={{width: 200}}
          textColor={Colors.denimBlue}
          onChange={(evt, date) => {
            date && setSelectedDate(date);
          }}
        />
      </View>
    );
  };

  const renderContent = () => {
    const applyButtonProps: ButtonProps = {
      title: strings.apply,
      onPress: () => {
        onChange(selectedDate);
        NavigationService.dismiss();
      },
      viewContainerStyles: styles.applyButtonContainerStyle,
    };

    return (
      <View style={styles.containerView}>
        <View style={styles.arrowViewStyle} />
        {isTimeMode ? renderTimePicker() : renderCalendarList()}
        <Button {...applyButtonProps} />
      </View>
    );
  };

  return (
    <BackgroundForm>
      {renderHeader()}
      {renderContent()}
    </BackgroundForm>
  );
};

export default PickDateScreen;
