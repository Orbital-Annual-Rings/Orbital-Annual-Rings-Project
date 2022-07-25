import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    TextInput,
    KeyboardAvoidingView,
    Pressable,
    Dimensions,
    FlatList,
    ToastAndroid,
    Keyboard,
    Alert,
    ActivityIndicator
} from 'react-native';
import React, { useState, useEffect } from 'react';
import {
    addDoc,
    onSnapshot,
    query,
    collection,
    doc,
    deleteDoc,
    where,
    updateDoc
} from 'firebase/firestore';

import { auth, db } from '../../firebase';
import ContactsItem from '../../components/ContactsItem'

import { Accelerometer } from 'expo-sensors';

import * as SMS from 'expo-sms';

import * as ImagePicker from 'expo-image-picker';

//const INPUT_PLACEHOLDER = 'Enter your contact and hit Add';
const THEME = '#407BFF';

const { width } = Dimensions.get('window');

const CloseFriendsScreen = () => {
    const [contactName, setContactName] = useState('');
    const [contactNameErrorMessage, setContactNameErrorMessage] = useState('');
    
    const [contactNumber, setContactNumber] = useState('');
    const [contactNumberErrorMessage, setContactNumberErrorMessage] = useState('');

    const [contactsList, setContactsList] = useState([]);

    const [dp, setDp] = useState('hello');

    //const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Expensive operation. Consider your app's design on when to invoke this.
        // Could use Redux to help on first application load.
        const contactsQuery = query(collection(db, 'contacts'), where('userId', '==', auth.currentUser.uid));

        const unsubscribe = onSnapshot(contactsQuery, (snapshot) => {
            const contacts = [];

            snapshot.forEach((doc) => {
                contacts.push({ id: doc.id, ...doc.data() });
            });

            setContactsList([...contacts]);
        });

        return unsubscribe;
    }, [onSubmitHandler, dp]);

    /*const showRes = (text) => {
        ToastAndroid.show(text, ToastAndroid.SHORT);
    };*/

    // https://firebase.google.com/docs/firestore/manage-data/add-data#web-version-9
    // https://firebase.google.com/docs/firestore/manage-data/add-data#web-version-9_7
    const onSubmitHandler = async () => {
        if (contactName.length === 0 || contactNumber.length === 0) {
            if (contactName.length === 0 && contactNumber.length !== 0) {
                setContactNameErrorMessage('Contact name cannot be empty!');
                setContactNumberErrorMessage('');
                return;
            } else if (contactNumber.length === 0 && contactName.length !== 0) {
                setContactNumberErrorMessage('Contact number cannot be empty!');
                setContactNameErrorMessage('');
                return;
            } else {
                setContactNameErrorMessage('Contact name cannot be empty!');
                setContactNumberErrorMessage('Contact number cannot be empty!');
                return;
            }
        } else {
            setContactNameErrorMessage('');
            setContactNumberErrorMessage('');
        }

        try {
            const contactRef = await addDoc(collection(db, 'contacts'), {
                contactName: contactName,
                contactNumber: contactNumber,
                displayPicture: null,
                userId: auth.currentUser.uid
            });

            console.log('onSubmitHandler success', contactRef.id);
            //showRes('Successfully added contact!');
            clearForm();
        } catch (err) {
            console.log('onSubmitHandler failure', err);
            //showRes('Failed to add contact!');
            Alert.alert(
                "Failed to add contact!",
                [
                  { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
            );
        }
    };

    const onDeleteHandler = async (id) => {
        try {
            await deleteDoc(doc(db, 'contacts', id));

            console.log('onDeleteHandler success', id);
            //showRes('Successfully deleted contact!');
        } catch (err) {
            console.log('onDeleteHandler failure', err);
            //showRes('Failed to delete contact!');
            Alert.alert(
                "Failed to delete contact!",
                [
                  { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
            );
        }
    };

    const clearForm = () => {
        setContactName('');
        setContactNumber('');
        Keyboard.dismiss();
    };

    

    return (
            <SafeAreaView style={styles.container}>
                <View style={styles.contentContainer}>
                    <Text style={styles.headerText}>Your Contacts 👋🏻</Text>
                    <View style={styles.listContainer}>
                        
                        <FlatList
                            data={contactsList}
                            renderItem={({ item, index }) => (
                                <ContactsItem
                                    data={item}
                                    key={index}
                                    onDelete={onDeleteHandler}
                                    dpState={dp}
                                    setDpState={setDp}
                                />
                            )}
                            style={styles.list}
                            showsVerticalScrollIndicator={false}
                        />
                    </View>
                </View>
                
                <KeyboardAvoidingView
                style={[{ flex: 1 }, styles.formContainer]}
                behavior={(Platform.OS === 'ios') ? 'padding' : null}
                enabled
                keyboardVerticalOffset={Platform.select({ ios: 100, android: 500 })}> 
                    <View style={{flexDirection: 'column'}}>
                        <TextInput
                            onChangeText={setContactName}
                            value={contactName}
                            selectionColor={THEME}
                            placeholder={'Enter your contact name'}
                            style={styles.contactInput}
                        />
                        <Text style={{color: 'red'}}>
                            {contactNameErrorMessage}
                        </Text>

                        <TextInput
                            onChangeText={setContactNumber}
                            value={contactNumber}
                            selectionColor={THEME}
                            placeholder={'Enter your contact number'}
                            style={styles.contactInput}
                        />
                        <Text style={{color: 'red'}}>
                            {contactNumberErrorMessage}
                        </Text>
                    </View>
                    <Pressable
                        onPress={onSubmitHandler}
                        android_ripple={{ color: 'white' }}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>Add</Text>
                    </Pressable>
                </KeyboardAvoidingView>
            </SafeAreaView>
    );
};

export default CloseFriendsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAF9F6',
    },
    contentContainer: {
        flex: 1,
        backgroundColor: '#FAF9F6',
    },
    listContainer: {
        flex: 1,
        paddingBottom: 70, // Fix: Temporary workaround
    },
    list: {
        overflow: 'scroll',
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 32,
        marginLeft: 14,
        marginTop: 14,
        marginBottom: 10,
        color: THEME,
    },
    formContainer: {
        position: 'absolute',
        bottom: 10,
        flexDirection: 'row',
        paddingHorizontal: 14,
        paddingVertical: 8,
        backgroundColor: '#FAF9F6',
    },
    contactInput: {
        width: width * 0.7,
        borderWidth: 2,
        borderRadius: 5,
        borderColor: '#E0D4B0',
        paddingVertical: 10,
        paddingHorizontal: 12,
        marginRight: 8,
    },
    button: {
        width: width * 0.22,
        paddingVertical: 10,
        paddingHorizontal: 6,
        backgroundColor: THEME,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
    },
});