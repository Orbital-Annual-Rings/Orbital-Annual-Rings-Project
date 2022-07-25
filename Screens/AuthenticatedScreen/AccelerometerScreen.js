import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Accelerometer } from 'expo-sensors';

import {
  onSnapshot,
  query,
  collection,
  where,
} from 'firebase/firestore';

import { auth, db } from '../../firebase';

import * as SMS from 'expo-sms';

const AccelerometerScreen = () => {
  
  const [data, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });
  const [subscription, setSubscription] = useState(null);

  //const [contactsList, setContactsList] = useState([]);
  const [contactNumbers, setContactNumbers] = useState([]);

  const [isMessagingOpen, setIsMessagingOpen] = useState(false);

  const _slow = () => {
    Accelerometer.setUpdateInterval(1000);
  };

  const _fast = () => {
    Accelerometer.setUpdateInterval(16);
  };

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

      //setContactsList([...contacts]);
      setContactNumbers(contactNumbersTemp);
    });

    return unsubscribe;
  }, []);

  const messaging = async () => {
    /*const contactNumbersTemp = [];
    contactsList.forEach((contact) => {
      contactNumbersTemp.push(contact.contactNumber);
    });
    setContactNumbers(contactNumbersTemp);*/
    try {
      setIsMessagingOpen(true);
      const sendMessage = await SMS.sendSMSAsync(contactNumbers, 'User may have taken a fall!');
      console.log(sendMessage.result);
      setIsMessagingOpen(false);
      return;
    } catch (error) {
      console.log(error);
    }
    
    //console.log(contactNumbers);
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

  const { x, y, z } = data;
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Accelerometer: (in Gs where 1 G = 9.81 m s^-2)</Text>
      <Text style={styles.text}>
        x: {x} y: {y} z: {z}
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={subscription ? _unsubscribe : _subscribe} style={styles.button}>
          <Text>{subscription ? 'On' : 'Off'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={_slow} style={[styles.button, styles.middleButton]}>
          <Text>Slow</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={_fast} style={styles.button}>
          <Text>Fast</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AccelerometerScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E0D4B0',
        flexDirection: 'columnSS',
        marginHorizontal: 14,
        marginVertical: 10,
        paddingVertical: 10,
        paddingHorizontal: 6,
        alignItems: 'center',
        borderRadius: 4,
    },
    containerShadow: {
        shadowColor: '#171717',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    contactText: {
        fontWeight: 'bold',
        flex: 1,
        flexWrap: 'wrap',
        marginRight: 10,
        fontSize: 32,
    },
    image: {
        width: 120,
        height: 150,
        marginVertical: 0,
        paddingBottom: 170
    },
    button: {
        backgroundColor: "blue",
        padding: 5,
        borderRadius: 10,
        textAlign: 'center',
    },
    buttonText: {
        fontSize: 15,
        color: '#fff',
        textAlign: "center"
    }, 
    middleButton: {
        backgroundColor: "blue",
        padding: 5,
        borderRadius: 10,
        textAlign: 'center',
    },
});