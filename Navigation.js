import * as React from 'react';
import { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { MaterialIcons } from '@expo/vector-icons';

import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebase';

import LoginScreen from './Screens/MainScreen/LoginScreen';
import RegisterScreen from './Screens/MainScreen/RegisterScreen';

import HomeScreen from './Screens/AuthenticatedScreen/HomeScreen';
import CloseFriendsScreen from './Screens/AuthenticatedScreen/CloseFriendsScreen';
import MedicationAlarmScreen from './Screens/AuthenticatedScreen/MedicationAlarmScreen';
import MealRecipesScreen from './Screens/AuthenticatedScreen/MealRecipesScreen';
import DoctorAppointmentsScreen from './Screens/AuthenticatedScreen/DoctorAppointmentsScreen';
import AccelerometerScreen from './Screens/AuthenticatedScreen/AccelerometerScreen';

import DiabetesScreen from './Screens/AuthenticatedScreen/MealPlannerScreens/DiabetesScreen';
import HighBloodPressureScreen from './Screens/AuthenticatedScreen/MealPlannerScreens/HighBloodPressureScreen';
import HeartDiseaseScreen from './Screens/AuthenticatedScreen/MealPlannerScreens/HeartDiseaseScreen';
import ArthritisScreen from './Screens/AuthenticatedScreen/MealPlannerScreens/ArthritisScreen';

const Navigation = () => {

    const Stack = createNativeStackNavigator();
    const AuthStack = createNativeStackNavigator();

    /*const LogoutIcon = () => (
        <TouchableOpacity onPress={logoutHandler}>
            <MaterialIcons name="logout" size={28} color="#407BFF" />
        </TouchableOpacity>
    );*/

    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        // Mounting function
        const unsubscribeAuthStateChanged = onAuthStateChanged(
            auth,
            (authenticatedUser) => {
                if (authenticatedUser) {
                    setIsAuth(true);
                } else {
                    setIsAuth(false);
                }
            }
        );

        // Clean up mechanism
        // React performs clean up when component unmounts. In our case,
        // app stops running.
        return () => unsubscribeAuthStateChanged();
    }, []);

    const logoutHandler = () => {
        signOut(auth).then(() => {
            setIsAuth(false);
        });
    };

    const LogoutIcon = () => (
        <TouchableOpacity onPress={logoutHandler}>
            <MaterialIcons name="logout" size={28} color="#407BFF" />
        </TouchableOpacity>
    );

    const MainScreenNavigator = () => (
        <Stack.Navigator initialRouteName="Main">
            <Stack.Screen 
                name="Main" 
                component={LoginScreen} 
                options={{ title: 'Login' }} />
            <Stack.Screen 
                name="Register" 
                component={RegisterScreen} 
                options={{ title: 'Register' }} />
        </Stack.Navigator>
    );

    const AuthenticatedScreenNavigator = () => (
        <AuthStack.Navigator>
            <AuthStack.Screen 
                name="Home" 
                component={HomeScreen} 
                options={{ headerTitle: 'Home', headerRight: () => <LogoutIcon /> }} />
            <AuthStack.Screen 
                name="CloseFriendsContacts" 
                component={CloseFriendsScreen} 
                options={{ title: 'Close Friends' }} />
            <AuthStack.Screen 
                name="MedicationAlarm" 
                component={MedicationAlarmScreen} 
                options={{ title: 'Medication Alarm' }} />
            <AuthStack.Screen 
                name="MealRecipes" 
                component={MealRecipesScreen} 
                options={{ title: 'Meal Recipes' }} />
            <AuthStack.Screen 
                name="DoctorAppointments" 
                component={DoctorAppointmentsScreen} 
                options={{ title: 'Doctor Appointments' }} />
            <AuthStack.Screen 
                name="AccelerometerTest" 
                component={AccelerometerScreen} 
                options={{ title: 'Accelerometer Test' }} />
            <AuthStack.Screen 
                name="Diabetes" 
                component={DiabetesScreen} 
                options={{ title: 'Diabetes Recipes' }} />
            <AuthStack.Screen 
                name="HighBloodPressure" 
                component={HighBloodPressureScreen} 
                options={{ title: 'High Blood Pressure Recipes' }} />
            <AuthStack.Screen 
                name="HeartDisease" 
                component={HeartDiseaseScreen} 
                options={{ title: 'Heart Disease Recipes' }} />
            <AuthStack.Screen 
                name="Arthritis" 
                component={ArthritisScreen} 
                options={{ title: 'Arthritis Recipes' }} />
        </AuthStack.Navigator>
    );

    return (
        <NavigationContainer>
            {isAuth ? <AuthenticatedScreenNavigator /> : <MainScreenNavigator />}
        </NavigationContainer>
    );

};

export default Navigation;