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

    createUser = async (user) => {
        let remoteUri = null;
        try {
            await firebase
                .auth()
                .createUserWithEmailAndPassword(user.email, user.password);

            let db = this.firestore.collection("users").doc(this.uid);

            db.set({
                name: user.name,
                firstname: user.firstname,
                email: user.email,
                avatar: null,
            });

            if (user.avatar) {
                remoteUri = await this.uploadPhotoAsync(
                    user.avatar,
                    `avatars/${this.uid}`
                );
                db.set({ avatar: remoteUri }, { merge: true });
            }

            firebase.database().ref().child(`Users/${this.uid}`).set(user);

        } catch (error) {
            console.log(error);
        }
    };

    uploadPhotoAsync = async (uri, filename) => {
        return new Promise(async (res, rej) => {
            const response = await fetch(uri);
            const file = await response.blob();

            let upload = firebase.storage().ref(filename).put(file);

            upload.on(
                "state_changed",
                (snapshot) => {},
                (err) => {
                    rej(err);
                },
                async () => {
                    const url = await upload.snapshot.ref.getDownloadURL();
                    res(url);
                }
            );
        });
    };

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

Fire.shared = new Fire();
export default Fire;