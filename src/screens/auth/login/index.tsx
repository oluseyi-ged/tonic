/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import {Button, SizedBox, TextInput} from '@components';
import {flash} from '@helpers/FlashMessageHelpers';
import StorageHelper from '@helpers/StorageHelper';
import {useLoginAccountMutation} from '@services/mutationApi';
import {setAuth} from '@slices/auth';
import {setFaux} from '@slices/faux';
import {setMetrics} from '@slices/metrics';
import {setPinned} from '@slices/pinned';
import {setProfile} from '@slices/profile';
import {setToken} from '@slices/token';
import {palette} from '@theme';
import {isObjectEmpty} from '@utils';
import {Formik} from 'formik';
import React, {FC, useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CryptoJS from 'react-native-crypto-js';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import TouchID from 'react-native-touch-id';
import {RootState, useAppDispatch, useAppSelector} from 'store';
import * as yup from 'yup';
import style from './styles';

const {width} = Dimensions.get('window');
const optionalConfigObject = {
  title: 'Authentication Required', // Android
  color: '#e00606', // Android,
  fallbackLabel: 'Show Passcode', // iOS (if empty, then label is hidden)
};

export const Login: FC = ({navigation}: any) => {
  const dispatch = useAppDispatch();
  const formRef = useRef<any>();
  const {profile, metrics, faux, auth} = useAppSelector<any>(
    (store: RootState) => store,
  );
  const [passIn, setPassIn] = useState('');
  const [currentPhone, setCurrentPhone] = useState(profile?.phone);
  const [biometryType, setBiometryType] = useState<any>(null);
  const [authData, setAuthData] = useState<any>(null);

  const [loginAccount, {data, isLoading, isSuccess, isError, error: logErr}] =
    useLoginAccountMutation();

  const handleLogin = val => {
    loginAccount(val);
  };

  const handleNavIn = async () => {
    await dispatch(setProfile(data?.data?.user?.profile));
    navigation.reset({
      index: 0,
      routes: [{name: 'Home'}],
    });
  };

  useEffect(() => {
    if (isSuccess) {
      if (authData !== null) {
        let ciphertext = CryptoJS.AES.encrypt(
          JSON.stringify(authData),
          'ellevate',
        ).toString();
        dispatch(setFaux(ciphertext));
      }
      console.log(data, 'loaded up');
      dispatch(setAuth(data?.data));
      dispatch(setToken(data?.data?.token));
      StorageHelper.saveItem('user', data?.data?.user);
      console.log('first', data?.data);
      dispatch(setPinned(data?.data?.user?.profile?.hasSetTransactionPin));
      if (
        data?.data?.user?.profile?.profileSetupStatus === 'REGISTERED' &&
        !data?.data?.user?.profile?.createdFromEcobankCred
      ) {
        navigation.reset({
          index: 0,
          routes: [{name: 'CreateProfile'}],
        });
      } else if (
        data?.data?.user?.profile?.profileSetupStatus ===
          'PROFILE_SETUP_AWAITING_OTP' &&
        !data?.data?.user?.profile?.createdFromEcobankCred
      ) {
        navigation.reset({
          index: 0,
          routes: [{name: 'Phone'}],
        });
      } else if (
        data?.data?.user?.profile?.profileSetupStatus === 'LIVENESS_VERIFIED' &&
        data?.data?.user?.profile?.createdFromEcobankCred
      ) {
        navigation.reset({
          index: 0,
          routes: [{name: 'EcoData'}],
        });
      } else if (
        data?.data?.user?.profile?.profileSetupStatus === 'LIVENESS_VERIFIED' &&
        !data?.data?.user?.profile?.createdFromEcobankCred
      ) {
        navigation.reset({
          index: 0,
          routes: [{name: 'FinishProfile'}],
        });
      } else if (
        data?.data?.user?.profile?.profileSetupStatus === 'PROFILE_SETUP' &&
        data?.data?.user?.profile?.createdFromEcobankCred
      ) {
        navigation.reset({
          index: 0,
          routes: [{name: 'EcoPictureScreen'}],
        });
      } else if (
        data?.data?.user?.profile?.profileSetupStatus === 'PROFILE_SETUP' &&
        !data?.data?.user?.profile?.createdFromEcobankCred
      ) {
        navigation.reset({
          index: 0,
          routes: [{name: 'PictureScreen1'}],
        });
      }
      if (
        data?.data?.user?.profile?.profileSetupStatus ===
          'ACCOUNT_NUMBER_RETRIEVED' ||
        data?.data?.user?.profile?.profileSetupStatus ===
          'PROFILE_SETUP_COMPLETED' ||
        data?.data?.user?.profile?.profileSetupStatus ===
          'AWAITING_ACCOUNT_NUMBER'
      ) {
        handleNavIn();
      }
      console.log(data, 'check check');
    }
    if (isError && 'status' in logErr!) {
      setAuthData(null);
      if (logErr?.data?.message?.length) {
        flash.danger({description: logErr?.data?.message});
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    data,
    dispatch,
    data?.user?.profile?.createdFromEcobankCred,
    logErr,
    isError,
    isLoading,
    isSuccess,
    navigation,
  ]);

  useEffect(() => {
    TouchID.isSupported()
      .then(type => {
        setBiometryType(type);
      })
      .catch(err => {
        console.log('Error checking biometry support:', err);
      });
  }, []);

  const getMessage = () => {
    if (biometryType === 'Face ID') {
      return 'Scan your Face to continue';
    } else {
      return 'Scan Fingerprint to continue';
    }
  };

  const authenticate = () => {
    return TouchID.authenticate(getMessage(), optionalConfigObject)
      .then(() => {
        // login(faux);
      })
      .catch(err => {
        console.log('TouchID not supported', err);
      });
  };

  const showAuthenticationDialog = () => {
    if (biometryType !== null && biometryType !== undefined) {
      TouchID.isSupported()
        .then(authenticate)
        .catch(err => {
          console.log('TouchID not supported', err);
        });
    } else {
      console.log('biometric authentication is not available');
    }
  };

  const handleSubmit = () => {
    if (formRef.current) {
      formRef.current.handleSubmit();
    }
  };

  const signInSchema = yup.object().shape({
    identifier: yup
      .string()
      .email('Invalid email')
      .required('Email is required'),
    password: yup.string().required('Please enter your password'),
  });

  const initialValues = {
    identifier: '',
    password: '',
  };

  return (
    <SafeAreaView style={style.pageWrap}>
      <KeyboardAwareScrollView keyboardShouldPersistTaps="handled">
        <View style={style.container}>
          <SizedBox height={50} />
          <View>
            <Text style={style.headerLabel}>Welcome Back ✌🏽</Text>
            <Text style={style.headerSub}>
              {isObjectEmpty(profile) ? null : `${profile?.preferredName}, `}
              kindly enter your details to Login.
            </Text>
          </View>
          <SizedBox height={64} />
          <Formik
            initialValues={initialValues}
            innerRef={formRef}
            onSubmit={values => {
              setAuthData(values);
              handleLogin(values);
            }}
            validateOnChange={false}
            validateOnBlur={false}
            validationSchema={signInSchema}>
            {({errors, setFieldValue, values}) => (
              <View>
                {currentPhone?.length ? (
                  <>
                    <Text style={style.userText}>{currentPhone}</Text>
                    <SizedBox height={20} />
                    <TouchableOpacity
                      onPress={() => {
                        setCurrentPhone('');
                        dispatch(setMetrics(false));
                      }}>
                      <Text style={style.switchText}>Switch Account?</Text>
                    </TouchableOpacity>
                    <SizedBox height={40} />
                  </>
                ) : (
                  <>
                    <TextInput
                      placeholder="Enter your Email"
                      label="Email Address"
                      iconName1="mail"
                      name="identifier"
                      // @ts-ignore
                      error={errors?.identifier}
                      autoCorrect={false}
                      onChangeText={value => setFieldValue('identifier', value)}
                      value={values.identifier}
                    />
                  </>
                )}
                <TextInput
                  placeholder="Enter Password"
                  label="Password"
                  // iconName1="lock-dark"
                  type="password"
                  name="password"
                  error={errors?.password}
                  onChangeText={value => {
                    setFieldValue('password', value);
                    setPassIn(value);
                  }}
                  value={values.password}
                />
                <TouchableOpacity
                  onPress={() => navigation.navigate('ForgotPassword')}>
                  <Text style={style.forgotTxt}>Forgot Password?</Text>
                </TouchableOpacity>
              </View>
            )}
          </Formik>
          <SizedBox height={100} />

          <View>
            {!passIn?.length && metrics ? (
              <Button
                title="Sign in with Biometrics"
                containerStyle={{width: width * 0.9, alignSelf: 'center'}}
                // loading={isLoading}
                onPress={showAuthenticationDialog}
              />
            ) : (
              <Button
                title="Login"
                containerStyle={{width: width * 0.9, alignSelf: 'center'}}
                loading={isLoading}
                // onPress={handleSubmit}
                onPress={() => navigation.navigate('CreateProfile')}
              />
            )}
            <SizedBox height={24} />
            <TouchableOpacity
              style={{width: width * 0.9, alignSelf: 'center'}}
              onPress={() => {
                // navigation.navigate('FinishProfile');
                navigation.navigate('Describe');
              }}>
              <Text style={[style.ctaTxt]}>
                Don't have an account?{' '}
                <Text style={{color: palette.purple}}>Create Account</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};
