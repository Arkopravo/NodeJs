const multer = require('multer');
const firebaseStorage = require('multer-firebase-storage');
const firebase = require('./firebase.config');
const serviceAccount = require("../node-sheriyan-70b04-firebase-adminsdk-g5r78-a75bd3cdff.json");

const storage = firebaseStorage({
    credentials: firebase.credential.cert(serviceAccount),
    bucketName: "node-sheriyan-70b04.firebasestorage.app",
    unique: true
})


const upload = multer({
    storage: storage,
});


module.exports = upload;