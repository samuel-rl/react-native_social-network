import * as firebase from "firebase";
import { AsyncStorage } from "react-native";
require("firebase/firestore");

var firebaseConfig = {
    apiKey: "AIzaSyB6hDFwrZHHKxAzPR01UTaqJf41f4uoRAw",
    authDomain: "social-net-45fcb.firebaseapp.com",
    databaseURL: "https://social-net-45fcb.firebaseio.com",
    projectId: "social-net-45fcb",
    storageBucket: "social-net-45fcb.appspot.com",
    messagingSenderId: "824391173700",
    appId: "1:824391173700:web:ce010ba2b80eaca6535e11",
    measurementId: "G-69BMYTVY1C"
  };

  class Fire {
    constructor() {
        firebase.initializeApp(firebaseConfig);
    }

    signOut = () => {
        firebase.auth().signOut();
    };

    get firestore() {
        return firebase.firestore();
    }

    get uid() {
        return (firebase.auth().currentUser || {}).uid;
    }

    get timestamp() {
        return Date.now();
    }

    get firebase(){
        return firebase;
    }
}

Fire = new Fire();
export default Fire;