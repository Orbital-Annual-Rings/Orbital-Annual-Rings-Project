import React from 'react';
import {View, StyleSheet, Text, ScrollView, Image} from 'react-native';

//import Input from '../components/Inputs';
//import Submit from '../components/Submit';

import { AuthTextInput, AuthPressable } from '../components';

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from 'firebase/auth';

import { auth } from '../firebase';

const Register = props => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signUpHandler = async () => {
        if (email.length === 0 || password.length === 0) {
            missingFieldsToast();
            return;
        }

        await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredentials) => {
                const user = userCredentials.user;

                // To show the user object returned
                console.log(user);

                restoreForm();
                signUpToast();
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;

                console.error('[signUpHandler]', errorCode, errorMessage);
            });
    };

    return (
        <ScrollView style={{backgroundColor: 'white'}}>
            <View style={styles.container}> 
                <Image source={require('../assets/OrbitalSignupPhoto.jpeg')} resizeMode="center" style={styles.image} />
                <Text style={styles.textTitle}>Let's Get Started</Text>
                <Text style={styles.textBody}>Create an account to use Annual Rings</Text>
                {/*<Input name="Full Name" icon="user" />
                <Input name="Phone" icon="phone" />
                <Input name="Confirm Password" icon="lock" pass={true} />*/}
                <AuthTextInput
                    value={email}
                    placeholder="Your Email"
                    textHandler={setEmail}
                    keyboardType="email-address"
                />
                <AuthTextInput
                    value={password}
                    placeholder="Your Password"
                    textHandler={setPassword}
                    secureTextEntry
                />
                <AuthPressable
                    onPressHandler={signUpHandler}
                    title={'Proceed'}
                />
                <View style={{flexDirection: 'row'}}>
                    <Text style={styles.textBody}>Aiready have an account</Text>
                    <Text style={[styles.textBody, {color: 'blue'}]} onPress={() => props.navigation.navigate('Home')}> Login here</Text>

                </View>
            </View>
            
        </ScrollView>    
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    image: {
        width: 400,
        height: 250,
        marginVertical: 10,
    },
    textTitle: {
        fontSize: 40,
        fontFamily: 'sans-serif',
        marginVertical: 5
    },
    textBody: {
        fontSize: 16,
        fontFamily: 'sans-serif'
    }
});

export default Register;