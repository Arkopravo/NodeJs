const Firebase = require("firebase-admin");
const serviceAccount = require("../node-sheriyan-70b04-firebase-adminsdk-g5r78-a75bd3cdff.json");

const firebase = Firebase.initializeApp({
    credential: Firebase.credential.cert(serviceAccount),
    storageBucket: "node-sheriyan-70b04.firebasestorage.app"
})

module.exports = Firebase;