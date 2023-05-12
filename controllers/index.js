const firebase = require("./../config/firebase")

const admin = require('firebase-admin');

 

exports.signup = (req, res) => {
    if (!req.body.email || !req.body.psw) {
        return res.status(422).json({
            email: "email is required",
            password: "password is required",
        });
    }
    firebase
    .auth()
    .createUserWithEmailAndPassword(req.body.email, req.body.psw)
    .then((data) => {
        return res.status(201).json(data);
    })
    .catch(function (error) {
        let errorCode = error.code;
        let errorMessage = error.message;
        if (errorCode == "auth/weak-password"){
            return res.status(500).json({ error: errorMessage });
        } else {
            return res.status(500).json({ error: errorMessage });
        }

    });
};

exports.signin = (req, res) => {
    
    if (!req.body.email || !req.body.psw) {
        return res.status(422).json({
            email: "email is required",
            password: "password is required"
        });
    }
    
    firebase
    .auth()
    .signInWithEmailAndPassword(req.body.email, req.body.psw)
    .then((user) => {
        return res.status(200).json(user);
    })
    .catch(function (error) {
        let errorCode = error.code;
        let errorMessage = error.message;
        if (errorCode === "auth/wrong-password"){
            return res.status(500).json({ error: errorMessage });
        }
        if (errorMessage === "There is no user record corresponding to this identifier. The user may have been deleted."){
            return res.status(500).json({ error: "Неверный логин или пароль." });
        }
        else{
            console.log(error.message);
            return res.status(500).json({ error: errorMessage })
        }
    })
}
