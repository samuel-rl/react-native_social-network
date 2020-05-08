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

    searchUserByName = async (search) => {
        return new Promise((resolve, reject) => {
            const res = [];
            let db = this.firestore.collection("users");
            db.get()
                .then((snapshot) => {
                    snapshot.forEach((doc) => {
                        const temp = doc.data();
                        temp["uid"] = doc.id;              
                        res.push(temp);
                    });
                })
                .then(() => {
                    const newData = res.filter((item) => {
                        const itemData = `${item.name.toUpperCase()} ${item.firstname.toUpperCase()}`;
                        const textData = search.toUpperCase();
                        return itemData.includes(textData);
                    });
                    resolve(newData);
                });
        });
    };

    following = async (uid) => {
        return new Promise((resolve, reject) => {
            let db = this.firestore.collection("follow").doc(this.uid);
        
            db.get().then((snapshot) => {
                res = snapshot.data();
                    if(res === undefined){
                        resolve(false);
                    }else{
                        if(uid in res){
                            console.log(res)
                            if(res[uid] == true){
                                resolve(true);
                            }else{
                                resolve(false);
                            }
                        }
                        else{
                            resolve(false);
                        }
                    }
                
            })
        })
    }

    follow(uid){
        let db = this.firestore.collection("follow").doc(this.uid);
        db.get().then((doc) => {
            if(!doc.exists){
                db.set({
                    [uid] : true
                });
            }
            else{
                db.update({
                    [uid] : true
                })
            }
        })   
    }

    unfollow(uid){
        let db = this.firestore.collection("follow").doc(this.uid);
        db.get().then((doc) => {
            if(!doc.exists){
                db.set({
                    [uid] : false
                });
            }
            else{
                db.update({
                    [uid] : false
                })
            }
        })   
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

}

Fire.shared = new Fire();
export default Fire;