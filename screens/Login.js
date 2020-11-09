import React, { useState } from 'react'
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import firebase from 'firebase'

const Login = ({ navigation }) => {
    const [loginForm, setloginForm] = useState({
        email: "sally@email.com",
        password: "password",
    });

    const onChangeTextEmail = (email) => {
        setloginForm({
            ... loginForm,
            email,
        });
    };
    const onChangeTextPassword = (password) => {
        setloginForm({
            ... loginForm,
            password,
        });
    };
    const loginHandler = () => {
        return new Promise(() => {
          firebase
            .auth()
            .signInWithEmailAndPassword(loginForm.email, loginForm.password)
            .then((res) => {
              navigation.navigate("Main");
            })
            .catch((err) => alert(err.message));
        });
      };
    

    return (
    <View style={styles.container}>
        <Image style={styles.logo} source={require("../assets/images/skating.png")} />
        <TextInput 
            style={styles.input} 
            placeholder="Email" 
            autoCapitalize="none" 
            onChangeText={onChangeTextEmail} 
        />
        <TextInput 
            style={styles.input} 
            placeholder="Password" 
            autoCapitalize="none" 
            secureTextEntry 
            onChangeText={onChangeTextPassword}
        />
        <TouchableOpacity style={styles.button} onPress={loginHandler}>
            <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity 
            style={styles.button} 
            onPress={() => {
                navigation.navigate("Signup");
            }}
        >
            <Text style={styles.buttonText}>Create Account</Text>
        </TouchableOpacity>
    </View>
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#203354",
        justifyContent: "center",
        paddingHorizontal: 20,
    },
    logo:{
        alignSelf: "center",
        marginBottom: 55,
        height: 200,
        width: 200,
    },
    input:{
        backgroundColor: "white",
        padding: 20,
        borderRadius: 5,
        marginBottom: 10,
        marginHorizontal: 15,
        width: Dimensions.get("window").width/1.2,
    },
    button:{
        backgroundColor: "#23395d",
        padding: 20,
        borderRadius: 5,
        marginHorizontal: 15,
        marginBottom: 10,
        width: Dimensions.get("window").width/1.2,
    },
    buttonText:{
        textAlign: "center",
        color: "white",
        fontWeight: "700"
    }
})
