import {SizedBox, SvgIcon} from '@components';
import moment from 'moment';
import React, {FC, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import DatePicker from 'react-native-date-picker';
import style from './styles';

interface Props {
  onSubmit?: any;
  label?: string;
  placeholder?: string;
  error?: string;
  value?: string;
}

export const DateSelect: FC<Props> = ({
  onSubmit,
  label,
  placeholder,
  error,
  value,
}) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  // const minDate = new Date();
  const maxDate = new Date();

  const handleDateChange = date => {
    setSelectedDate(date);
    const formattedDate = moment(date).format('YYYY-MM-DD');
    onSubmit(formattedDate); // Pass the selected date to the parent component
  };

  return (
    <View>
      <View>
        {label && (
          <>
            <Text style={[style.label]}>{label}</Text>
            <SizedBox height={6} />
          </>
        )}
        <TouchableOpacity
          style={style.inputContainer}
          onPress={() => setOpen(!open)}>
          <Text style={style.placeholderText}>{value || placeholder}</Text>
          <SvgIcon name="calendar" size={20} />
        </TouchableOpacity>
      </View>
      <DatePicker
        modal
        open={open}
        date={selectedDate}
        onCancel={() => setOpen(false)}
        onDateChange={handleDateChange}
        onConfirm={handleDateChange}
        mode="date"
        maximumDate={maxDate}
      />
      {error?.length && <Text style={[style.error]}>{error}</Text>}
      <SizedBox height={10} />
    </View>
  );
};
