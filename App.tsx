/* eslint-disable react-native/no-inline-styles */
import RootNavigator from '@routes';
import React from 'react';
import {LogBox} from 'react-native';
import 'react-native-gesture-handler';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import {persistStore} from 'redux-persist';
import {PersistGate} from 'redux-persist/integration/react';
import store from 'store';

let persistor = persistStore(store);

LogBox.ignoreAllLogs();

const App = () => {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <GestureHandlerRootView style={{flex: 1}}>
            <RootNavigator />
          </GestureHandlerRootView>
        </PersistGate>
      </Provider>
    </>
  );
};

export default App;
