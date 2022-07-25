 import {AppRegistry} from 'react-native';
 import MedicationAlarmScreen from './MedicationAlarmScreen';
 import React from 'react';
 import {name as appName} from './app.json';
 import {Provider} from 'react-redux';
 import configureStore from './store';

 const store = configureStore();

 const RNRedux = () => {
   return <Provider store={store}>
     <MedicationAlarmScreen />
   </Provider>
 };

 AppRegistry.registerComponent(appName, () => RNRedux);