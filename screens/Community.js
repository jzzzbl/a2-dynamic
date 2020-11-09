import React, {useEffect, useState }  from "react";
import {FlatList, ActivityIndicator, ScrollView, TouchableOpacity, Image, Dimensions, StyleSheet, Text, View, Button } from "react-native";
import { Entypo } from "@expo/vector-icons";

import firebase from "firebase";
import "@firebase/firestore";

const Community = ({ navigation }) => {
  const [pin, setPinned] = useState([]);
  const [arena, setArena] = useState([]);
  const [archives, setArchives] = useState([]);
  const [curryr, setCurrYr] = useState([]);
  const [loading, setLoading] = useState();

  const [toggle1, setToggle1] = useState(0);
  const [isFalse1, setisFalse1] = useState(true);
  const addtoggle1 = ()=>{
    setToggle1(toggle1 + 1)
  };
  const [toggle2, settoggle2] = useState(0);
  const [isFalse2, setisFalse2] = useState(true);
  const addtoggle2 = ()=>{
    settoggle2(toggle2 + 1)
  };
  const [toggle3, settoggle3] = useState(0);
  const [isFalse3, setisFalse3] = useState(true);
  const addtoggle3 = ()=>{
    settoggle3(toggle3 + 1)
  };

  const getPinnedBoard = () => {
    const docRef = firebase.firestore().collection("pinned");
    docRef.get().then(function(querySnapshot) {
      const pins = [];
      querySnapshot.forEach(function (doc){
        pins.push({
          ...doc.data(),
          key: doc.id,
        });
        if (doc.exists) {
          setPinned(pins);
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
  const getArchivesBoard = () => {
    const docRef = firebase.firestore().collection("archives");
    docRef.get().then(function(querySnapshot) {
      const archs = [];
      querySnapshot.forEach(function (doc){
        archs.push({
          ...doc.data(),
          key: doc.id,
        });
        if (doc.exists) {
          setArchives(archs);
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
  const getArenaBoard = () => {
    const docRef = firebase.firestore().collection("arena");
    docRef.get().then(function(querySnapshot) {
      const arenas = [];
      querySnapshot.forEach(function (doc){
        arenas.push({
          ...doc.data(),
          key: doc.id,
        });
        if (doc.exists) {
          setArena(arenas);
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
  const getCurrYrBoard = () => {
    const docRef = firebase.firestore().collection("currentyr");
    docRef.get().then(function(querySnapshot) {
      const years = [];
      querySnapshot.forEach(function (doc){
        years.push({
          ...doc.data(),
          key: doc.id,
        });
        if (doc.exists) {
          setCurrYr(years);
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
    toggle1 % 2 === 0 ? setisFalse1(true) : setisFalse1(false)
  },[toggle1]);
  useEffect(() => {
    toggle2 % 2 === 0 ? setisFalse2(true) : setisFalse2(false)
  },[toggle2]);
  useEffect(() => {
    toggle3 % 2 === 0 ? setisFalse3(true) : setisFalse3(false)
  },[toggle3]);
  useEffect(() => {
    const isFocused = navigation.addListener("focus", () => {
      setLoading(true);
      firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          getPinnedBoard();
          getArchivesBoard();
          getArenaBoard();
          getCurrYrBoard();
        } else {
          setPinned(null);
          setArchives(null);
          setArena(null);
          setCurrYr(null);
          setLoading(false);
        }
      });
    });

    return isFocused;
  }, [ pin, arena, curryr, archives, loading, navigation]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator color="#fff" />
      </View>
    );
  }
  if (!archives) {
    return (
      <View style={styles.container}>
        <Text>User not found!</Text>
      </View>
    );
  }
  if (!arena) {
    return (
      <View style={styles.container}>
        <Text>User not found!</Text>
      </View>
    );
  }
  if (!curryr) {
    return (
      <View style={styles.container}>
        <Text>User not found!</Text>
      </View>
    );
  }
  if (!pin) {
    return (
      <View style={styles.container}>
        <Text>User not found!</Text>
      </View>
    );
  }

  return (
    <View style={styles.bg}>
    <View style={styles.container}>

      

      <ScrollView style={styles.scroll}>
      <View style={[  styles.section, styles.pinned]}>
        
      <FlatList
        showsVerticalScrollIndicator={false}
        data={pin}
        renderItem={({ item }) => (
          <TouchableOpacity
              onPress={() =>
              navigation.navigate("Thread", {
                id: item.id,
                type: "pinned",
                username: item.username,
                title: item.title,
                date: item.date,
              })
            }
          >
           <View style={[ styles.discTile]}>
            <View style={[styles.row,]}>
            <Entypo name="megaphone" size={30} color={"#A7AFB2"} />
              <View style={styles.discContent}>
                <Text style={styles.discTitle}>{item.title}</Text>
                <Text style={styles.discDesc}>{item.desc}</Text>
              </View>
            </View>
          </View> 
          </TouchableOpacity>

        )}
        keyExtractor={(item, index) => item + index}
      />
        
  
      </View>
      
      <View style={[ styles.section ]}>
        <View style={[ styles.topics]}>
          <Text style={[ styles.topicTxt]}>The Arena</Text>
            <TouchableOpacity 
              onPress={addtoggle1}
              style={[
                styles.toggleProfile
              ]}
            >
              <Entypo 
                name={
                  isFalse1
                  ? "minus"
                  : "plus"
                } 
                size={24} 
                color={"#A7AFB2"} />
            </TouchableOpacity>
         
        </View>
        <View style={[ 
          isFalse1
            ? styles.toggleON
            : styles.toggleOFF
        ]}>
          <Text style={styles.topicDesc}>Figure skating topics, discussions, references, technical info, and more!</Text>  


          <FlatList
            showsVerticalScrollIndicator={false}
            data={arena}
            renderItem={({ item }) => (
              <TouchableOpacity
                  onPress={() =>
                  navigation.navigate("Thread", {
                    id: item.id,
                    type: "arena",
                    username: item.username,
                    title: item.title,
                    date: item.date,
                  })
                }
              >
              <View style={[ styles.discTile]}>
                <View style={[styles.row,]}>
                  <Entypo name="chat" size={30} color={"#A7AFB2"} />
                  <View style={styles.discContent}>
                    <Text style={styles.discTitle}>{item.title}</Text>
                    <Text style={styles.discDesc}>{item.desc}</Text>
                  </View>
                </View>
              </View>
              </TouchableOpacity>

            )}
            keyExtractor={(item, index) => item + index}
          />
          
        </View>
        
      </View>


      <View style={[ styles.section ]}>
        <View style={[ styles.topics]}>
          <Text style={[ styles.topicTxt]}>2020-21 Figure Skating Competitions & Events</Text>
            <TouchableOpacity 
              onPress={addtoggle2}
              style={[
                styles.toggleProfile
              ]}
            >
              <Entypo 
                name={
                  isFalse2
                  ? "plus"
                  : "minus"
                } 
                size={24} 
                color={"#A7AFB2"} />
            </TouchableOpacity>
         
        </View>
        <View style={[ 
          isFalse2
            ? styles.toggleOFF
            : styles.toggleON
            
        ]}>
          <Text style={styles.topicDesc}>The 2020-21 figure skating season began on July 1, 2020 and ends on June 30, 2021.</Text>  

          <FlatList
            showsVerticalScrollIndicator={false}
            data={curryr}
            renderItem={({ item }) => (
              <TouchableOpacity
                  onPress={() =>
                  navigation.navigate("Thread", {
                    id: item.id,
                    type: "currentyr",
                    username: item.username,
                    title: item.title,
                    date: item.date,
                  })
                }
              >
              <View style={[ styles.discTile]}>
                <View style={[styles.row,]}>
                  <Entypo name="medal" size={30} color={"#A7AFB2"} />
                  <View style={styles.discContent}>
                    <Text style={styles.discTitle}>{item.title}</Text>
                    <Text style={styles.discDesc}>{item.desc}</Text>
                  </View>
                </View>
              </View>
              </TouchableOpacity>

            )}
            keyExtractor={(item, index) => item + index}
          />

          
        </View>
        
      </View>

      <View style={[ styles.section, styles.lastSection ]}>
        <View style={[ styles.topics]}>
          <Text style={[ styles.topicTxt]}>The Archives</Text>
            <TouchableOpacity 
              onPress={addtoggle3}
              style={[
                styles.toggleProfile
              ]}
            >
              <Entypo 
                name={
                  isFalse3
                  ? "plus"
                  : "minus"
                } 
                size={24} 
                color={"#A7AFB2"} />
            </TouchableOpacity>
         
        </View>
        <View style={[ 
          isFalse3
            ? styles.toggleOFF
            : styles.toggleON
        ]}>
          <Text style={styles.topicDesc}>Archived threads and posts from the 2003 season to present.</Text>  

          <FlatList
            showsVerticalScrollIndicator={false}
            data={archives}
            renderItem={({ item }) => (
              <TouchableOpacity>
              <View style={[ styles.discTile]}>
                <View style={[styles.row,]}>
                  <Entypo name="archive" size={30} color={"#A7AFB2"} />
                  <View style={styles.discContent}>
                    <Text style={styles.discTitle}>{item.title}</Text>
                    <Text style={styles.discDesc}>{item.desc}</Text>
                  </View>
                </View>
              </View>
              </TouchableOpacity>

            )}
            keyExtractor={(item, index) => item + index}
          />
        </View>
        
      </View>

      </ScrollView>

      </View>
    </View>
  );
}
export default Community;

const styles = StyleSheet.create({
  bg:{
    backgroundColor: "#23395d",
    flex: 1,
  },
  container:{
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: Dimensions.get("window").width,
    backgroundColor: "#203354",
  },
  scroll:{
    height: Dimensions.get("window").height
  },
  
  row:{
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: "center"
  },

  pinned:{
    marginTop: 65,
  },

  discTile:{
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 13,
    alignSelf: "center",
    width: Dimensions.get("window").width/1.1,
    backgroundColor:"#f5f5f5",
  },
  discContent:{
    width: Dimensions.get("window").width/1.37,
  },
  discImg:{
    width: 35,
    height:35,
  },
  discTitle:{
    textAlign: "left",
    fontSize: 20,
    fontWeight: "500",
  },
  discDate:{
    textAlign: "right",
    color: "gray"
  },

  section:{
    paddingBottom: 10,
   
  },
  lastSection:{
    marginBottom: 30,
   
  },
  toggleON:{
    display: "flex",
  },
  toggleOFF:{
    display: "none",
  },
  topics: {
    borderTopWidth: 0.5,
    borderTopColor: "darkgray",
    borderBottomWidth: 0.5,
    borderBottomColor: "darkgray",
    backgroundColor: "#f5f5f5",
    width: Dimensions.get("window").width,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 10,
    flexDirection: "row"
  },
  topicTxt:{
    textAlign: "left",
    fontSize: 20,
    fontWeight: "500",
    width: Dimensions.get("window").width/1.2
  },
  topicDesc:{
    color: "#fff",
    fontWeight: "500",
    fontSize: 13,
    alignSelf: "center",
    marginBottom: 15,
    width: Dimensions.get("window").width/1.1,
  },
  toggle:{
    alignContent: "flex-end",
    borderRadius: 50,
    marginHorizontal: 5,
    height: 25,
    width: 25,
  },


  foot:{
    margin: 40
  }
});
