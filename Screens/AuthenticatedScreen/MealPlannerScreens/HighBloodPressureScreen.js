import { StyleSheet, View, Text, SafeAreaView, Dimensions } from 'react-native';
import React from 'react';
import { useState } from 'react';

import RecipeList from '../../../components/RecipeList';

import WebView from 'react-native-webview';

const THEME = '#407BFF';

const { width } = Dimensions.get('window');

const HighBloodPressureScreen = ({ navigation }) => {

    const [showWebpage, setShowWebpage] = useState(false);
    const [webpageUrl, setWebpageUrl] = useState('');

    return (
        <SafeAreaView style={styles.container}>
            {(!showWebpage) ? 
            <View style={styles.contentContainer}>
                    <Text style={styles.headerText}>Recipes for High Blood Pressure 🍽</Text>
                        <RecipeList 
                            firestoreCollectionName = 'highBloodPressureRecipes'
                            setShowWebpage = {setShowWebpage}
                            setWebpageUrl = {setWebpageUrl}
                        />
            </View>
            :
            <WebView 
            style={styles.container}
            source={{ uri: webpageUrl }}
            />
            }
        </SafeAreaView>
    );
};

export default HighBloodPressureScreen;

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