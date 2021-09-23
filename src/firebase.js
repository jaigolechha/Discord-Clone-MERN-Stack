import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyD0c5Y5y327zd31Nm5Jn0istGa9HuiNP2A",
    authDomain: "my-app9-9040b.firebaseapp.com",
    projectId: "my-app9-9040b",
    storageBucket: "my-app9-9040b.appspot.com",
    messagingSenderId: "101189756439",
    appId: "1:101189756439:web:de570c42d2176d18ff5e52",
    measurementId: "G-JHMF018FL9"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export {auth, provider};

export default db;