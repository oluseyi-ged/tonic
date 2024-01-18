import {View, Text, Modal} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {SvgIcon} from '@components/svg-icon';
import {Button} from '@components/buttons';
import {SizedBox} from '@components/sized-box';
import styles from './styles';

const LogoutModal = ({modalVisible, closeModal, logoutFunction}) => {
  return (
    <Modal visible={modalVisible} animationType="slide" transparent>
      {/* Content inside the modal */}
      <View style={styles.cover}>
        <View style={styles.containerCommonStyle}>
          <SvgIcon name="warning" size={54} />
          <SizedBox height={32} />
          <Text style={styles.text}>Are You Sure? </Text>
          <SizedBox height={32} />
          <Button title="Logout" onPress={logoutFunction} />
          <SizedBox height={8} />
          <Button
            title="Cancel"
            onPress={closeModal}
            backgroundColor="#CCEEE4"
            textStyle={styles.outlinedButton}
          />
        </View>
      </View>
    </Modal>
  );
};

export default LogoutModal;
