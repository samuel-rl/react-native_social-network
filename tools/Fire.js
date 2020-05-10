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


    getFollow = async () => {
        return new Promise((resolve, reject) => {
            const arrayRes = [];
            let db = this.firestore.collection("users").doc(this.uid);
            db.get().then((snapshot) => {
                res = snapshot.data();
                
                for (const [key, value] of Object.entries(res["follow"])) {
                    value["uid"] = key
                    arrayRes.push(value)
                  }
                resolve(arrayRes)
            })
        })
    }



    following = async (uid) => {
        return new Promise((resolve, reject) => {
            let db = this.firestore.collection("users").doc(this.uid);
            db.get().then((snapshot) => {
                res = snapshot.data();
                if("follow" in res){
                    obj = res['follow'];
                    if(uid in obj){
                        resolve(true);
                    }else{
                        resolve(false);
                    }
                }else{
                    resolve(false);
                }
            })
        })
    }

    /*
    follow(uid){
        let db = this.firestore.collection("users").doc(this.uid);
        db.get().then((snapshot) => {
            res = snapshot.data();
            if("follow" in res){
                obj = res['follow'];
                obj[uid] = true;
                res['follow'] = obj;
            }else{
                res['follow'] = {[uid] : true};
            }
            db.update(res)
        })
    }
    */


   follow(uid){
    let db = this.firestore.collection("users").doc(this.uid);
    db.get().then((snapshot) => {
        res = snapshot.data();
        if("follow" in res){
            obj = res['follow'];

            let db2 = this.firestore.collection("users").doc(uid);
            db2.get().then((snapshot) => {
                res2 = snapshot.data();
                if("follow" in res2){
                    delete res2.follow;
                }
                delete res2.email;
                obj[uid] = res2;
                res['follow'] = obj;
                db.update(res);
            })
        }else{
            let db2 = this.firestore.collection("users").doc(uid);
            db2.get().then((snapshot) => {
                res2 = snapshot.data();
                if("follow" in res2){
                    delete res2.follow;
                }
                delete res2.email;
                res['follow'] = {[uid] : res2};
                db.update(res);
            })
        }

    })
}


    unfollow(uid){
        let db = this.firestore.collection("users").doc(this.uid);
        db.get().then((snapshot) => {
            res = snapshot.data();

                obj = res['follow'];
                delete obj[uid]
                res['follow'] = obj;

            db.update(res)
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