import React, {useEffect, useState }  from "react";
import {  ActivityIndicator, FlatList, ScrollView, TouchableOpacity, Image, Dimensions, StyleSheet, Text, View } from "react-native";

import firebase from "firebase";
import "@firebase/firestore";

const Explore = ({ navigation }) =>  {
  const [dance, setDanceScore] = useState([]);
  const [lady, setLadyScore] = useState([]);
  const [men, setMenScore] = useState([]);
  const [pair, setPairScore] = useState([]);
  const [loading, setLoading] = useState();

  const [toggle, setToggle] = useState(0);
  const [isFalse1, setisFalse1] = useState(true);
  const addtoggle = ()=>{
    setToggle(toggle + 1)
  };

  const getDanceScore = () => {
    const docRef = firebase.firestore().collection("liveScore").doc("iceSkate");
    docRef.get().then(function (doc) {
      if (doc.exists) {
        const userData = doc.data();
        setDanceScore(userData);
        setTimeout(() => {
          setLoading(false);
        }, 600);
      } else {
        setLoading(false);
        console.log("Document not exist");
      }
    });
  };
  const getLadyScore = () => {
    const docRef = firebase.firestore().collection("liveScore").doc("ladies");
    docRef.get().then(function (doc) {
      if (doc.exists) {
        const userData = doc.data();
        setLadyScore(userData);
        setTimeout(() => {
          setLoading(false);
        }, 600);
      } else {
        setLoading(false);
        console.log("Document not exist");
      }
    });
  };
  const getMenScore = () => {
    const docRef = firebase.firestore().collection("liveScore").doc("men");
    docRef.get().then(function (doc) {
      if (doc.exists) {
        const userData = doc.data();
        setMenScore(userData);
        setTimeout(() => {
          setLoading(false);
        }, 50);
      } else {
        setLoading(false);
        console.log("Document not exist");
      }
    });
  };
  const getPairScore = () => {
    const docRef = firebase.firestore().collection("liveScore").doc("pairs");
    docRef.get().then(function (doc) {
      if (doc.exists) {
        const userData = doc.data();
        setPairScore(userData);
        setTimeout(() => {
          setLoading(false);
        }, 50);
      } else {
        setLoading(false);
        console.log("Document not exist");
      }
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
          getDanceScore();
          getLadyScore();
          getMenScore();
          getPairScore();
        } else {
          setDanceScore(null);
          setLadyScore(null);
          setMenScore(null);
          setPairScore(null);
          setLoading(false);
        }
      });
    });

    return isFocused;
  }, [dance, lady, men, pair, loading ]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator color="#fff" />
      </View>
    );
  }



  return (
    <View>
      <ScrollView style={styles.bg}>
        <View style={styles.container}>
        
        <View  style={[styles.toggleScore]}>
        <Text style={[styles.competition]}>2020 Skate America Results</Text>
            <TouchableOpacity 
              onPress={addtoggle}
              style={[
                styles.toggleProfile,
                isFalse1
                ? styles.toggleContainerOn
                : styles.toggleContainerOff
              ]}
            >
              <Text 
                style={
                  isFalse1
                  ? styles.toggleOn
                  : styles.toggleOff
                }
              >
                I
                
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={addtoggle}
              style={[
                styles.togglePosts,
                isFalse1
                ? styles.toggleContainerOff
                : styles.toggleContainerOn
              ]}
            >
              <Text style={
                isFalse1
                ? styles.toggleOff
                : styles.toggleOn
              }>
                II
              </Text>
            </TouchableOpacity>
        </View>

        {/* Individual Score */} 
        <ScrollView
        horizontal={true} 
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={200}
        decelerationRate="fast"
        pagingEnabled
        style={[
          isFalse1
            ? styles.displayOn
            : styles.displayOff
        ]}
        >
          <View style={[styles.liveScore]}>
            <View style={styles.scoreTile}>
              <Text style={[styles.text, styles.category]}>Men Individual</Text>

              <View style={[styles.row]}>
                <Text style={[styles.placement]}>1st</Text>
                <Text style={[styles.score]}>{men.score1}</Text>
                <Text style={[styles.text, styles.athlete]}>{men.name1}</Text>
              </View>
              <View style={[styles.row]}>
                <Text style={[styles.placement]}>2nd</Text>
                <Text style={[styles.score]}>{men.score2}</Text>
                <Text style={[styles.text, styles.athlete]}>{men.name2}</Text>
              </View>
              <View style={[styles.row]}>
                <Text style={[styles.placement]}>3rd</Text>
                <Text style={[styles.score]}>{men.score3}</Text>
                <Text style={[styles.text, styles.athlete]}>{men.name3}</Text>
              </View>
            
            </View>
          </View>

          <View style={[styles.liveScore]}>
            <View style={styles.scoreTile}>
              <Text style={[styles.text, styles.category]}>Ladies Individual</Text>

              <View style={[styles.row]}>
                <Text style={[styles.placement]}>1st</Text>
                <Text style={[styles.score]}>{lady.score1}</Text>
                <Text style={[styles.text, styles.athlete]}>{lady.name1}</Text>
              </View>
              <View style={[styles.row]}>
                <Text style={[styles.placement]}>2nd</Text>
                <Text style={[styles.score]}>{lady.score2}</Text>
                <Text style={[styles.text, styles.athlete]}>{lady.name2}</Text>
              </View>
              <View style={[styles.row]}>
                <Text style={[styles.placement]}>3rd</Text>
                <Text style={[styles.score]}>{lady.score3}</Text>
                <Text style={[styles.text, styles.athlete]}>{lady.name3}</Text>
              </View>

            </View>
          </View>

        </ScrollView>

        {/* Team Score */} 
        <ScrollView
        horizontal={true} 
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={200}
        decelerationRate="fast"
        pagingEnabled
        style={[
          isFalse1
            ? styles.displayOff
            : styles.displayOn
        ]}
        >

          <View style={[styles.liveScore]}>
            <View style={[styles.scoreTile]}>
              <Text style={[styles.text, styles.category]}>Pairs</Text>

              <View style={[styles.row]}>
                <Text style={[styles.placement]}>1st</Text>
                <Text style={[styles.score]}>{pair.score1}</Text>
                <Text style={[styles.text, styles.athlete]}>{pair.name1}</Text>
              </View>
              <View style={[styles.row]}>
                <Text style={[styles.placement]}>2nd</Text>
                <Text style={[styles.score]}>{pair.score2}</Text>
                <Text style={[styles.text, styles.athlete]}>{pair.name2}</Text>
              </View>
              <View style={[styles.row]}>
                <Text style={[styles.placement]}>3rd</Text>
                <Text style={[styles.score]}>{pair.score3}</Text>
                <Text style={[styles.text, styles.athlete]}>{pair.name3}</Text>
              </View>

            </View>
          </View>

          <View style={[styles.liveScore]}>
           <View style={[styles.scoreTile]}>
              <Text style={[styles.text, styles.category]}>Ice Dance</Text>

              <View style={[styles.row]}>
                <Text style={[styles.placement]}>1st</Text>
                <Text style={[styles.score]}>{dance.score3}</Text>
                <Text style={[styles.text, styles.athlete]}>{dance.name1}</Text>
              </View>
              <View style={[styles.row]}>
                <Text style={[styles.placement]}>2nd</Text>
                <Text style={[styles.score]}>{dance.score3}</Text>
                <Text style={[styles.text, styles.athlete]}>{dance.name2}</Text>
              </View>
              <View style={[styles.row]}>
                <Text style={[styles.placement]}>3rd</Text>
                <Text style={[styles.score]}>{dance.score1}</Text>
                <Text style={[styles.text, styles.athlete]}>{dance.name3}</Text>
              </View>

            </View>
          </View>

        </ScrollView>

       
          

        {/* Latest News */}          
        <View style={[styles.tile]}>
        <Text style={[ styles.subtitle]}>Latest News</Text>
       
          <View style={[styles.section]}>

            

          <View style={[styles.newsPost]}>  
            <Image style={styles.postImg} source={{uri:"https://s1.reutersmedia.net/resources_v2/images/rcom-default.png"}} />
            <Text style={styles.postTitle}>
              Figure skating: Skate Canada cancelled after rise in COVID-19 cases - Reuters
            </Text>
            <Text style={[styles.PostSource]}>
              source: Reuters
            </Text>
            
          </View>
          <View style={[styles.newsPost]}>  
            <Image style={styles.postImg} source={{uri:"https://img.bleacherreport.net/img/images/photos/003/889/498/hi-res-3ed5e57e05d7cc1a27313c6703f283b6_crop_exact.jpg?w=1200&h=1200&q=75"}} />
              <Text style={styles.postTitle}>
                ISU GP Skate America 2020: TV Schedule, Live Stream, Predictions for All Events
              </Text>
              <Text style={[styles.PostSource]}>
                source: Bleacher Report
              </Text>
            
          </View>
          <View style={[styles.newsPost]}>  
            <Image style={styles.postImg} source={{uri: "https://img.bleacherreport.net/img/images/photos/003/889/748/hi-res-411148c5449c50e91768c9b54f61c16d_crop_exact.jpg?w=1200&h=1200&q=75"}} />
              <Text style={styles.postTitle}>
              Skate America 2020 Results: Nathan Chen Dazzles in Men's Short Program
              </Text>
              <Text style={[styles.PostSource]}>
                source: Bleacher Report
              </Text>
            
          </View>
          
        </View>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonTxt}>Load More</Text>
          </TouchableOpacity>

        </View>

      </View>

      </ScrollView>
    </View>
  );
}

export default Explore;

const styles = StyleSheet.create({
  bg:{
    backgroundColor: "#203354",
  },
  container:{
    flex: 1,
    paddingTop: 35,
    alignItems: "center",
    justifyContent: "center",
    width: Dimensions.get("window").width,
    backgroundColor: "#203354",
  },
  content:{
   alignItems: "center",
  },
  row:{
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
    flexDirection: 'row',
  },

  toggle:{
    marginTop: 15,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  toggleOn:{
    color: "grey",
    fontSize: 15,
    textAlign: "center",
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  toggleContainerOn:{
    backgroundColor: "white",
  },
  toggleOff:{
    color: "white",
    fontSize: 15,
    textAlign: "center",
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  toggleContainerOff:{
    backgroundColor: "gray",
  },
  toggleProfile:{
    color: "gray",
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25
  },
  togglePosts:{
    color: "white",
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25
  },
  displayOff:{
    display: "none"
  },
  displayOn:{
    display: "flex"
  },

  toggleScore:{
    flexDirection: 'row',
    marginTop: 25,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  liveScore:{
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    borderRadius: 10,
    marginVertical: 15,
    marginTop: 30,
    paddingBottom: 20,
    marginHorizontal: 35,
    width: Dimensions.get("window").width/1.2,
    
  },
  scoreTile:{
    justifyContent: "center",
    marginHorizontal: 25,
  },
  competition: {
    color: "#f0f8ff",
    textAlign: "left",
    fontSize: 18,
    fontWeight: "700",
    paddingVertical: 3,
    paddingRight: 15
  },
  category:{
    textAlign: "center",
    fontSize: 17,
    marginVertical: 5,
    paddingBottom: 5,
    fontStyle: "italic",
    color: "gray"
  },
  placement:{
    width: Dimensions.get("window").width/9,
    fontSize: 16,
    paddingTop: 13,
    paddingRight: 10
  },
  score: {
    fontSize: 20,
    fontWeight: "500",
    paddingVertical: 10,
    width: Dimensions.get("window").width/5,
  },
  athlete:{
    fontSize: 16,
    paddingVertical: 10,
    textAlign: "right",
    color: "grey",
    width: Dimensions.get("window").width/2.5,
  },

  tile:{
    borderRadius: 10,
    marginVertical: 35,
    backgroundColor: "#f5f5f5",
    width: Dimensions.get("window").width/1.1,
  },
  titleContainer:{
    borderBottomWidth: 0.5,
    borderBottomColor: "darkgray",
    backgroundColor: "#f0f8ff",
    width: Dimensions.get("window").width,
  },
  title: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "500",
    paddingTop: 55,
    paddingBottom: 15,
    paddingHorizontal: 25,
  },

  subtitle: {
    color: "gray",
    textAlign: "center",
    fontSize: 22,
    fontWeight: "500",
    paddingVertical: 15,
    paddingHorizontal: 25,
  },
  section:{
    backgroundColor: "#F0F0F0",
    marginBottom: 30,
  },
  newsPost:{
    backgroundColor: "#f0f8ff",
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
    marginTop: 8,
  },
  postImg:{
    height: 170,
    width: Dimensions.get("window").width/1.1,
  },
  postTitle:{
    fontSize: 18,
    fontWeight: "500",
    marginHorizontal: 20,
    marginVertical: 15,
  },
  PostSource:{
    color: "gray",
    textAlign: "right",
    marginHorizontal: 20,
    marginBottom: 10
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
