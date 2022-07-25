import { StyleSheet } from 'react-native';
import React from 'react';

import { WebView } from 'react-native-webview';

const DisplayRecipeWebpage = (props) => {

    const { webpageUrl } = props;

    return (
        <WebView 
            style={styles.container}
            source={{ uri: webpageUrl }}
        />
    );
};

export default DisplayRecipeWebpage;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#EBECF0',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});