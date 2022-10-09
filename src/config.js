import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import 'firebase/compat/auth';

export const firebaseConfig = {
    apiKey: "AIzaSyDOv8Jh1AWx-T9bR6krGHKtwHs0_PWecPo",
    authDomain: "clone-react-7bc56.firebaseapp.com",
    projectId: "clone-react-7bc56",
    storageBucket: "clone-react-7bc56.appspot.com",
    messagingSenderId: "230365703802",
    appId: "1:230365703802:web:c8020586cb5cffd82e55c3",
    measurementId: "G-NH7YEYCCGS"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db  = firebaseApp.firestore();
const auth = firebase.auth();

export {
    db,
    auth
};
