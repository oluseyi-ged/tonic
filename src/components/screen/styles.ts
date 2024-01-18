import {StyleSheet} from 'react-native';
import {PADDING_VERTICAL, RH} from '@helpers';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: RH(PADDING_VERTICAL),
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
  },
  containerList: {
    paddingBottom: 10,
  },
  headerContainer: {
    width: '100%',
    marginBottom: 10,
  },
});
