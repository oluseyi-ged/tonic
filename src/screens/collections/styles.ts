import {HDP, RF} from '@helpers';
import {family, palette} from '@theme';
import {Dimensions, StyleSheet} from 'react-native';

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.white,
    position: 'relative',
    height: height * 1.5,
  },
  pageView: {
    height,
  },
  header: {
    fontSize: RF(20),
    fontFamily: family.Bold,
    color: palette.blue,
    paddingHorizontal: HDP(32),
  },
  recTitle: {
    fontSize: RF(14),
    fontFamily: family.Bold,
    color: palette.deepprimary,
    paddingHorizontal: HDP(32),
  },
  makeTitle: {
    fontSize: RF(14),
    fontFamily: family.Bold,
    color: palette.blue,
    paddingHorizontal: HDP(32),
  },
  payTxt: {
    fontSize: RF(14),
    fontFamily: family.Regular,
    color: palette.asphalt,
    paddingHorizontal: HDP(32),
  },

  payCtaText: {
    fontSize: RF(12),
    fontFamily: family.Medium,
  },
  payBtnRec: {
    borderRadius: HDP(12),
    paddingHorizontal: HDP(0),
  },
  payBtnSend: {
    borderRadius: HDP(12),
    paddingHorizontal: HDP(0),
    backgroundColor: palette.blue,
  },
  receiveTxt: {
    fontSize: RF(15),
    fontFamily: family.Bold,
    color: palette.purple,
    marginTop: HDP(20),
  },
  receiveSub: {
    fontSize: RF(10),
    fontFamily: family.Regular,
    color: '#00000090',
  },
  payItem: {
    backgroundColor: palette.white,
    paddingTop: HDP(11),
    paddingHorizontal: HDP(10),
    borderRadius: HDP(2),
    width: 0.4 * width,
    flexDirection: 'row',
    paddingVertical: HDP(10),
    alignItems: 'center',
    borderColor: '#ffffff',
    shadowColor: '#03cf00',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    marginBottom: HDP(20),
  },
  recItem: {
    paddingTop: HDP(20),
    paddingHorizontal: HDP(10),
    borderRadius: HDP(9),
    width: 0.4 * width,
    marginBottom: HDP(20),
    height: HDP(200),
  },
  payInfo: {
    backgroundColor: palette.deepprimary,
    padding: HDP(24),
    borderRadius: HDP(12),
    marginHorizontal: HDP(32),
  },
  payInfoHeader: {
    color: palette.white,
    fontSize: RF(12),
    fontFamily: family.Bold,
  },
  payInfoBox: {
    display: 'flex',
    flexDirection: 'row',
  },
  payInfoText: {
    color: palette.white,
    fontSize: RF(10),
    fontFamily: family.Regular,
    flex: 1,
  },
  payInfoSpan: {
    color: palette.white,
    fontSize: RF(12),
    fontFamily: family.Bold,
  },
  disableBox: {
    backgroundColor: '#00000050',
  },
  modalNotif: {
    fontSize: RF(14),
    fontFamily: family.Regular,
    color: palette.purple,
    alignSelf: 'center',
    textAlign: 'center',
    width: '80%',
  },
  modalBtn: {
    width: '80%',
    alignSelf: 'center',
  },
});

export default styles;
