import React, {Component} from 'react';
import {StyleSheet, View, Button, Text, SafeAreaView} from 'react-native';
import TimeSelection from '../../components/TimeSelection'
import ListAlarm from '../../components/ListAlarm';
import { Provider } from 'react-redux';
import store from '../../store';

class MedicationAlarmScreen extends Component {

  render() {
    return (
    <Provider store={store()}>
      <View style={styles.mainContainer}>
        <Text style={styles.heading}> Welcome To Medication Alarm</Text>
        <SafeAreaView style={styles.listAlarm}>
          <ListAlarm/>
        </SafeAreaView>
        <View style={styles.timeSelection}>
          <TimeSelection/>
        </View>
      </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
  },
  heading: {
    fontSize: 25,
    padding: 20,
  },
  timeSelection: {
    paddingTop: '10%',
    width: '30%',
    bottom: 20,
  },
  listAlarm: {
    flex: 1,
    width: '100%',
  },
});

export default MedicationAlarmScreen;