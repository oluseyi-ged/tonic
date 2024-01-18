import AsyncStorage from '@react-native-async-storage/async-storage';
import {configureStore} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/dist/query/react';
import {extApi} from '@services/extApi';
import {mutationApi} from '@services/mutationApi';
import {queryApi} from '@services/queryApi';
import affiliateReducer from '@slices/affiliate';
import authReducer from '@slices/auth';
import blindReducer from '@slices/blind';
import byAcctReducer from '@slices/byAcct';
import directReducer from '@slices/direct';
import existingReducer from '@slices/existingUser';
import fauxReducer from '@slices/faux';
import firstReducer from '@slices/first';
import languageReducer from '@slices/language';
import loadingReducer from '@slices/loading';
import loggedReducer from '@slices/logged';
import metricsReducer from '@slices/metrics';
import ownBizReducer from '@slices/ownBiz';
import pinnedReducer from '@slices/pinned';
import profileReducer from '@slices/profile';
import splashReducer from '@slices/splash';
import tokenReducer from '@slices/token';
import trackReducer from '@slices/track';
import unitsReducer from '@slices/units';
import userReducer from '@slices/user';
import userImgReducer from '@slices/userImg';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import thunkMiddleware from 'redux-thunk';

const reducers = combineReducers({
  units: unitsReducer,
  user: userReducer,
  profile: profileReducer,
  logged: loggedReducer,
  auth: authReducer,
  loading: loadingReducer,
  splash: splashReducer,
  existing: existingReducer,
  first: firstReducer,
  pinned: pinnedReducer,
  blind: blindReducer,
  direct: directReducer,
  metrics: metricsReducer,
  faux: fauxReducer,
  track: trackReducer,
  ownBiz: ownBizReducer,
  byAcct: byAcctReducer,
  userImg: userImgReducer,
  token: tokenReducer,
  affiliate: affiliateReducer,
  language: languageReducer,
  [mutationApi.reducerPath]: mutationApi.reducer,
  [extApi.reducerPath]: extApi.reducer,
  [queryApi.reducerPath]: queryApi.reducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: [
    'units',
    'user',
    'profile',
    'auth',
    'existing',
    'loading',
    'splash',
    'first',
    'metrics',
    'faux',
    'logged',
    'affiliate',
    'language',
  ],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(
      thunkMiddleware,
      mutationApi.middleware,
      extApi.middleware,
      queryApi.middleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
setupListeners(store.dispatch);

export default store;
