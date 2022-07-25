import { StyleSheet, View, Text, TouchableOpacity, Image, ImageBackground } from 'react-native';
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

import RecipeList from '../../components/RecipeList';

const MealRecipesScreen = ({ navigation }) => {

    const pressed = () => {
        console.log('hi');
    }

    

    return (
        <View style={{flex:1}}>
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
                
                <View style={{flex: 0.1}}></View>

                <TouchableOpacity 
                    style={styles.button} 
                    onPress={() => navigation.navigate('Diabetes')
                    }
                >
                    <Image
                        style={styles.imageStyle} 
                        source={require("../../assets/diabetes.png")}/>
                    <Text style={styles.buttonText}> Diabetes </Text>
                </TouchableOpacity>

                <View style={{flex: 0.1}}></View>

                <TouchableOpacity 
                    style={styles.button} 
                    onPress={() => navigation.navigate('HighBloodPressure')}>
                    <Image 
                        style={styles.imageStyle} 
                        source={require("../../assets/high-blood-pressure.png")}/>
                    <Text style={styles.buttonText}> High Blood </Text>
                    <Text style={styles.buttonText}> Pressure </Text>
                </TouchableOpacity>

                <View style={{flex: 0.1}}></View>

            </View>
            <View style={{flex: 1, flexDirection: 'row'}}>

                <View style={{flex: 0.1}}></View>

                <TouchableOpacity 
                    style={styles.button} 
                    onPress={() => navigation.navigate('HeartDisease')}>
                    <Image 
                        style={styles.imageStyle} 
                        source={require("../../assets/heart-disease.png")}/>
                    <Text style={styles.buttonText}> Heart </Text>
                    <Text style={styles.buttonText}> Disease </Text>
                </TouchableOpacity>

                <View style={{flex: 0.1}}></View>

                <TouchableOpacity 
                    style={styles.button} 
                    onPress={() => navigation.navigate('Arthritis')}>
                    <Image 
                        style={styles.imageStyle} 
                        source={require("../../assets/arthritis.png")}/>
                    <Text style={styles.buttonText}> Arthritis </Text>
                </TouchableOpacity>

                <View style={{flex: 0.1}}></View>

            </View>
        </View>
  );
}

export default MealRecipesScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#EBECF0',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
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