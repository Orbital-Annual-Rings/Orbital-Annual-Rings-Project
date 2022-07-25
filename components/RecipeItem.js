import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import { useState } from 'react';

import DisplayRecipeWebpage from './DisplayRecipeWebpage';

import { WebView } from 'react-native-webview';

const RecipeItem = (props) => {

    const { data, setShowWebpage, setWebpageUrl } = props;

    //const [showWebpage, setShowWebpage] = useState(false);

    const DisplayPicture = () => {
        if (data.displayPicture === null) {
            return (
                <Image 
                    source={require('../assets/recipes-default-image.png')}
                    resizeMode='contain'
                    style={styles.image}
                />
            );
        } else {
            return (
                <Image
                    source={{uri: data.displayPicture}}
                    resizeMode='contain'
                    style={styles.image}
                />
            ); 
        };
    };  

    const recipeWebpage = () => {
        return (
            <DisplayRecipeWebpage webpageUrl = {data.webpageUrl}/>
        );
    };
    
    return (
        <View>
            <View style={[styles.container, styles.containerShadow]}>
                <View style={{flex: 4, alignItems: "center"}}>
                    <DisplayPicture/>
                </View>
                <View style={{flex: 6, alignItems: "flex-start", justifyContent: 'center'}}>
                    <Text style={styles.recipeText}>{data.recipeName}</Text>
                </View>
            </View>

            <View style={{flex: 1}}>
                <TouchableOpacity 
                    style={styles.button}
                    onPress={ () => {
                        setShowWebpage(true)
                        setWebpageUrl(data.webpageUrl)
                    } 
                    }
                >
                    <Text style={styles.buttonText}>View Recipe</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
    
};


export default RecipeItem;

const styles = StyleSheet.create({
    container: {
        flex: 9,
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
    recipeText: {
        fontWeight: 'bold',
        //flex: 1,
        flexWrap: 'wrap',
        marginRight: 10,
        marginLeft: 4,
        fontSize: 32,
    },
    image: {
        width: 130,
        height: 150,
        marginVertical: 0,
        paddingBottom: 170
    },
    button: {
        backgroundColor: "blue",
        padding: 5,
        borderRadius: 10,
        textAlign: 'center',
        marginLeft: 13,
        marginRight: 13
    },
    buttonText: {
        fontSize: 15,
        color: '#fff',
        textAlign: "center"
    }, 
});