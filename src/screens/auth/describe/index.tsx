/* eslint-disable @typescript-eslint/no-unused-vars */
import {Button, Select, SizedBox, SvgIcon} from '@components';
import {useFocusEffect} from '@react-navigation/native';
import {setAffiliate} from '@slices/affiliate';
import {setLanguage} from '@slices/language';
import lang from '@utils/language';
import React, {FC, useState} from 'react';
import {Dimensions, SafeAreaView, Text, View} from 'react-native';
import CountryPicker, {CountryCode} from 'react-native-country-picker-modal';
import {RootState, useAppDispatch, useAppSelector} from 'store';
import style from './styles';

export const Describe: FC = ({navigation, route}: any) => {
  const dispatch = useAppDispatch();
  const {language} = useAppSelector((store: RootState) => store);
  const [countryCode, setCountryCode] = useState<CountryCode>('NG');
  const {width} = Dimensions.get('window');
  const [country, setCountry] = useState<any>(null);
  const [existing, setExisting] = useState(false);
  const withCountryNameButton = true;
  const withFlag = true;
  const withEmoji = true;
  const withFilter = true;
  const withAlphaFilter = false;
  const withCallingCode = false;
  const onSelect = (data: any) => {
    setCountryCode(data.cca2);
    setCountry(data);
    dispatch(setAffiliate('E' + data?.cca2));
  };
  useFocusEffect(
    React.useCallback(() => {
      dispatch(setAffiliate('ENG'));
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );
  const options = [
    {
      key: false,
      value: 'No',
    },
    {
      key: true,
      value: 'Yes',
    },
  ];
  const langs = [
    {
      key: 'en',
      value: 'ENG',
    },
    {
      key: 'fr',
      value: 'FRA',
    },
    {
      key: 'es',
      value: 'ESP',
    },
    {
      key: 'pt',
      value: 'POR',
    },
  ];

  return (
    <SafeAreaView style={style.pageWrap}>
      <View style={style.slantWrap}>
        <SvgIcon
          onPress={() => navigation.goBack()}
          name="back-dark"
          size={40}
          containerStyle={style.backBtn}
        />
        <View style={style.langBox}>
          <Select
            onSelect={value => {
              dispatch(setLanguage(value));
            }}
            defaultOption={{
              key: 'en',
              value: 'ENG',
            }}
            save="key"
            data={langs}
            search={false}
          />
        </View>
        <View style={style.slantInner}>
          <Text style={style.slantText}>
            {lang(language)?.bvn_input_prompt}
          </Text>
        </View>
      </View>

      <View
        style={[style.bottomView, route?.params?.add && {width: width * 0.8}]}>
        {!route?.params?.add ? (
          <>
            <Text style={style.label}>
              {lang(language)?.input_location_label}
            </Text>
            <View style={style.countryBtn}>
              <CountryPicker
                {...{
                  countryCode,
                  withFilter,
                  withFlag,
                  withCountryNameButton,
                  withAlphaFilter,
                  withCallingCode,
                  withEmoji,
                  onSelect,
                  countryCodes: ['NG', 'GH', 'CI', 'KE', 'CM', 'ZW'],
                }}
                containerButtonStyle={style.flagCta}
              />
              <SvgIcon name="dropdown" size={10} />
            </View>

            <SizedBox height={24} />
          </>
        ) : null}
        <Select
          data={options}
          save="key"
          placeholder="Select Option"
          label={lang(language)?.business_location_label}
          onSelect={(value: any) => {
            setExisting(value);
          }}
          defaultOption={{
            key: false,
            value: 'No',
          }}
        />

        <SizedBox height={24} />
        <Button
          title={lang(language)?.proceed_button_title}
          onPress={() => {
            if (!existing) {
              navigation.navigate('Signup');
            } else {
              navigation.navigate('EcoSign');
            }
          }}
        />
      </View>
    </SafeAreaView>
  );
};
