import React, {useEffect, useState }  from "react";
import { FlatList, ScrollView, ActivityIndicator, TouchableOpacity, Image, Dimensions, StyleSheet, Text, View } from "react-native";
import { Entypo } from "@expo/vector-icons";

import firebase from "firebase";
import "@firebase/firestore";

const Home = ({ navigation }) => {

  const [userInfo, setUserInfo] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState();

  const getUserData = () => {
    const docRef = firebase.firestore().collection("posts");

    docRef.get().then(function(querySnapshot) {
      const users = [];
      querySnapshot.forEach(function (doc){
        users.push({
          ...doc.data(),
          key: doc.id,
        });
        if (doc.exists) {
          setUserInfo(users);
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
          getUserData();
        } else {
          setUserInfo(null);
          setLoading(false);
          navigation.navigate("Login");
        }
      });
    });

    return isFocused;
  }, [userInfo, loading, navigation, posts]);

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
    <View style={styles.bg}>
    <View style={styles.container}>

    <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
      <View style={styles.tileSection }>
        <FlatList
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={userInfo}
          renderItem={({ item }) => (
            
            <View style={styles.tile}>

            <View style={[styles.section]}>
              <View style={[styles.row, styles.userInfo]}>
                <Entypo style={styles.miniPfp} name="emoji-happy" size={20} color={"#A7AFB2"} />
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("Athlete", {
                      username: item.username,
                    })
                  }
                >
                  <Text style={styles.athleteURL}>{item.username}</Text>
                </TouchableOpacity>
                
              </View>

              <View style={[styles.postsText]}>  
                <Text>
                {item.text}
                </Text>
                <Text style={[styles.tag]}>
                #{item.tags}
                </Text>
              </View>
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
};
export default Home;

const styles = StyleSheet.create({
  bg:{
    backgroundColor: "#203354",
    height: Dimensions.get("window").height,
  },
  container:{
    flex: 1,
    paddingTop: 35,
    marginBottom: 90,
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
  },

  tile:{
    margin: 15,
    borderRadius: 15,
    borderRadius: 15,
    paddingBottom: 15,
    backgroundColor: "#f5f5f5",
    width: Dimensions.get("window").width/1.2,
  },

  userInfo:{
    marginLeft: 0,
    paddingTop: 15,
    width: Dimensions.get("window").width/1.2,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  miniPfp:{
    borderRadius: 100,
    width: 25,
    height: 25,
    marginTop: 2,
    marginLeft: 17,
    
  },
  athleteURL:{
    marginLeft: 10,
    paddingTop: 3,
    fontSize: 15,
    color: "#2e3a8c"
  },
  postsText:{
    paddingTop: 5,
    marginHorizontal: 50,
    marginTop: 5,
  },
  tag:{
    color: "#2e3a8c"
  },

  button:{
    alignSelf: "center",
    marginBottom: 30,
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
  }
  
});
