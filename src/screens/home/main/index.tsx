/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {Ad1, Ad2, Ad3, Ad4, Ad5} from '@assets/images';
import {BottomSheet, Button, ModalView, SizedBox, SvgIcon} from '@components';
import {HDP} from '@helpers';
import {flash} from '@helpers/FlashMessageHelpers';
import StorageHelper from '@helpers/StorageHelper';
import {
  useCreateCAcctMutation,
  useCreateIAcctMutation,
  useGetAccountBalMutation,
  useSetPrimaryMutation,
  useVerifyPinMutation,
} from '@services/mutationApi';
import {
  useGetAccountsQuery,
  useGetImageQuery,
  useGetProfileQuery,
  useGetTxQuery,
  useGetUserDataQuery,
  useLazyGetAcctStatusQuery,
} from '@services/queryApi';
import {setAcctLoad} from '@slices/acctLoad';
import {setBlind} from '@slices/blind';
import {setByAcct} from '@slices/byAcct';
import {setLoading} from '@slices/loading';
import {setLogged} from '@slices/logged';
import {setProfile} from '@slices/profile';
import {setTrack} from '@slices/track';
import {setUserImg} from '@slices/userImg';
import {color, palette} from '@theme';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {formatter} from '@utils';
import {showToastMessage} from '@utils/prompt';
import moment from 'moment';
import React, {FC, useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  Pressable,
  RefreshControl,
  Share,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal';
import {of} from 'rxjs';
import {groupBy, map, mergeMap, reduce, toArray} from 'rxjs/operators';
import {RootState, useAppDispatch, useAppSelector} from 'store';
import style from './styles';

export const Home: FC = ({navigation}: any) => {
  const [refreshing, setRefreshing] = useState(false);
  const [logTrigger, setLogTrigger] = useState(false);
  const [userData, setUserData] = useState<any>();
  const [acct, setAcct] = useState<any>({});
  const [retries, setRetries] = useState(0);
  const [txs, setTxs] = useState<any[]>([]);
  const [okay, setOkay] = useState(false);
  const [otp, setOtp] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [clearInput, setclearInput] = useState(false);
  const [acctArr, setAcctArr] = useState<any>([]);
  const [showPop, setShowPop] = useState(false);
  const [accId, setAccId] = useState<string>('');
  const [patch, setPatch] = useState(true);
  function extractValue(arr, prop) {
    let extractedValue = arr?.map(item => item[prop]);

    return extractedValue;
  }
  const {blind, direct, pinned, userImg} = useAppSelector<any>(
    (store: RootState) => store,
  );
  const [showPrompt, setShowPrompt] = useState(false);
  const [triggerBlind, setTriggerBlind] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [category, setCategory] = useState('');
  const [cat, setCat] = useState<any>('');
  const [item, setItem] = useState<any>('');
  const [type, setType] = useState('');
  const {auth} = useAppSelector<any>((store: RootState) => store.auth);
  const {profile} = useAppSelector<any>((store: RootState) => store.profile);
  const parts = auth.token.split('.');
  const [showHistory, setShowHistory] = useState(true);
  const signature = parts[2];

  const handleLogout = async () => {
    await StorageHelper.removeItem('user');
    await setLogTrigger(false);
    dispatch(setLogged(false));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (retries > 0) {
        setRetries(prevCount => prevCount - 1);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [retries]);

  const dispatch = useAppDispatch();

  const {
    data: profileData,
    isFetching: profileFetching,
    refetch: profileRefetch,
    // @ts-ignore
  } = useGetProfileQuery(null, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  const handleMask = () => {
    if (!blind) {
      dispatch(setBlind(true));
    } else {
      setTriggerBlind(true);
    }
  };

  const handleOut = async value => {
    await dispatch(setAcctLoad(false));
    await dispatch(setLoading(false));
    await dispatch(setLogged(false));
    dispatch(
      setTrack(
        'Account is being created, details will be sent to your mail shortly' ||
          value,
      ),
    );
    flash.danger({
      description:
        'Account is being created, details will be sent to your mail shortly' ||
        value,
    });
    showToastMessage(
      'Account is being created, details will be sent to your mail shortly',
    );
    StorageHelper.removeItem('user');
    dispatch(setLogged(false));
  };

  const [
    createCAcct,
    {
      data: cData,
      isLoading: cLoading,
      isSuccess: cSucc,
      isError: cIsErr,
      error: cErr,
    },
  ] = useCreateCAcctMutation();

  const [
    createIAcct,
    {
      data: iData,
      isLoading: iLoading,
      isSuccess: iSucc,
      isError: iIsErr,
      error: iErr,
    },
  ] = useCreateIAcctMutation();

  const [
    trigger,
    {
      data: acctStatus,
      isFetching: statFetching,
      isError: isStatError,
      isSuccess: statGreen,
      error: statError,
    },
  ] = useLazyGetAcctStatusQuery();

  useEffect(() => {
    if (cLoading) {
      dispatch(setAcctLoad(true));
    }
    if (cSucc) {
      setRetries(20);
      dispatch(setAcctLoad(true));
      trigger();
    }
    if (cIsErr && retries > 0) {
      dispatch(setAcctLoad(true));
      createCAcct();
    } else if (cIsErr && retries === 0) {
      // @ts-ignore
      if (cErr?.data?.message?.includes('duplicate')) {
        trigger();
        // flash.danger({description: cErr?.data?.message});
        // @ts-ignore
      } else if (cErr?.data?.message) {
        // @ts-ignore
        handleOut(cErr?.data?.message);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cData, cErr, cIsErr, cSucc, retries]);

  useEffect(() => {
    if (iLoading) {
      dispatch(setAcctLoad(true));
    }
    if (iSucc) {
      setRetries(20);
      dispatch(setAcctLoad(true));
      trigger();
    }
    if (iIsErr && retries > 0) {
      dispatch(setAcctLoad(true));
      createIAcct();
    } else if (iIsErr && retries === 0) {
      // @ts-ignore
      if (iErr?.data?.message?.includes('duplicate')) {
        trigger();
        // flash.danger({description: iErr?.data?.message});
        // @ts-ignore
      } else if (iErr?.data?.message) {
        // @ts-ignore
        handleOut(iErr?.data?.message);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [iData, iErr, iIsErr, iLoading, iSucc, retries]);

  useEffect(() => {
    if (profile?.hasSetTransactionPin) {
      dispatch(setBlind(true));
    } else {
      dispatch(setBlind(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let currentDate = new Date();

  useEffect(() => {
    dispatch(setProfile(profileData));
    dispatch(setByAcct(false));
  }, [dispatch, profileData]);

  useEffect(() => {
    profileRefetch();
  }, [profileRefetch]);

  useEffect(() => {
    if (statFetching) {
      dispatch(setAcctLoad(true));
    }
    if (statGreen && acctStatus?.message?.toLowerCase() !== 'created') {
      dispatch(setLoading(false));
      dispatch(setAcctLoad(false));
      setOkay(true);
    }
    if (isStatError && retries > 0) {
      trigger();
    } else if (isStatError && retries === 0) {
      // @ts-ignore
      if (statError?.data?.message) {
        handleOut(null);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    acctStatus,
    dispatch,
    isStatError,
    retries,
    statError,
    statFetching,
    statGreen,
    trigger,
  ]);

  const {
    data: userDets,
    isFetching: userFetching,
    refetch,
  } = useGetUserDataQuery(null, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  const {
    data: imageData,
    isFetching: imgFetching,
    isSuccess: imgSuccess,
    // @ts-ignore
  } = useGetImageQuery(null, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (imgSuccess) {
      dispatch(setUserImg(imageData?.image));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imgSuccess]);

  let CACData = userData?.data?.dataFromCac;

  const getUser = async () => {
    let user = await StorageHelper.getItem('user');
    setUserData(user);
    return user;
  };

  useEffect(() => {
    getUser();
  }, []);

  const {
    data: acctData,
    isSuccess,
    isError,
    isFetching: acctFetching,
    refetch: acctFetch,
    // @ts-ignore
  } = useGetAccountsQuery(null, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (acctData?.length < 1 && acctFetching) {
      dispatch(setLoading(true));
    }
  }, [acctData?.length, acctFetching, dispatch]);

  useEffect(() => {
    if (isError) {
      acctFetch();
    }
    if (isSuccess) {
      if (acctData?.length < 1) {
        setRetries(40);
        if (profile?.customerCategory?.toLowerCase() === 'commercial') {
          createCAcct();
        } else {
          createIAcct();
        }
      } else {
        if (acctData?.length) {
          setAcct(acctData[0]);
        }
        setAcctArr(acctData);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [acctData, acctFetch, isError, isSuccess, profile]);

  useEffect(() => {
    if (acctFetching) {
    }
    if (isSuccess) {
      dispatch(setLoading(false));
      const isFound = acctData?.some(el => {
        if (el?.accountNumber === null) {
          return true;
        }
      });
      if (isFound) {
        trigger();
      }
    }
  }, [acctData, acctFetching, dispatch, isSuccess, trigger]);

  const {
    data: txData,
    isFetching: txFetching,
    refetch: txFetch,
  } = useGetTxQuery(null, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (txData !== undefined) {
      setTxs(txData?.data?.transactions);
    } else {
      txFetch();
    }
  }, [txData, txFetch]);

  useEffect(() => {
    txFetch();
  }, [txFetch]);

  const filteredData = txData?.data?.transactions?.filter((data: any) => {
    if (type?.toLowerCase() === 'all') {
      setType('');
    }
    if (item?.toLowerCase() === 'all') {
      setItem('');
    }
    if (
      cat?.toLowerCase() &&
      data?.paymentDirection?.toLowerCase() !== cat?.toLowerCase()
    ) {
      return false;
    }
    if (
      item?.toLowerCase() &&
      data?.transactionType?.toLowerCase() !== item?.toLowerCase()
    ) {
      return false;
    }
    return true;
  });

  const [
    getAccountBal,
    {
      data: balData,
      isLoading: balLoading,
      isSuccess: balSucc,
      isError: balIsErr,
      error: balErr,
    },
  ] = useGetAccountBalMutation();

  const [
    setPrimary,
    {
      data: priData,
      isLoading: priLoading,
      isSuccess: priSucc,
      isError: priIsErr,
      error: priErr,
    },
  ] = useSetPrimaryMutation();

  useEffect(() => {
    if (priSucc) {
      setShowPop(false);
    }
    if (priIsErr) {
      // @ts-ignore
      flash.danger({description: priErr?.data?.message});
    }
    // @ts-ignore
  }, [priSucc, priIsErr, priErr?.data?.message]);

  useEffect(() => {
    if (acct?.accountId) {
      getAccountBal(acct?.accountId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [acct]);

  const scrollRef = useRef<any>();

  const [payTrigger, setPayTrigger] = useState(false);
  const [payMode, setPayMode] = useState('');

  const [showing, setShowing] = useState(true);

  const {width} = Dimensions.get('window');

  const transactionsOptions = [
    {
      id: '1',
      name: 'Airtime & Data',
      icon: <SvgIcon name="call-cta" size={20.78} />,
      onPress: () => navigation.navigate(''),
    },
    {
      id: '2',
      name: 'Loans',
      icon: <SvgIcon name="loan-cta" size={22} />,
      onPress: () => navigation.navigate(''),
    },
    {
      id: '3',
      name: 'Send e-Invoice',
      icon: <SvgIcon name="inv-cta" size={15} />,
      onPress: () => navigation.navigate(''),
    },
    {
      id: '4',
      name: 'Logistics',
      icon: <SvgIcon name="logistics-cta" size={22} />,
      onPress: () => navigation.navigate(''),
    },
  ];

  const receiveOptions = [
    {
      id: '1',
      name: 'Ecobank (QR)',
      icon: <SvgIcon name="qr" size={22} />,
      onPress: () => navigation.navigate('QrMain'),
    },
    {
      id: '2',
      name: 'Phone POS',
      icon: <SvgIcon name="pos" size={24} />,
      onPress: () => navigation.navigate('PosPay'),
    },
    {
      id: '3',
      name: 'USSD Pay',
      icon: <SvgIcon name="ussd" size={33} />,
      onPress: () => navigation.navigate('UssdPay'),
    },
    {
      id: '4',
      name: 'Paylink',
      icon: <SvgIcon name="link" size={26} />,
      onPress: () => navigation.navigate('PayLink'),
    },
  ];

  const makeOptions = [
    {
      id: '1',
      name: 'Bills Payment',
      icon: <SvgIcon name="invoice" size={20} />,
      onPress: () => navigation.navigate('BillPayment'),
    },
    {
      id: '2',
      name: 'Single Transfer',
      icon: <SvgIcon name="transfer" size={20} />,
      onPress: () => navigation.navigate('SingleTransfer'),
    },
    {
      id: '3',
      name: 'Bulk Transfer',
      icon: <SvgIcon name="bulk" size={18} />,
      onPress: () => navigation.navigate('BulkPayment'),
    },
  ];

  const adsList = [
    {id: 1, img: Ad1},
    {id: 2, img: Ad2},
    {id: 3, img: Ad3},
    {id: 4, img: Ad4},
    {id: 5, img: Ad5},
  ];

  const [trans, setTrans] = useState<any>([]);

  const [activeTx, setActiveTx] = useState<any>({});

  const handleTx = val => {
    setModalVisible(true);
    setActiveTx(val);
  };

  useEffect(() => {
    of(...txs)
      .pipe(
        groupBy((p: any) => p?.transactionDate?.split('T')[0]),
        mergeMap(group$ =>
          group$.pipe(reduce((acc, cur) => [...acc, cur], [`${group$.key}`])),
        ),
        map(arr => ({date: arr[0], trans: arr.slice(1)})),
        toArray(),
      )
      .subscribe(p => {
        setTrans(p);
      });
  }, [txs]);

  const countByStatus = txs.reduce((acc, obj) => {
    const {transactionStatus} = obj;
    if (acc[transactionStatus]) {
      acc[transactionStatus]++;
    } else {
      acc[transactionStatus] = 1;
    }
    return acc;
  }, {});

  const renderUserData = () => {
    return (
      <View style={style.headerContainer}>
        <View style={style.userDet}>
          {!imgFetching ? (
            <TouchableOpacity
              onPress={() => navigation.navigate('Profile')}
              style={{
                width: HDP(50),
                height: HDP(50),
                backgroundColor: '#00000020',
                borderRadius: HDP(100),
              }}>
              <Image
                source={{
                  uri: `data:image/gif;base64,${userImg}`,
                }}
                style={{
                  width: HDP(50),
                  height: HDP(50),
                  borderRadius: HDP(100),
                  borderWidth: HDP(2),
                  borderColor: '#fff',
                }}
              />
            </TouchableOpacity>
          ) : (
            <ActivityIndicator size="large" color={palette.green} />
          )}
          <SizedBox width={10} />
          <View>
            <Text style={style.welcomeText}>
              Welcome {userData?.profile?.preferredName},
            </Text>
            {CACData?.companyName?.length ? (
              <Text style={style.nameText}>
                {CACData?.companyName?.length > 30
                  ? CACData?.companyName?.substring(0, 30) + '...'
                  : CACData?.companyName}
              </Text>
            ) : null}
            <Text style={style.numText}>How can we help you today?</Text>
          </View>
        </View>
        <SvgIcon
          name="home-out"
          size={30}
          onPress={() => setLogTrigger(true)}
        />
      </View>
    );
  };

  const handleSetPrimary = (val: any) => {
    setPrimary({
      accountId: val,
    });
  };

  const renderAcctCard = () => {
    return (
      <View style={style.cardContent}>
        {!acctFetching ? (
          <>
            <FlatList
              contentContainerStyle={{
                display: 'flex',
                paddingHorizontal: HDP(5),
              }}
              showsHorizontalScrollIndicator={false}
              horizontal
              data={[...acctArr, {isButton: true}]}
              renderItem={({item}) => (
                <View>
                  {item.isButton ? (
                    <TouchableOpacity
                      style={style.addBox}
                      onPress={() => {
                        navigation.navigate('Describe', {add: true});
                      }}>
                      <SvgIcon name="add" size={30} />
                      <Text style={style.addText}>Add New Account</Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      onPress={() => {
                        setShowPop(true);
                      }}>
                      <View style={style.acctGrid}>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'flex-start',
                            justifyContent: 'space-between',
                          }}>
                          <View>
                            <Text style={style.acctText}>account balance:</Text>
                            <Text style={style.amtText}>
                              <Text style={style.curr}>{item?.currency}</Text>
                              {!blind && item?.accountBalance?.length
                                ? formatter.format(Number(item?.accountBalance))
                                : ' *****'}
                            </Text>
                          </View>

                          {profile?.hasSetTransactionPin ? (
                            <SvgIcon
                              name={blind ? 'see' : 'unsee'}
                              size={25}
                              onPress={handleMask}
                            />
                          ) : null}
                        </View>
                        <SizedBox height={HDP(10)} />
                        <View style={style.flexShare}>
                          <View>
                            <Text style={style.acctAmt}>Account Number:</Text>
                            <Text style={style.acctNo}>
                              {item?.accountNumber}
                            </Text>
                            <Text style={style.acctName}>{item?.acctName}</Text>
                          </View>
                          <TouchableOpacity
                            onPress={() => {
                              Share.share({
                                message: `Account Name - ${profile?.firstName} ${profile?.lastName}\nAccount No. - ${item?.accountNumber}\nBank Name - Ecobank\nSwift Code - ${item?.accountSwiftCode}\nBank Branch - ${item?.accountBankName} `,
                              });
                            }}
                            style={{
                              padding: HDP(10),
                              marginBottom: HDP(20),
                            }}>
                            <SvgIcon name="share" size={30} />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </TouchableOpacity>
                  )}
                </View>
              )}
            />
          </>
        ) : (
          <View style={{paddingVertical: HDP(50), marginRight: HDP(20)}}>
            <ActivityIndicator size="small" color="white" />
          </View>
        )}
      </View>
    );
  };

  const handleDispute = async values => {
    await setModalVisible(false);
    navigation.navigate('DisputePage', {details: activeTx});
  };

  const handleDetails = async values => {
    await setModalVisible(false);
    navigation.navigate('ReceiptPage', {details: values});
  };

  const onRefresh = () => {
    acctFetch();
    refetch();
    txFetch();
  };

  useEffect(() => {
    dispatch(setLoading(false));
  }, [dispatch]);

  useEffect(() => {
    if (refreshing) {
      dispatch(setLoading(true));
    } else {
      dispatch(setLoading(false));
    }
  }, [dispatch, refreshing]);

  const [
    verifyPin,
    {
      data: pinData,
      isLoading: pinLoading,
      isSuccess: pinSucc,
      isError: pinIsErr,
      error: pinErr,
      reset,
    },
  ] = useVerifyPinMutation();

  const handleVerify = async () => {
    verifyPin({
      pin: otp,
    });
  };

  useEffect(() => {
    if (pinSucc) {
      setTriggerBlind(false);
      dispatch(setBlind(false));
    }
    if (pinIsErr) {
      setOtp('');
    }
  }, [pinSucc, pinIsErr, dispatch]);

  const renderBlind = () => (
    <View style={{justifyContent: 'center'}}>
      <SizedBox height={20} />
      <Text style={style.showtext}>Enter Transaction Pin</Text>
      <OTPInputView
        style={{width: '100%', height: 100, alignSelf: 'center'}}
        pinCount={6}
        autoFocusOnLoad={false}
        codeInputFieldStyle={style.boxBase}
        codeInputHighlightStyle={style.boxHighLighted}
        onCodeFilled={code => {
          setOtp(code);
        }}
        secureTextEntry
      />
      {pinIsErr ? (
        <Text style={style.errtext}>Incorrect Pin, Try again</Text>
      ) : null}
      <Button
        title="Confirm"
        loading={pinLoading}
        onPress={() => handleVerify()}
      />
    </View>
  );

  const renderModal = () => (
    <View>
      <View
        style={{
          backgroundColor:
            activeTx?.paymentDirection?.toLowerCase() === 'credit'
              ? '#029100'
              : '#cc3300',
          width: width,
          height: HDP(80),
          alignSelf: 'center',
          marginTop: HDP(-30),
          borderTopLeftRadius: HDP(20),
          borderTopRightRadius: HDP(20),
        }}
      />
      <View
        style={{
          position: 'absolute',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: width * 0.9,
          alignSelf: 'center',
        }}>
        <SvgIcon name="money-lock" size={100} />
        <View
          style={{
            backgroundColor: 'white',
            paddingHorizontal: HDP(10),
            paddingVertical: HDP(5),
            shadowColor:
              activeTx?.paymentDirection?.toLowerCase() === 'credit'
                ? '#029100'
                : '#cc3300',
            borderRadius: HDP(4),
            shadowOffset: {
              width: 3,
              height: 5,
            },
            shadowOpacity: 0.2,
            shadowRadius: 1.41,

            elevation: 2,
          }}>
          <Text style={style.transMode}>{activeTx?.paymentDirection}</Text>
        </View>
      </View>
      <SizedBox height={50} />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: HDP(20),
        }}>
        <View>
          <Text style={style.transMode}>{activeTx?.narration}</Text>
          <Text style={style.transMode}>
            {moment(activeTx?.transactionDate)?.format('Do MMMM, YYYY. hh:mmA')}
          </Text>
        </View>
        <View>
          <Text style={style.transAmt}>
            {activeTx?.currency}{' '}
            {formatter.format(
              Number(activeTx?.transactionAmount?.replaceAll('-', ' ')),
            )}
          </Text>
          <Text
            style={[
              style.transStatus,
              {
                color: color[activeTx?.transactionStatus?.toLowerCase()],
              },
            ]}>
            {activeTx?.transactionStatus}
          </Text>
        </View>
      </View>
      <SizedBox height={50} />
      {/* {activeTx?.transactionStatus?.toLowerCase() === 'pending' ? null : ( */}
      <View style={style.transCTA}>
        <Button
          title="Dispute"
          backgroundColor="#dd7385"
          // disabled={activeTx?.transactionStatus?.toLowerCase() === 'pending'}
          onPress={() => handleDispute(activeTx)}
        />
        <SizedBox height={10} />
        <Button
          title="Show Receipt"
          // disabled={activeTx?.transactionStatus?.toLowerCase() === 'pending'}
          backgroundColor={palette.purple}
          onPress={() => handleDetails(activeTx)}
        />
      </View>
      {/* )} */}
      <SizedBox height={20} />
    </View>
  );

  return (
    <KeyboardAwareScrollView
      keyboardShouldPersistTaps="handled"
      style={style.container}
      ref={scrollRef}
      refreshControl={
        <RefreshControl
          //refresh control used for the Pull to Refresh
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }>
      <LinearGradient
        colors={['#599100', '#029100']}
        style={style.topView}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}>
        {renderUserData()}
        {renderAcctCard()}
      </LinearGradient>

      <View style={style.upgradeCard}>
        <SizedBox height={40} />
        <View style={style.upgradeCardContent}>
          <View>
            <Text style={style.upgradeLabel}>LEVEL UP CHAMP!</Text>
            <SizedBox height={5} />
            <View style={style.upgradeTextWrapper}>
              <Text style={style.upgradeText}>
                Your business account is not fully up. Complete account upgrade
                to access unlimited benefits.
              </Text>
            </View>

            <SizedBox height={10} />
            <TouchableOpacity>
              <Pressable onPress={() => navigation.navigate('Individual')}>
                <Text style={style.upgradeCta}>
                  {profile?.customerCategory?.toLowerCase() === 'individual'
                    ? 'Tap to upgrade.'
                    : 'Update Documents'}
                </Text>
              </Pressable>
            </TouchableOpacity>
            <SizedBox height={10} />
          </View>
        </View>
      </View>

      <SizedBox height={30} />
      <View style={style.paymentCta}>
        <View style={{flex: 1}}>
          <Button
            title="Receive Payment"
            textStyle={style.payCtaText}
            containerStyle={style.payBtnRec}
            onPress={
              pinned
                ? () => navigation.navigate('Collections')
                : () => setShowPrompt(true)
            }
          />
        </View>
        <SizedBox width={20} />
        <View style={{flex: 1}}>
          <Button
            title="Make Payment"
            textStyle={style.payCtaText}
            containerStyle={style.payBtnSend}
            onPress={
              pinned
                ? () => navigation.navigate('Payments')
                : () => setShowPrompt(true)
            }
          />
        </View>
      </View>
      <SizedBox height={20} />

      <View style={style.otherCtaSection}>
        <Text style={style.otherCtaHeader}>Be Informed</Text>
      </View>
      <SizedBox height={5} />
      <View
        style={{
          display: 'flex',
        }}>
        <FlatList
          contentContainerStyle={{
            paddingBottom: 10,
            alignItems: 'center',
            display: 'flex',
            paddingLeft: HDP(16),
          }}
          horizontal
          data={adsList}
          renderItem={({item}) => (
            <TouchableOpacity>
              <Image style={{marginRight: HDP(16)}} source={item.img} />
            </TouchableOpacity>
          )}
        />
      </View>
      <SizedBox height={5} />
      <View
        style={[
          style.otherCtaSection,
          {
            borderTopWidth: HDP(10),
            borderTopColor: '#00cfc830',
            paddingTop: HDP(10),
          },
        ]}>
        <Text style={style.otherCtaHeader}>Transaction Activities</Text>
      </View>

      <SizedBox height={10} />

      {txs?.length ? (
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            flexWrap: 'wrap',
            paddingHorizontal: HDP(25),
          }}>
          <View style={{marginRight: HDP(20)}}>
            {countByStatus?.SUCCESS ? (
              <View style={style.statBox}>
                <View style={style.trueBox} />
                <Text style={style.stattext}>
                  SUCCESS: {countByStatus?.SUCCESS}
                </Text>
              </View>
            ) : null}
          </View>
          <View style={{marginRight: HDP(20)}}>
            {countByStatus?.PENDING ? (
              <View style={style.statBox}>
                <View style={style.pendBox} />
                <Text style={style.stattext}>
                  PEDNING: {countByStatus?.PENDING}
                </Text>
              </View>
            ) : null}
          </View>
          <View style={{marginRight: HDP(20)}}>
            {countByStatus?.FAILED ? (
              <View style={style.statBox}>
                <View style={style.failBox} />
                <Text style={style.stattext}>
                  FAILED: {countByStatus?.FAILED}
                </Text>
              </View>
            ) : null}
          </View>
        </View>
      ) : null}

      <SizedBox height={16} />
      {showHistory ? (
        <>
          <View style={style.transContainer}>
            {filteredData?.length ? (
              filteredData?.slice(0, 5).map((item, i) => (
                <TouchableOpacity
                  key={i}
                  style={style.transData}
                  onPress={() => handleTx(item)}>
                  <View>
                    <Text
                      style={[
                        style.transName,
                        // {
                        //   color:
                        //     item?.paymentDirection?.toLowerCase() === 'credit'
                        //       ? 'green'
                        //       : 'red',
                        // },
                      ]}>
                      {item?.receiver
                        ? item?.receiver?.length > 20
                          ? item?.receiver?.substring(0, 20) + '...'
                          : item?.receiver?.substring(0, 20)
                        : item?.billerCode?.length > 20
                        ? item?.billerCode
                            ?.replaceAll('_', ' ')
                            ?.substring(0, 20) + '...'
                        : 'Personal Account'}
                    </Text>
                    <Text style={style.transMode}>
                      {item?.transactionType?.replaceAll('_', ' ')}
                    </Text>
                  </View>
                  <View
                    style={{
                      alignItems: 'flex-end',
                    }}>
                    <Text style={style.transAmt}>
                      {item?.currency}{' '}
                      {formatter.format(Number(item?.transactionAmount))}
                    </Text>
                    <Text
                      style={[
                        style.transStatus,
                        {
                          color: color[item?.transactionStatus?.toLowerCase()],
                        },
                      ]}>
                      {item?.transactionStatus}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))
            ) : txFetching ? (
              <View>
                <SizedBox height={50} />
                <ActivityIndicator size="small" color={color.primary} />
                <SizedBox height={50} />
              </View>
            ) : (
              <View style={style.transEmptyView}>
                <Text style={style.transEmptyText}>
                  You have not completed any transactions yet...
                </Text>
              </View>
            )}

            {txs?.length > 0 ? (
              <TouchableOpacity
                onPress={() => navigation.navigate('TransactionHistory')}>
                <Text style={style.allCta}>See All</Text>
              </TouchableOpacity>
            ) : null}
          </View>
        </>
      ) : null}
      <SizedBox height={80} />

      {payTrigger ? (
        <TouchableOpacity
          style={style.payOverLay}
          onPress={() => setPayTrigger(false)}>
          <SizedBox height={500} />
          <View
            style={{
              display: 'flex',
            }}>
            <FlatList
              contentContainerStyle={{
                paddingVertical: HDP(35),
                alignItems: 'center',
                display: 'flex',
                paddingLeft: HDP(16),
              }}
              numColumns={4}
              data={payMode === 'receive' ? receiveOptions : makeOptions}
              renderItem={({item}) => (
                <TouchableOpacity
                  key={item.id}
                  onPress={item?.onPress}
                  style={[
                    style.payItem,
                    item.name === 'FX Transfer' && style.disableBox,
                  ]}>
                  {item.icon}
                  <SizedBox height={7} />
                  <Text style={style.receiveTxt}>{item.name}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      ) : null}

      <BottomSheet
        show={modalVisible}
        dropPress={() => setModalVisible(false)}
        content={renderModal()}
      />
      <Modal avoidKeyboard isVisible={okay && patch}>
        <View style={style.main}>
          <SizedBox height={40} />
          <SvgIcon name="fetti" size={215} />
          <SizedBox height={32} />
          <Text style={style.alert}>Your Business account is ready!</Text>
          <Text style={style.numDe}>
            Your Account Number is{' '}
            <Text style={style.numSpan}>{acctStatus?.data?.accountNumber}</Text>
          </Text>
          <SizedBox height={15} />

          <Text style={style.message}>
            Your Account has been successfully created
          </Text>

          <SizedBox height={15} />
          <Button
            title="Continue"
            onPress={() => {
              setOkay(false);
              setPatch(false);
            }}
            containerStyle={{width: '80%', alignSelf: 'center'}}
          />
          <SizedBox height={30} />
        </View>
      </Modal>
      <BottomSheet
        show={triggerBlind}
        dropPress={() => setTriggerBlind(false)}
        content={renderBlind()}
        afterHide={reset}
      />
      <BottomSheet
        show={showPop}
        dropPress={() => setShowPop(false)}
        content={
          <>
            {acctArr?.length > 1 ? (
              <Text style={[style.acctDropNo, {alignSelf: 'center'}]}>
                Tap any account to set as default
              </Text>
            ) : null}
            <SizedBox height={20} />
            <FlatList
              contentContainerStyle={{
                display: 'flex',
                paddingHorizontal: HDP(5),
              }}
              showsVerticalScrollIndicator={false}
              data={acctArr}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={style.acctDropGrid}
                  onPress={() => {
                    if (acctArr?.length > 1) {
                      handleSetPrimary(item?.accountId);
                    } else {
                      return;
                    }
                  }}>
                  <View>
                    <View style={style.flexShare}>
                      <View>
                        <Text style={style.acctDropAmt}>
                          Account Number:{' '}
                          <Text style={style.acctDropNo}>
                            {item?.accountNumber}
                          </Text>
                        </Text>
                      </View>
                    </View>
                    <View>
                      <Text style={style.acctDropText}>
                        Balance:{' '}
                        <Text style={style.amtDropText}>
                          <Text style={style.currDrop}>{item?.currency}</Text>
                          {!blind && item?.accountBalance?.length
                            ? formatter.format(Number(item?.accountBalance))
                            : ' *****'}
                        </Text>
                      </Text>
                    </View>
                  </View>
                  {priLoading ? (
                    <ActivityIndicator size="small" color={palette.green} />
                  ) : item?.isPrimaryAccount ? (
                    <SvgIcon name="badge" size={24} />
                  ) : null}
                </TouchableOpacity>
              )}
            />
          </>
        }
      />
      <BottomSheet
        // dropPress={() => setTrigger(false)}
        show={showPrompt}
        content={
          <>
            <SizedBox height={30} />
            <View>
              <Text style={style.modalNotif}>
                You have to set transaction pin in order to make transactions
              </Text>
              <SizedBox height={30} />
              <Button
                title="Proceed"
                containerStyle={style.modalBtn}
                onPress={() => {
                  setShowPrompt(false);
                  navigation.navigate('SetTransactionPin');
                }}
              />
              <SizedBox height={10} />
              <Button
                title="Cancel"
                containerStyle={style.modalBtn}
                onPress={() => setShowPrompt(false)}
                bordered
              />
            </View>
            <SizedBox height={50} />
          </>
        }
      />
      <ModalView
        afterHide={() => setLogTrigger(false)}
        show={logTrigger}
        desc={
          <View>
            <Text style={style.modalNotif}>
              Are you sure you want to Logout?
            </Text>
            <SizedBox height={30} />
            <Button
              title="Logout"
              containerStyle={[style.modalBtn, {backgroundColor: 'red'}]}
              onPress={() => {
                handleLogout();
              }}
            />
            <SizedBox height={10} />
            <Button
              title="Cancel"
              containerStyle={[style.modalBtn, {backgroundColor: 'blue'}]}
              onPress={() => {
                setLogTrigger(false);
              }}
            />
          </View>
        }
      />
    </KeyboardAwareScrollView>
  );
};
