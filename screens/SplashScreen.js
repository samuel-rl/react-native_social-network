import React from "react";
import { StyleSheet, Text, View, ActivityIndicator} from "react-native";

import firebase from "firebase";

export default class SplashScreen extends React.Component{
    componentDidMount(){
        firebase.auth().onAuthStateChanged(user => {
            user ?  this.props.toggleAuth(true) : this.props.toggleAuth(false)
        });
    }



    render(){
        return(
            <View style={styles.container}>
                <Text>Chargement en cours...</Text>
                <ActivityIndicator size="large"></ActivityIndicator>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    button: {
        marginHorizontal: 30,
        backgroundColor: "#fcbf1e",
        borderRadius: 10,
        height: 60,
        alignItems: "center",
        justifyContent: "center",
    },
    textButton: {
        color: "#FFF",
        fontWeight: "500"
    },
  });