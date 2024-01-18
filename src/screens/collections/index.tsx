/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {Button, ModalView, SizedBox, SvgIcon} from '@components';
import {HDP} from '@helpers';
import {useGetProfileQuery} from '@services/queryApi';
import {setProfile} from '@slices/profile';
import React, {FC, useEffect, useState} from 'react';
import {
  Dimensions,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {RootState, useAppDispatch, useAppSelector} from 'store';
import style from './styles';

const {width} = Dimensions.get('window');

export const Collections: FC = ({navigation}: any) => {
  const dispatch = useAppDispatch();
  const {pinned} = useAppSelector<any>((store: RootState) => store);
  const [showModal, setShowModal] = useState(!pinned);
  const [showUpgrade, setShowUpgrade] = useState(false);
  const {profile} = useAppSelector<any>((store: RootState) => store.profile);
  const handleNav = async () => {
    await setShowUpgrade(false);
    navigation.navigate('Individual');
  };
  console.log(profile);

  const receiveOptions = [
    {
      id: '1',
      name: 'Ecobank (QR)',
      icon: <SvgIcon name="qr" size={32} />,
      desc: 'Get paid via your static or dynamic QR code.',
      onPress:
        profile?.isUpgradedAccount || profile?.createdFromEcobankCred
          ? () => navigation.navigate('QrMain')
          : () => setShowUpgrade(true),
    },
    {
      id: '2',
      name: 'Card Payment',
      icon: <SvgIcon name="card-pay" size={42} />,
      desc: 'This feature is coming soon.🤞',
      // onPress: () =>
      //   flash.info({
      //     description: 'This feature is coming soon. Try again later.',
      //   }),
      // () => navigation.navigate('PayLink'),
    },
    {
      id: '3',
      name: 'USSD Pay',
      icon: <SvgIcon name="ussd" size={37} />,
      onPress:
        profile?.isUpgradedAccount || profile?.createdFromEcobankCred
          ? () => navigation.navigate('UssdPay')
          : () => setShowUpgrade(true),
      desc: 'Get paid via USSD.',
    },
    {
      id: '4',
      name: 'Track Inflows',
      desc: 'See all of your inflows.',
      icon: (
        <View style={{transform: [{rotate: '50deg'}]}}>
          <SvgIcon name="statement" size={37} />
        </View>
      ),
      onPress: () => navigation.navigate('EcoStatement', {type: 'inflow'}),
    },
  ];

  const {
    data: profileData,
    isFetching,
    refetch,
    // @ts-ignore
  } = useGetProfileQuery(null, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    dispatch(setProfile(profileData));
  }, [dispatch, profileData]);

  return (
    <SafeAreaView style={style.container}>
      <SizedBox height={Platform.OS === 'android' ? 30 : 20} />
      <View style={style.pageView}>
        <Text style={style.header}>Collections</Text>
        <SizedBox height={24.46} />

        <ScrollView>
          <View style={style.payInfo}>
            <Text style={style.payInfoHeader}>
              Coming Soon: Scheduled Payments
            </Text>
            <SizedBox height={10} />
            <View style={style.payInfoBox}>
              <SvgIcon name="cash-bag" size={50} />
              <SizedBox width={10} />
              <Text style={style.payInfoText}>
                You will be able to schedule your transfer for a later time or
                date by selecting
                <Text style={style.payInfoSpan}>
                  {' '}
                  ‘Schedule for later’
                </Text>{' '}
                when you make payments.
              </Text>
            </View>
          </View>

          <SizedBox height={40} />

          <View>
            <Text style={style.recTitle}>Receive Payments</Text>
            <SizedBox height={10} />
            <Text style={style.payTxt}>
              Select how you want to receive the payment.
            </Text>
            <SizedBox height={15.9} />
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                paddingHorizontal: HDP(32),
              }}>
              {receiveOptions?.map((item, i) => {
                return (
                  <TouchableOpacity
                    key={item.id}
                    onPress={item?.onPress}
                    disabled={i === 1}
                    style={[
                      style.recItem,
                      {
                        backgroundColor:
                          i === 0
                            ? '#0500E80D'
                            : i === 1
                            ? '#00000010'
                            : i === 2
                            ? '#D5F7E5'
                            : '#BA00E80D',
                      },
                    ]}>
                    <View style={{alignSelf: 'flex-start', height: HDP(32)}}>
                      {item.icon}
                    </View>
                    <Text style={style.receiveTxt}>{item.name}</Text>
                    <SizedBox width={30} />
                    <Text style={style.receiveSub}>{item.desc}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
          <SizedBox height={170} />
        </ScrollView>
      </View>
      <ModalView
        show={showModal}
        desc={
          <View>
            <Text style={style.modalNotif}>
              You have to set transaction pin in order to make transactions
            </Text>
            <SizedBox height={30} />
            <Button
              title="Proceed"
              containerStyle={style.modalBtn}
              onPress={() => {
                setShowModal(false);
                navigation.navigate('SetTransactionPin');
              }}
            />
          </View>
        }
      />
      <ModalView
        dropPress={() => setShowUpgrade(false)}
        show={showUpgrade}
        desc={
          <View>
            <Text style={style.modalNotif}>
              Please upgrade your account to access this feature.
            </Text>
            <SizedBox height={30} />
            <Button
              title="Upgrade Now"
              containerStyle={style.modalBtn}
              onPress={() => {
                setShowUpgrade(false);
                handleNav();
              }}
            />
          </View>
        }
      />
    </SafeAreaView>
  );
};
