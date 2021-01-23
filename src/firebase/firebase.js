import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyAXGLAVbKjEFWdZARALl3Ij4-tvdzcUabM",
    authDomain: "tsundiary2.firebaseapp.com",
    databaseURL: "https://tsundiary2-default-rtdb.firebaseio.com",
    projectId: "tsundiary2",
    storageBucket: "tsundiary2.appspot.com",
    messagingSenderId: "290115154182",
    appId: "1:290115154182:web:6bb486cb96989721b6ae87",
    measurementId: "G-R0CZR1HP7L"
  };

firebase.initializeApp(config);

const database = firebase.database();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { firebase, googleAuthProvider, database as default };