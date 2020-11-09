import React, { useState } from 'react'
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import firebase from 'firebase'

const Signup = ({ navigation }) => {
    const [SignupForm, setSignupForm] = useState({
        email: "",
        password: "",
        name: "",
    });

    const onChangeTextEmail = (email) => {
        setSignupForm({
            ... SignupForm,
            email,
        });
    };
    const onChangeTextPassword = (password) => {
        setSignupForm({
            ... SignupForm,
            password,
        });
    };
    const onChangeTextName = (name) => {
        setSignupForm({
            ... SignupForm,
            name,
        });
    };
    const createAccount = async () => {
        return new Promise(() => {
            firebase
            .auth()
            .createUserWithEmailAndPassword( SignupForm.email, SignupForm.password)
            .then((res) => {
                firebase
                    .firestore()
                    .collection("users")
                    .doc(res.user.uid)
                    .set({
                        uid: res.user.uid,
                        email: res.user.email,
                        name: SignupForm.name
                    })
                    .then(() => {
                        console.log("User successfully created");
                        navigation.navigate("Main");
                    })
                    .catch(err => 
                        alert("Creat account failed, Error: " + err.message)
                    );
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
        <TextInput 
            style={styles.input} 
            placeholder="Name" 
            onChangeText={onChangeTextName}
        />
        <TouchableOpacity style={styles.button} onPress={createAccount}>
            <Text style={styles.buttonText}>Create Account</Text>
        </TouchableOpacity>
        <TouchableOpacity 
            style={styles.button} 
            onPress={() => {
                navigation.navigate("Login");
            }}
        >
          <Text style={styles.buttonText}>Go to Login</Text>
        </TouchableOpacity>
    </View>
    )
}

export default Signup

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
