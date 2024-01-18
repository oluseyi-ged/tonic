import {HDP, RF} from '@helpers';
import {family, palette} from '@theme';
import {Dimensions, StyleSheet} from 'react-native';

const {width} = Dimensions.get('screen');

const styles = StyleSheet.create({
  uploadBoxed: {
    display: 'flex',
    paddingHorizontal: HDP(67),
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: HDP(41),
    borderRadius: HDP(16),
    borderWidth: 1,
    borderColor: '#98989A',
    borderStyle: 'dashed',
    position: 'relative',
    minHeight: HDP(200),
  },
  uploadText: {
    color: '#6CCF00',
    fontSize: 12,
  },
  uploadLabel: {
    color: '#1F2024',
    fontSize: 14,
  },
  image: {
    width: width * 0.88,
    height: HDP(195),
    borderRadius: HDP(16),
    position: 'absolute',
    top: HDP(2),
    left: HDP(2),
  },
  modalCover: {
    paddingHorizontal: HDP(16),
    paddingBottom: HDP(24),
  },
  modalText: {
    color: palette.dark,
    fontSize: RF(14),
    textAlign: 'center',
    fontFamily: family.Bold,
  },
  modalFlex: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: HDP(20),
  },
  text: {
    color: palette.dark,
    fontSize: RF(12),
    fontFamily: family.Regular,
  },
  preview: {
    width: width * 0.9,
    height: HDP(300),
  },
  cameraBox: {
    borderRadius: HDP(16),
    width: width * 0.9,
    height: HDP(300),
    alignSelf: 'center',
    overflow: 'hidden',
    borderColor: '#6CCF00',
    position: 'relative',
  },
  cameraCrop: {
    position: 'absolute',
    alignSelf: 'center',
    justifyContent: 'center',
    right: 0,
    left: 0,
    top: 0,
    bottom: 0,
    margin: 'auto',
    borderWidth: HDP(60),
    borderColor: 'rgba(215, 215, 215, 0.2)',
  },
  cameraModal: {
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    paddingHorizontal: HDP(16),
    paddingVertical: HDP(32),
    backgroundColor: 'red',
  },
  close: {
    position: 'absolute',
    top: HDP(-12),
    left: HDP(0),
    zIndex: 200,
  },
});

export default styles;
