import React, { useEffect, useState }  from "react";
import {ActivityIndicator, FlatList, ScrollView, TouchableOpacity, Image, Dimensions, StyleSheet, Text, View, Button } from "react-native";
import { Entypo } from "@expo/vector-icons";

import firebase from "firebase";
import "@firebase/firestore";

export default function Athlete({ route, navigation }) {
  const { params } = route;
  const { username } = params;

  const [userInfo, setUserInfo] = useState([]);
  const [score, setScoreInfo] = useState([]);
  const [loading, setLoading] = useState();

  const [toggle, setToggle] = useState(0);
  const [isFalse1, setisFalse1] = useState(true);
  const addtoggle = ()=>{
    setToggle(toggle + 1)
  };

  const getAthleteData = () => {
    const docRef = firebase.firestore().collection("athletes").doc(username);

    docRef.get().then(function(doc){
        if (doc.exists) {
          const userData = doc.data();
          setUserInfo(userData);
          setTimeout(() => {
            setLoading(false);
          }, 50);
        } else {
          setLoading(false);
          console.log("Document not exist");
        }
    });
  };

  const getScoreData = () => {
    const docRef = firebase.firestore().collection("athletes").doc(username).collection("highlights");

    docRef.get().then(function(querySnapshot) {
      const users = [];
      querySnapshot.forEach(function (doc){
        users.push({
          ...doc.data(),
          key: doc.id,
        });
        if (doc.exists) {
          setScoreInfo(users);
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
    toggle % 2 === 0 ? setisFalse1(true) : setisFalse1(false)
  },[toggle]);

  useEffect(() => {
    const isFocused = navigation.addListener("focus", () => {
      setLoading(true);
      firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          getAthleteData();
          getScoreData();
        } else {
          setUserInfo(null);
          setScoreInfo(null)
          setLoading(false);
          navigation.navigate("Login");
        }
      });
    });

    return isFocused;
  }, [userInfo, loading, navigation, score]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator color="#fff" />
      </View>
    );
  }
  if (!userInfo) {
    return (
      <View style={styles.container}>
        <Text>User not found!</Text>
      </View>
    );
  }


  return (
    <View>
      <ScrollView style={styles.bg}>

        <View style={styles.container}>
           
          <View style={styles.profile}>
            <Entypo style={styles.athletePfp}  name="v-card" size={70} color={"#f0f8ff"} />
            <Text style={[styles.athleteName]}>{userInfo.name}</Text>
            <Text style={[styles.country, styles.subText]}>{userInfo.country}</Text>

            <View style={styles.row}>
            <Entypo  style={styles.medalIcon} name="medal" color={"#AE8913"} />
             <Text style={[styles.gold, styles.medalText]}>{userInfo.gold}</Text>
             <Entypo style={styles.medalIcon} name="medal"  color={"#A7AFB2"} />
             <Text style={[styles.silver, styles.medalText]}>{userInfo.silver}</Text>
             <Entypo  style={styles.medalIcon} name="medal" color={"brown"} />
             <Text style={[styles.bronze, styles.medalText]}>{userInfo.bronze}</Text>
            </View>
          </View>
         
          <View style={ styles.tile }>

            <View style={[styles.section]}>
              <View style={[styles.content]}>
                <Text style={[ styles.title]}>{userInfo.title}</Text>
                <Text style={[styles.description]}>{userInfo.desc}</Text>
                <TouchableOpacity style={styles.button}>
                  <Text style={styles.buttonTxt}>Read More</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View>
              <Text style={[styles.title]}>Competitive Highlights</Text>

              <View>
                <FlatList
                  data={score}
                  renderItem={({ item }) => (
                    
                    <View style={styles.singleTile}>
                      <Text style={[styles.season]}>{item.season}</Text>
                      <Text style={[styles.text, styles.competition]}>{item.name}</Text>
                      <Text style={[styles.text, styles.subtitle]}>{item.fs}</Text>
                      <View style={[styles.row]}>
                        <Text style={[styles.placement]}>{item.fsPlace}</Text>
                        <Text style={[styles.score]}>{item.fsScore}</Text>
                        <Text style={[styles.text, styles.event]}>{item.fsCat}</Text>
                      </View>
                      <Text style={[styles.text, styles.subtitle]}>{item.tot}</Text>
                      <View style={[styles.row]}>
                        <Text style={[styles.gold, styles.medalText]}>{item.totPlace}</Text>
                        <Text style={[styles.score]}>{item.totScore}</Text>
                        <Text style={[styles.text, styles.event]}>{item.totCat}</Text>
                      </View>
                    </View>

                  )}
                  keyExtractor={(item, index) => item + index}
                />
              </View>

              <TouchableOpacity style={styles.button}>
                  <Text style={styles.buttonTxt}>Older</Text>
                </TouchableOpacity>

            </View>

          </View> 

      </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  bg:{
    backgroundColor: "#203354",
    paddingTop: 5,
  },
  container:{
    flex: 1,
    paddingBottom: 80,
    alignItems: "center",
    justifyContent: "center",
    width: Dimensions.get("window").width,
    backgroundColor: "#203354",
  },
  section:{
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0"
  },
  content:{
   alignItems: "center",
  },
  

  row:{
    flexDirection: 'row',
  },

  profile:{
    marginHorizontal: 4,
    paddingTop: 15,
    width: Dimensions.get("window").width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  athletePfp:{
    borderRadius: 100,
    width: 75,
    height: 75,
    margin: 10,
  },
  athleteName:{
    color: "#f0f8ff",
    fontSize: 22,
    textTransform: "uppercase",
    fontWeight: "600",
  },
  country:{
    fontSize: 16,
    padding: 2
  },
  medalIcon:{
    fontWeight: "500",
    fontSize: 20,
    paddingVertical: 10,
    paddingLeft: 10,
    
  },
  medalText:{
    fontWeight: "500",
    fontSize: 20,
    paddingVertical: 10,
    paddingLeft: 5,
    paddingRight: 15
    
  },
 
  
  gold:{
    color: "#AE8913",
  },
  silver:{
    color: "#9C9C9C",
  },
  bronze:{
    color: "brown",
  },


  tile:{
    marginTop: 25,
    borderRadius: 15,
    backgroundColor: "#f5f5f5",
    width: Dimensions.get("window").width/1.1,

  },

  title: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "500",
    paddingTop: 25,
    paddingHorizontal: 25,
  },
  description:{
    fontSize: 15,
    marginTop: 15,
    paddingHorizontal: 25,
  },
  button:{
    alignSelf: "center",
    margin: 30,
    borderRadius: 6,
    borderWidth: 1.3,
    borderColor: "gray",
    width: Dimensions.get("window").width/3,
  },
  buttonTxt:{
    color: "gray",
    fontSize: 15,
    textAlign: "center",
    paddingVertical: 8,
  },

  singleTile:{
    marginHorizontal: 50,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  season: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "500",
    paddingTop: 20,
  },
  competition:{
    fontSize: 16,
    marginTop: 10,
    paddingBottom: 5,
    fontStyle: "italic",
    color: "gray"
  },
  subtitle:{
    paddingBottom: 2,
    paddingHorizontal: 10,
    fontStyle: "italic",
    color: "darkgray"
  },
  score: {
    fontSize: 20,
    fontWeight: "500",
    paddingVertical: 10,
    width: Dimensions.get("window").width/3.5,
  },
  event:{
    fontSize: 16,
    paddingVertical: 10,
    paddingRight: 15,
    textAlign: "right",
    color: "grey",
    width: Dimensions.get("window").width/3.5,
  },
  placement:{
    fontSize: 16,
    paddingTop: 13,
    paddingLeft: 8,
    paddingRight: 10
  },

});
