import React, { Component } from 'react';
import { SafeAreaView, Button, StyleSheet, FlatList, View } from 'react-native';
import { ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { deleteAlarm } from '../actions/alarms';
//import TimeSelection from './TimeSelection';
import * as Notifications from 'expo-notifications';
//import * as Permissions from 'expo-permissions';

const ListAlarm = (props) => {
    const keyExtractor = (item,index) => index.toString();
    const renderItem = ({item}) => {
        return (
                <ListItem>
                    <ListItem.Content>
                        <ListItem.Title style = {styles.titleStyle} > {item.time.toString()} </ListItem.Title>
                        <ListItem.Subtitle> {item.date.toString()} </ListItem.Subtitle>
                    </ListItem.Content>
                    <Button
                        title ="Remove"
                        color = "red"
                        onPress = {() => {
                                Notifications.cancelScheduledNotificationAsync(item.alarmNotifData.data.currentAlarm._W);
                                props.delete(item.value);
                        }}
                    />
                </ListItem>
        );
      }
      return (
      <FlatList
            keyExtractor = {keyExtractor}
            data = {props.alarms}
            renderItem = {renderItem}
            />
      );
    }


const styles = StyleSheet.create({
  container: {},
  titleStyle: { fontWeight: 'bold', fontSize: 30 },
});

const mapStateToProps = state => {
    return {
        alarms: state.alarms.alarms,
        };
    }
const mapDispatchToProps = dispatch => {
    return {
        delete: value => {
                dispatch(deleteAlarm(value));
                }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ListAlarm);