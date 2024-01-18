/* eslint-disable @typescript-eslint/no-unused-vars */
import {SizedBox, SvgIcon} from '@components';
import React, {FC, useState} from 'react';
import {Text, TextStyle, View, ViewStyle} from 'react-native';
import {
  MultipleSelectList,
  SelectList,
} from 'react-native-dropdown-select-list';
import style from './styles';

interface Props {
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  label?: string;
  placeholder?: string;
  data?: any;
  onSelect?: any;
  save?: string;
  error?: string;
  multiple?: boolean;
  show?: boolean;
  emptyText?: string;
  defaultOption?: any;
  bgColor?: string;
  search?: boolean;
}
export const Select: FC<Props> = ({
  containerStyle,
  placeholder,
  inputStyle,
  data,
  label,
  onSelect,
  save,
  error,
  multiple,
  show,
  emptyText,
  defaultOption,
  bgColor,
  search,
}) => {
  const [selected, setSelected] = useState('');
  const callBack = () => {
    onSelect(selected); // Call the callback function with the data
  };

  return (
    <View>
      {label && (
        <>
          <Text style={style.label}>{label}</Text>
          <SizedBox height={8} />
        </>
      )}
      {multiple ? (
        <MultipleSelectList
          setSelected={val => setSelected(val)}
          data={data}
          // @ts-ignore
          save={save}
          boxStyles={style.selectView}
          inputStyles={style.selectText}
          dropdownStyles={style.selectDropdown}
          dropdownTextStyles={style.selectText}
          arrowicon={<SvgIcon name="dropdown" size={10} />}
          onSelect={callBack}
          label={placeholder}
          closeicon={<View />}
          search={search}
        />
      ) : (
        <SelectList
          setSelected={val => setSelected(val)}
          data={data || []}
          // @ts-ignore
          save={save}
          boxStyles={style.selectView}
          inputStyles={selected ? style.selectedText : style.selectText}
          dropdownStyles={style.selectDropdown}
          dropdownTextStyles={style.selectText}
          arrowicon={<SvgIcon name="dropdown" size={10} />}
          placeholder={placeholder}
          onSelect={callBack}
          notFoundText={emptyText}
          defaultOption={defaultOption}
          search={search}
        />
      )}
      {error?.length ? (
        <>
          <Text style={[style.error]}>{error}</Text>
          <SizedBox height={10} />
        </>
      ) : (
        <SizedBox height={10} />
      )}
    </View>
  );
};
