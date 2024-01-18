// import { SizedBox } from '@components/sized-box';
import {Button, SizedBox} from '@components';
import {useNavigation} from '@react-navigation/native';
import {palette} from '@theme';
import moment from 'moment';
import React, {FC, useState} from 'react';
import {Dimensions, Text, View} from 'react-native';
import style from './styles';
interface Props {
  setStartBook?: any;
}

export const BookModal: FC<Props> = ({setStartBook}) => {
  const {width} = Dimensions.get('window');
  const [step, setStep] = useState(1);
  const currentDate = moment().format('D MMM, YYYY H:mm');
  const navigation: any = useNavigation();

  const handleNav = () => {
    setStartBook(false);
    navigation.navigate('Receipt');
  };

  return (
    <View style={style.container}>
      <View style={style.drawer} />
      <SizedBox height={37} />
      {step == 1 ? (
        <>
          <Text style={style.bookText}>
            You’re about to book an inspection for this property. Are you sure
            you want to proceed?
          </Text>
          <>
            <SizedBox height={19} />
            <Text style={style.noticeText}>
              You have ‘1’ free bookings left this month
            </Text>
          </>
          <SizedBox height={28} />
          <View style={style.ctaGrid}>
            <Button
              title="No"
              bordered
              containerStyle={{width: width * 0.4, borderColor: palette.purple}}
              onPress={() => setStartBook(false)}
            />
            <Button
              title="Yes"
              containerStyle={{width: width * 0.4}}
              onPress={() => setStep(2)}
            />
          </View>
        </>
      ) : step == 2 ? (
        <>
          <Text style={style.bookText}>
            You have booked an inspection for this property. The landlord or
            property manager will reach out to you
          </Text>
          <SizedBox height={28} />
          <Button title="Continue" arrowed white onPress={() => setStep(4)} />
        </>
      ) : step == 4 ? (
        <>
          <Text style={style.bookLabel}>Payment Summary</Text>
          <Text style={[style.bookText, {color: palette.purple}]}>
            Rent Quote
          </Text>
          <Text style={style.quoteDate}>{currentDate}</Text>
          <SizedBox height={39} />
          <View>
            <View style={style.quoteItem}>
              <Text style={style.quoteLeft}>Inspection Fee</Text>
              <Text style={style.quoteRight}>₦ 4,500,000</Text>
            </View>
            <View style={style.quoteItem}>
              <Text style={style.quoteLeft}>Agent Fee</Text>
              <Text style={style.quoteRight}>₦ 4,500,000</Text>
            </View>
          </View>
          <View style={style.quoteDivide} />
          <SizedBox height={14} />
          <View style={style.quoteItem}>
            <Text style={style.quoteDownLeft}>total</Text>
            <Text style={style.quoteDownRight}>₦ 4,500,000</Text>
          </View>
          <SizedBox height={17} />
          <Text style={style.disclaim}>
            By clicking the ‘Confirm Payment’ button, you confirm that you have
            read and agreed to our{' '}
            <Text style={style.disclaimSpan}>Terms and Conditions</Text>
          </Text>
          <SizedBox height={25} />

          <View style={style.ctaGrid}>
            <Button
              title="Confirm Payment"
              containerStyle={{width: width * 0.9}}
              arrowed
              white
              onPress={handleNav}
            />
          </View>
        </>
      ) : null}
      <SizedBox height={28} />
    </View>
  );
};
