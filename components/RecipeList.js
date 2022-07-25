import { StyleSheet, Text, View, SafeAreaView, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import React from 'react';
import { useState, useEffect } from 'react';

import RecipeItem from './RecipeItem';

import {
    onSnapshot,
    query,
    collection,
} from 'firebase/firestore';

import { db } from '../firebase';


const THEME = '#407BFF';

const { width } = Dimensions.get('window');

const RecipeList = (props) => {    

    const { firestoreCollectionName, setShowWebpage, setWebpageUrl } = props;

    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        // Expensive operation. Consider your app's design on when to invoke this.
        // Could use Redux to help on first application load.
        const recipesQuery = query(collection(db, firestoreCollectionName));

        const unsubscribe = onSnapshot(recipesQuery, (snapshot) => {
            const recipes = [];

            snapshot.forEach((doc) => {
                recipes.push({ id: doc.id, ...doc.data() });
            });

            setRecipes([...recipes]);
        });

        return unsubscribe;
    }, []);


    return (
        <View style={styles.listContainer}>
            <FlatList
                data={recipes}
                renderItem={({ item, index }) => (
                    <RecipeItem
                        data={item}
                        key={index}
                        setShowWebpage={setShowWebpage}
                        setWebpageUrl={setWebpageUrl}
                    />
                )}
                style={styles.list}
                showsVerticalScrollIndicator={false}
            />
        </View> 
    );
};

export default RecipeList;

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