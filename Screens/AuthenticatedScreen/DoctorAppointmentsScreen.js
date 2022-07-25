import { StyleSheet, View, Text } from 'react-native';
import React from 'react';

const DoctorAppointmentsScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text>
            Welcome to the Doctor Appointments Screen
            </Text>
        </View>
    )
};

export default DoctorAppointmentsScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#EBECF0',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});