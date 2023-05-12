//const { cookie } = require("express-validator");



function checkIfLoggedIn(){
    if (localStorage.getItem('firebase_idToken')){
        document.getElementById('google-pic')
                .setAttribute('src', localStorage.getItem('google_photo'))
                
        document.getElementById('google-signin')
                .setAttribute('style', 'display: none; visibility: hidden')

        document.getElementById('google-signout')
                .setAttribute('style', 'display: inline-block; visibility: visible')

  

        document.getElementById('google_email')
                .innerHTML = localStorage.getItem('google_email');

      
        const google_email = localStorage.getItem('google_email');
        console.log(google_email);
        
        document.cookie = `google_email=${google_email}; expires=Thu, 01 Jan 2025 00:00:00 UTC; path=/`;
    
       
        return true;

    } else {
        document.getElementById('google-signin')
                .setAttribute('style', 'display: inline-block; visibility: visible');
        
        document.getElementById('google-signout')
                .setAttribute('style', 'display: none; visibility: hidden');


        document.getElementById('google-signout')
                .setAttribute('style', 'display: none; visibility: hidden');

    
 
        document.getElementById('google_email')
                .innerHTML = '';

   
        return false;
        }
}

window.onload = function() {
    checkIfLoggedIn()
}

function signOut(){
    localStorage.removeItem('google_photo');
    localStorage.removeItem('firebase_idToken');
    localStorage.removeItem('google_email');

    document.getElementById('google-pic')
            .setAttribute('src', '');

    
    checkIfLoggedIn()
    location.reload();

}

function signInWithGoogle(){
    var googleAuthProvider = new firebase.auth.GoogleAuthProvider;
    firebase.auth().signInWithPopup(googleAuthProvider)
            .then( function(data){
                console.log(data);
                //Set image, p, h3
                //photo url of my google acc
                //email
                //and displayName 

                var idToken = data.credential.idToken;
                var photoURL = data.additionalUserInfo.profile.picture;
                var myEmail = data.additionalUserInfo.profile.email;

                localStorage.setItem('firebase_idToken', idToken);
                localStorage.setItem('google_photo', photoURL);
                localStorage.setItem('google_email', myEmail);

                checkIfLoggedIn();
                location.reload();
            })
            .catch( function(error) {
                console.log(error);
            })
}