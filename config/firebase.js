const firebase = require("firebase/app");
require("firebase/auth");
require("firebase/firestore");

// Add Firebase SDK Snippet
const firebaseConfig = {
    apiKey: "AIzaSyD58FGDtuo2rSK33jsr5GWcXo61wwbmlhk",
    authDomain: "nodejs-san.firebaseapp.com",
    projectId: "nodejs-san",
    storageBucket: "nodejs-san.appspot.com",
    messagingSenderId: "834770840669",
    appId: "1:834770840669:web:029cec88de8a3f28ecb1b4"
};


firebase.initializeApp(firebaseConfig);

module.exports = firebase;