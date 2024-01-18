import {Button, ModalView, SizedBox} from '@components';
import React, {FC, useState} from 'react';
import {Platform, SafeAreaView, Text, View} from 'react-native';
import {RootState, useAppSelector} from 'store';
import style from './styles';

export const Payments: FC = ({navigation}: any) => {
  const {pinned} = useAppSelector<any>((store: RootState) => store);
  const [showModal, setShowModal] = useState(!pinned);

  return (
    <SafeAreaView style={style.container}>
      <SizedBox height={Platform.OS === 'android' ? 30 : 20} />
      <View style={style.pageView}>
        <Text style={style.header}>Payments</Text>
        <SizedBox height={24.46} />
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
                navigation.navigate('SetPin');
              }}
            />
          </View>
        }
      />
    </SafeAreaView>
  );
};
