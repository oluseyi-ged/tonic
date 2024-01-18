/* eslint-disable @typescript-eslint/no-unused-vars */

import {SizedBox} from '@components';
import LogoutModal from '@components/logout-modal';
import {setLogged} from '@slices/logged';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {useAppDispatch} from 'store';
import styles from './styles';

export const More = ({navigation}: any) => {
  const dispatch = useAppDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [copiedText, setCopiedText] = useState(false);

  const submitAction = async () => {
    setCopiedText(true);
    setTimeout(function () {
      setCopiedText(false);
    }, 2000);
  };

  const closeModal = () => {
    setModalVisible(false);
  };
  const logoutFunction = () => {
    dispatch(setLogged(false));
    navigation.reset({
      index: 0,
      routes: [
        {
          name: 'Auth',
          state: {
            index: 1,
            routes: [{name: 'Login'}],
          },
        },
      ],
    });
  };

  return (
    <>
      <SafeAreaView style={styles.pageWrap}>
        <KeyboardAwareScrollView
          style={styles.scrollWrap}
          keyboardShouldPersistTaps="handled">
          <SizedBox height={50} />
        </KeyboardAwareScrollView>
        <LogoutModal
          modalVisible={modalVisible}
          closeModal={closeModal}
          logoutFunction={logoutFunction}
        />
      </SafeAreaView>
    </>
  );
};
