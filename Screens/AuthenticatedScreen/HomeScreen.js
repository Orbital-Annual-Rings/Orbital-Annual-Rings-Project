import { StyleSheet, View, TouchableOpacity, Text, Image } from 'react-native';
import React, { useState, useEffect } from 'react';

import { Accelerometer } from 'expo-sensors';

import {
  onSnapshot,
  query,
  collection,
  where,
} from 'firebase/firestore';

import { auth, db } from '../../firebase';

import * as SMS from 'expo-sms';

const HomeScreen = ({ navigation }) => {

    //Fall Detector Code (Start)
    //
    const [data, setData] = useState({
        x: 0,
        y: 0,
        z: 0,
      });
    const [subscription, setSubscription] = useState(null);
    
    const [contactNumbers, setContactNumbers] = useState([]);

    const [isMessagingOpen, setIsMessagingOpen] = useState(false);
    
      
    Accelerometer.setUpdateInterval(16);
    
      const _subscribe = () => {
        setSubscription(
          Accelerometer.addListener(accelerometerData => {
            setData(accelerometerData);
          })
        );
      };
    
      const _unsubscribe = () => {
        subscription && subscription.remove();
        setSubscription(null);
      };
      
      useEffect(() => {
        // Expensive operation. Consider your app's design on when to invoke this.
        // Could use Redux to help on first application load.
        const contactsQuery = query(collection(db, 'contacts'), where('userId', '==', auth.currentUser.uid));
    
        const unsubscribe = onSnapshot(contactsQuery, (snapshot) => {
          const contacts = [];
          const contactNumbersTemp = [];
    
          snapshot.forEach((doc) => {
            contacts.push({ id: doc.id, ...doc.data() });
          });
    
          contacts.forEach((contact) => {
            contactNumbersTemp.push(contact.contactNumber);
          });
    
          setContactNumbers(contactNumbersTemp);
        });
    
        return unsubscribe;
      }, []);
    
      const messaging = async () => {
        
        try {
            setIsMessagingOpen(true);
            const sendMessage = await SMS.sendSMSAsync(contactNumbers, 'User may have taken a fall!');
            console.log("Send message status" + sendMessage.result);
            setIsMessagingOpen(false);
            return;
        } catch (error) {
            console.log(error);
        }
      
    };
    
      useEffect(() => {
        _subscribe();
        return () => _unsubscribe();
      }, []);
    
      useEffect(() => {
        if (!isMessagingOpen) {
            if (data.x > 2 || data.x < -2) {
                //console.log(data);
                messaging();
            } else if (data.y > 2 || data.y < -2) {
                //console.log(data);
                messaging();
            } else if (data.z > 2 || data.z < -2) {
                //console.log(data);
                messaging();
            }
        }
    }, [data]);
      //
      //Fall Detector Code (End)

      /*<Pressable
                onPress={() => navigation.navigate('CloseFriendsContacts')}
                style={styles.button}
                android_ripple={{ color: '#FFF' }}
            >
                <Text style={styles.text}>Close Friends</Text>
            </Pressable>

            <Pressable
                onPress={() => navigation.navigate('MedicationAlarm')}
                style={styles.button}
                android_ripple={{ color: '#FFF' }}
            >
                <Text style={styles.text}>Medication Alarm</Text>
            </Pressable>

            <Pressable
                onPress={() => navigation.navigate('Planner')}
                style={styles.button}
                android_ripple={{ color: '#FFF' }}
            >
                <Text style={styles.text}>Planner</Text>
            </Pressable>

            <Pressable
                style={styles.button}
                onPress={() => navigation.navigate('DoctorAppointments')}
                android_ripple={{ color: '#FFF' }}
            >
                <Text style={styles.text}>Doctor Appointments</Text>
            </Pressable>

            <Pressable
                style={styles.button}
                onPress={() => navigation.navigate('AccelerometerTest')}
                android_ripple={{ color: '#FFF' }}
            >
                <Text style={styles.text}>Accelerometer Test</Text>
            </Pressable>*/

    return (
        <View style={styles.container}>
          <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
                
                <View style={{flex: 0.1}}></View>

                <TouchableOpacity 
                    style={styles.button} 
                    onPress={() => navigation.navigate('MealRecipes')}>
                    <Image 
                        style={styles.imageStyle} 
                        source={require("../../assets/meal-recipes.png")}/>
                    <Text style={styles.buttonText}> Meal </Text>
                    <Text style={styles.buttonText}> Recipes </Text>
                </TouchableOpacity>

                <View style={{flex: 0.1}}></View>

                <TouchableOpacity 
                    style={styles.button} 
                    onPress={() => navigation.navigate('MedicationAlarm')}>
                    <Image 
                        style={styles.imageStyle} 
                        source={require("../../assets/medication-alarm.png")}/>
                    <Text style={styles.buttonText}> Medication </Text>
                    <Text style={styles.buttonText}> Alarm </Text>
                </TouchableOpacity>

                <View style={{flex: 0.1}}></View>

            </View>
            <View style={{flex: 1, flexDirection: 'row'}}>

                <View style={{flex: 0.1}}></View>

                <TouchableOpacity 
                    style={styles.button} 
                    onPress={() => navigation.navigate('CloseFriendsContacts')
                    }
                >
                    <Image
                        style={styles.imageStyle} 
                        source={require("../../assets/close-friends.png")}/>
                    <Text style={styles.buttonText}> Close Friends </Text>
                </TouchableOpacity>

                <View style={{flex: 0.1}}></View>

            </View>

        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#EBECF0',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    /*button: {
        backgroundColor: '#407BFF',
        marginVertical: 10,
        paddingVertical: 10,
        width: '80%',
        alignItems: 'center',
        borderRadius: 4,
    },
    text: {
        color: 'white',
    },*/
    button: {
      flex: 1,
      alignItems: "center",
      backgroundColor: "white",
      height: 330,
      borderRadius: 10,
      padding: 20,
      borderWidth: 2,
      borderColor: "black"
    },
    imageStyle: {
        flex: 1,
        resizeMode: "contain",
        width: 140,
        height: 100
    },
    buttonText: {
        alignSelf: 'center',
        color: 'black',
        fontSize: 25,
    }
});