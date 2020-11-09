import React, {useRef, useEffect, useState, useCallback}  from "react";
import {ActivityIndicator, TextInput, FlatList, ScrollView, TouchableOpacity, Image, Dimensions, StyleSheet, Text, View, Button } from "react-native";
import { Entypo } from "@expo/vector-icons";

import firebase from "firebase";
import "@firebase/firestore";

export default function Thread({ navigation ,  route}) {
  const { params } = route;
  const { id, type, username, title, date } = params;

  const [msg, setMsg] = useState([]);
  const [loading, setLoading] = useState();

  const getMsgData = () => {
    const docRef = firebase.firestore().collection(type).doc(id).collection("threads");

    docRef.get().then(function(querySnapshot) {
      const users = [];
      querySnapshot.forEach(function (doc){
        users.push({
          ...doc.data(),
          key: doc.id,
        });
        if (doc.exists) {
          setMsg(users);
          setTimeout(() => {
            setLoading(false);
          }, 50);
        } else {
          setLoading(false);
          console.log("Document not exist");
        }
      })
    });
  };
  useEffect(() => {
    const isFocused = navigation.addListener("focus", () => {
      setLoading(true);
      firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          getMsgData();
        } else {
          setMsg(null)
          setLoading(false);
        }
      });
    });

    return isFocused;
  }, [msg, loading, navigation]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator color="#fff" />
      </View>
    );
  }
  if (!msg) {
    return (
      <View style={styles.container}>
        <Text>User not found!</Text>
      </View>
    );
  }


  return (
    <View style={styles.bg}>
      <View style={styles.container}>

          <ScrollView style={[ styles.ScrollView]}>

          <View style={[ styles.titleSection]}>
          <View style={[ styles.threadRow]}>
            <TouchableOpacity onPress={() => navigation.pop()} style={styles.backBtn}>
              <Entypo name="cross" size={30} color={"#A7AFB2"} />
            </TouchableOpacity>
            <View style={styles.threadTitleSection}>
              <Text style={styles.threadTitle}>{title}</Text>
              <View style={[ styles.threadRow]}>
                <View style={[ styles.threadRow]}>
                  <Entypo style={styles.threadIcons}  name="emoji-neutral" size={15} color={"#A7AFB2"} />
                  <Text style={styles.threadUN}>{username}</Text>
                </View>
                <View style={[ styles.threadRow]}>
                <Entypo style={styles.threadIcons} name="clock" size={15} color={"#A7AFB2"} />
                  <Text style={styles.threadDT}>{date}</Text>
                </View>
              </View>
            </View>
          </View>
            
            
            
          </View>
          

          <View style={[  styles.chatContainer]}>
            
          
          <FlatList
            showsVerticalScrollIndicator={false}
            data={msg}
            renderItem={({ item }) => (

            <View style={[ styles.chatBbl]}>
              <View style={styles.userInfo}>
              <Entypo style={styles.userImg} name="emoji-happy" size={30} color={"#A7AFB2"} />
                <View>
                  <Text style={styles.username}>{item.username}</Text>
                  <Text style={styles.status}>{item.status}</Text>
                </View>
              </View>
              <View style={styles.msgContent}>
                <Text style={styles.bblDate}>Posted: {item.posted}</Text>
                <Text style={styles.bblText}>{item.message}</Text>
              </View>
            </View>

            )}
            keyExtractor={(item, index) => item + index}
          />
            

      
          </View>
        </ScrollView>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bg:{
    backgroundColor: "#203354",
    flex: 1,
  },
  container:{
    flex: 1,
    backgroundColor: "#203354",
    alignItems: "center",
    justifyContent: "center",
    width: Dimensions.get("window").width
  },
  ScrollView:{
    height: Dimensions.get("window").height/1.1,
  },
  row:{
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: "center"
  },

  backBtn:{
    width: 35,
    height:35,
    marginVertical: 10,
    marginRight: 10
  },
  titleSection: {
    backgroundColor: "#f5f5f5",
    textAlign: "center",
    borderBottomWidth: 0.5,
    borderBottomColor: "darkgray",
    paddingTop: 45,
    paddingBottom: 15,
    paddingHorizontal: 25,
    width: Dimensions.get("window").width,
  },
  threadRow:{
    marginRight: 25,
    flexDirection: "row"
  },
  threadIcons:{
    marginTop: 6,
    marginRight: 5,
    height: 15,
    width: 15
  },
  threadTitle:{
    color: "gray",
    fontSize: 24,
    fontWeight: "500",
  },
  threadUN:{
    marginTop: 6,
    fontSize: 14,
    color: "gray"
  },
  threadDT:{
    marginTop: 6,
    fontSize: 14,
    color: "gray"
  },


  chatContainer:{
    marginVertical: 25,
  },
  chatBbl:{
    borderWidth: .5,
    borderColor: "darkgray",
    borderRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 13,
    alignSelf: "center",
    width: Dimensions.get("window").width/1.1,
    backgroundColor:"#f5f5f5",
  },
  userInfo:{
    flexDirection: "row",
    paddingBottom: 10,
    borderBottomWidth: .5,
    borderBottomColor: "darkgray"
  },
  userImg:{
    borderRadius: 50,
    width: 35,
    height:35,
    
  },
  username:{
    color: "#2e3a8c",
    fontWeight: "500",
    fontSize: 16,
    marginHorizontal: 10
  },
  status:{
    color: "darkgray",
    marginHorizontal: 10
  },
  msgContent:{
    paddingTop: 7,
  },
  bblDate: {
    color: "gray"
  },
  bblText: {
    paddingVertical: 5,
    fontSize: 18
  },
  button:{
    width: 35,
    height:35,
  },

});
