import { StyleSheet, Text, View, TouchableOpacity, Image, Alert, ActivityIndicator } from 'react-native';
import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
//import AsyncStorage from '@react-native-async-storage/async-storage';
import * as MediaLibrary from 'expo-media-library';
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

import { auth, db, firebaseConfig } from '../firebase';

import Firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
//import { Firestore } from 'firebase/firestore';
//import { getStorage, ref, uploadBytes } from "firebase/storage";
//import { ActivityIndicator } from 'react-native-web';

const ContactsItem = (props) => {

    /*if (!Firebase.apps.length) {
        Firebase.initializeApp(firebaseConfig);
        //Firebase.firestore.settings({ experimentalForceLongPolling: true, merge:true, useFetchStreams: false });
    };*/

    const { data, onDelete, dpState, setDpState } = props;
    //const [selectedImage, setSelectedImage] = React.useState(null);
    //const [imageAvailable, setImageAvailable] = React.useState(false);
    //const [base64Image, setBase64Image] = React.useState(null);
    //const [base64Image1, setBase64Image1] = React.useState(null);
    //const [base64Image2, setBase64Image2] = React.useState(null);
    
    

    const DeleteIcon = () => (
        <TouchableOpacity onPress={() => onDelete(data.id)}>
            <MaterialIcons name="delete" size={28} color="#407BFF" />
        </TouchableOpacity>
    );

    /*getImage = async () => {
        const displayPicture = await AsyncStorage.getItem("displayPicture");
        if (displayPicture) {
            setImageAvailable(true);
            setSelectedImage(JSON.parse(displayPicture));
        }
    };

    componentDidMount = () => {
        getImage();
    }*/

    /*let openImagePickerAsync = async () => {
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
        if (permissionResult.granted === false) {
          alert("Permission to access camera roll is required!");
          return;
        }
    
        let pickerResult = await ImagePicker.launchImageLibraryAsync({base64: true, quality: 0.5});
        if (pickerResult.cancelled === true) {
            return;
        }*/
        /*const image = { uri: pickerResult.uri };
        AsyncStorage.setItem("displayPicture", JSON.stringify(image));
        setSelectedImage(image);
        setImageAvailable(true);*/
      
        /*setSelectedImage({ localUri: pickerResult.uri });
        uploadImage();*/
        //const base64Uri = "data:image/jpg;base64," + pickerResult.base64;
        //const slice1 = base64Uri.slice(0, 5000);
        //const slice2 = base64Uri.slice(5000, );
        //setBase64Image(base64Uri);
        
        /*uploadImage(pickerResult.uri, "test-image").then(() => {
            //Alert.alert("Success");
            console.log("Success");
        })
        .catch((error) => {
            //Alert.alert(error);
            console.log(error);
        });*/
        //setBase64Image1(slice1);
        //setBase64Image2(slice2);

        /*console.log(base64Image1);
        console.log('     ');
        console.log(base64Image2);*/

        //setDpState(base64Uri);
        //console.log(dpState);
        /*console.log(selectedImage.localUri);
        console.log('     ');
        console.log(base64Image);*/

        

        //const storage = getStorage();

        

        
        /*const storageRef = ref(storage, auth.currentUser.uid);

        uploadBytes(storageRef, blob).then((snapshot) => {
            console.log('Uploaded a blob or file!');
        });
    };*/

    /*const uploadImage = async (uri, imageName) => {
        const response = await fetch(uri);
        const blob = await response.blob();

        const ref = firebase.storage().ref().child("images/" + imageName);
        return ref.put(blob);*/
    //};

    const [image, setImage] = React.useState(null);
    const [uploading, setUploading] = React.useState(false);
    const [updatingUrl, setUpdatingUrl] = React.useState(false);

    //var URL = '';

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        //aspect: [4, 3],
        quality: 0.2,
        });

        console.log(result);

        if (!result.cancelled) {
        setImage(result.uri);
        };
    };

    const uploadImage = async () => {

        //Working Code (Start)
        /*const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
                resolve(xhr.response);
            };

            xhr.onerror = function () {
                reject(new TypeError("Network request failed"));
            };

            xhr.responseType = "blob";
            xhr.open("GET", image, true);
            xhr.send(null);
        });

        const ref = Firebase.storage().ref().child(new Date().toISOString());
        const snapshot = ref.put(blob);

        snapshot.on(
            Firebase.storage.TaskEvent.STATE_CHANGED, 
            () => {
                setUploading(true);
                setUpdatingUrl(true);
                //logging
                console.log("uploading to firebase storage: " + uploading);
            },
            (error) => {
                setUploading(false);
                console.log(error);
                blob.close();
                return;
            },
            () => {
                snapshot.snapshot.ref.getDownloadURL().then((url) => {
                    
                    URL = url;
                    setUploading(false);
                    //logging
                    console.log("download url : ", url);
                
                    console.log(URL);

                    const reference = doc(db, 'contacts', data.id);
                    updateDoc(reference, {displayPicture: URL}).
                        then(() => {console.log('Display picture updated!');});

                    setUpdatingUrl(false);

                    blob.close();
                    return url;
                });
            }
        );*/
        //Working Code (End)

        const permission = await MediaLibrary.requestPermissionsAsync();
        setUploading(true);
        if (permission.granted) {
            try {
                const asset = await MediaLibrary.createAssetAsync(image);
                const alb = await MediaLibrary.getAlbumAsync(data.contactName);
                const localAsset = await MediaLibrary.getAssetInfoAsync(asset);
                console.log(localAsset);
                const localUri = localAsset.localUri;
                console.log(localUri);
                
                const reference = doc(db, 'contacts', data.id);
                updateDoc(reference, {displayPicture: localUri}).
                    then(() => {console.log('Display picture updated!');});
                /*Alert.alert(
                    "Notice", 
                    "Saving a new picture will prompt deletion of old album and picture if previously saved, please click 'OK' when prompted later");*/
                if (alb !== null) {
                    MediaLibrary.deleteAlbumsAsync(alb, true).then(() => {
                        console.log('Old Album Deleted Successfully!');
                    })
                    .catch(() => {
                        console.log('Error In Deleting Old Album!');
                    });
                }
                MediaLibrary.createAlbumAsync(data.contactName, asset, false)
                .then(() => {
                    console.log('File Saved Successfully!');
                    Alert.alert('File Saved Successfully!');
                    setUploading(false);
                })
                .catch(() => {
                    console.log('Error In Saving File!');
                    Alert.alert('Error In Saving File!');
                    setUploading(false);
                });
            } catch (error) {
                console.log(error);
            }
        } else {
            console.log('Need Storage permission to save file');
            Alert.alert('Need Storage permission to save file');
            setUploading(false);
        }
    };
      
    const DisplayPicture = () => {
        if (data.displayPicture === null) {
            if (image === null) {
                return (
                    <Image 
                        source={require('../assets/OrbitalSignupPhoto.jpeg')}
                        resizeMode='contain'
                        style={styles.image}
                    />
                );
            } else {
                return (
                    <Image
                      source={{uri: image}}
                      resizeMode='contain'
                      style={styles.image}
                    />
                );
            }
        } else {
            if (image === null) {
                return (
                    <Image
                      source={{uri: data.displayPicture}}
                      resizeMode='contain'
                      style={styles.image}
                    />
                );
            } else {
                return (
                    <Image
                      source={{uri: image}}
                      resizeMode='contain'
                      style={styles.image}
                    />
                );
            }
            
        }
    };  
    
    return (
        <View style={[styles.container, styles.containerShadow]}>
            <View style={{flex: 8, alignItems: "center"}}>
                <DisplayPicture/>
                <TouchableOpacity 
                    style={styles.button}
                    onPress={pickImage}>
                    <Text style={styles.buttonText}>Add/Change Picture</Text>
                </TouchableOpacity>
                
                {
                (!uploading || !updatingUrl) ? 
                <TouchableOpacity 
                    style={styles.button}
                    onPress={uploadImage}>
                    <Text style={styles.buttonText}>Save Picture</Text>
                </TouchableOpacity> : 
                <ActivityIndicator size = "large" color = "#000" /> 
                }
            </View>
            <View style={{
                flexDirection: 'column',
                flex: 10,
            }}>
                <View>
                    <Text style={styles.contactText}>{data.contactName}</Text>
                </View>
                <View>
                    <Text style={[styles.contactText, {fontWeight: 'normal'}]}>{data.contactNumber}</Text>
                </View>
            </View>
            <View style={{flex: 2}}>
                <DeleteIcon />
            </View>
        </View>
    );
};

export default ContactsItem;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E0D4B0',
        flexDirection: 'row',
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
});