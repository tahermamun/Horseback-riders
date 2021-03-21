import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config'


export const initializeLoginFireBaseFrameWork = () => {
    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig)
    }

};

// Create user function with Email and password by firebase
export const createUserWithEmailAndPassword = (email, password, name) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((res) => {
            updateNewUserName(name)
            const updateUserInfo = {
                error: '',
                success: 'Account has been created successfully'
            }
            return updateUserInfo
        })
        .catch((error) => {
            const updateUserInfo = {
                error: error.message
            }
            return updateUserInfo
        });
}

// sign in function with email and password
export const signInWithEmailAndPassword = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
        .then((res) => {
            const { displayName, email } = res.user
            const updateUserInfo = {
                isSignIn: true,
                name: displayName,
                email: email,
                error: '',
            }
            return updateUserInfo
        })
        .catch((error) => {
            const updateUserInfo = {
                error: error.message
            }
            return updateUserInfo
        });
}

// Google sign Function with firebase
export const GoogleSignInFunc = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth()
        .signInWithPopup(googleProvider)
        .then((result) => {
            const { displayName, email } = result.user

            const updateUserInfo = {
                isSignIn: true,
                name: displayName,
                email: email,
                error: ''
            }
            return updateUserInfo
        }).catch((error) => {

            const updateUserInfo = {
                error: error.message
            }
            return updateUserInfo
        });
}




export const updateNewUserName = newUsername => {
    const user = firebase.auth().currentUser;

    user.updateProfile({
        displayName: newUsername
    }).then(res => {
    }).catch(function (error) {
    });
}
