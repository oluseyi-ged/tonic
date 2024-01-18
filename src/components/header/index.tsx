import {SizedBox, SvgIcon} from '@components';
import {useNavigation} from '@react-navigation/native';
import React, {FC} from 'react';
import {Text, View} from 'react-native';
import styles from './styles';

interface Props {
  home?: boolean;
  label?: string;
  back?: boolean;
  other?: boolean;
  share?: boolean;
  notif?: boolean;
  backPress?: any;
}

export const Header: FC<Props> = ({
  home,
  label,
  back,
  share,
  notif,
  backPress,
}) => {
  const navigation: any = useNavigation();

  return (
    <View style={styles.header}>
      {back && (
        <SvgIcon
          name="back"
          size={24}
          onPress={() => {
            if (typeof backPress === 'function') {
              backPress();
            } else {
              navigation.goBack();
            }
          }}
        />
      )}
      <SizedBox width={20} />
      <Text style={styles.headerText}>{label}</Text>
    </View>
  );
};
