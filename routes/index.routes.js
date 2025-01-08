const express = require("express");
const router = express.Router();
const fileModel = require("../models/files.model");
const authMiddleware = require("../middlewares/auth");
const upload = require("../config/multer.config");
const firebase = require("../config/firebase.config");


router.get("/home", authMiddleware, async (req, res) => {
    try{
        const userFiles = await fileModel.find({
            user: req.user.userId
        });
        console.log(userFiles);
        res.render("home", {
            files: userFiles,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

router.post("/upload", authMiddleware, upload.single("file"), async (req, res) => {
    try {
        const newFile = await fileModel.create({
            path: req.file.path,
            originalname: req.file.originalname,
            user: req.user.userId,
        });
        res.json(newFile);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})


router.get("/download/:path", authMiddleware, async (req, res) => {
    try{
        const loggedInUserId = req.user.userId;
    const path = req.params.path;

    const file = await fileModel.findOne({
        user: loggedInUserId,
        path: path
    })

    if (!file) {
        return res.status(401).json({ error: "unauthorised" });
    }

    const signedUrl = await firebase.storage().bucket().file(path).getSignedUrl({
        action: "read",
        expires: Date.now() + 15 * 60 * 1000,
    });

    res.redirect(signedUrl[0]);
    }
    catch(error){
        res.status(500).json({ error: error.message });
    }
});


module.exports = router;