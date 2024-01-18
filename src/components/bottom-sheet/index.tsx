// import { SizedBox } from '@components/sized-box';
import {SizedBox} from '@components';
import {HDP} from '@helpers';
import React, {FC} from 'react';
import {View} from 'react-native';
import Modal from 'react-native-modal';
import styles from './styles';

interface Props {
  title?: string;
  content?: any;
  show?: boolean;
  dropPress?: any;
  afterHide?: any;
  modalStyle?: any;
}

export const BottomSheet: FC<Props> = ({
  title,
  content,
  show = false,
  dropPress,

  afterHide,
  modalStyle,
}) => {
  return (
    <Modal
      isVisible={show}
      avoidKeyboard={true}
      onBackdropPress={dropPress}
      onModalHide={afterHide}>
      <View
        style={[
          styles.modalView,
          title?.length! > 0 && {paddingHorizontal: HDP(24)},
          modalStyle,
        ]}>
        <SizedBox height={21} />
        <View>{content}</View>
        <SizedBox height={24} />
      </View>
    </Modal>
  );
};
