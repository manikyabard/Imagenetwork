firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
.then(function() {
  // Existing and future Auth states are now persisted in the current
  // session only. Closing the window would clear any existing state even
  // if a user forgets to sign out.
  // ...
  // New sign-in will be persisted with session persistence.
//   return firebase.auth().signInWithEmailAndPassword(email, password);
})
.catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
});

var ui = new firebaseui.auth.AuthUI(firebase.auth());

var uiConfig = {
callbacks: {
    signInSuccessWithAuthResult: function(authResult, redirectUrl) {
    // User successfully signed in.
    // Return type determines whether we continue the redirect automatically
    // or whether we leave that to developer to handle.
    return true;
    },
    uiShown: function() {
    // The widget is rendered.
    // Hide the loader.
    document.getElementById('loader').style.display = 'none';
    }
},
// Will use popup for IDP Providers sign-in flow instead of the default, redirect.
signInFlow: 'redirect',
signInSuccessUrl: 'profile.html',
signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.
    firebase.auth.GoogleAuthProvider.PROVIDER_ID
],
// Terms of service url.
tosUrl: '<your-tos-url>',
// Privacy policy url.
privacyPolicyUrl: '<your-privacy-policy-url>'
};

  // The start method will wait until the DOM is loaded.
if(ui){
ui.start('#firebaseui-auth-container', uiConfig);
}
firebase.auth().onAuthStateChanged(firebaseUser => {
    if(firebaseUser){
        console.log(firebaseUser);
    }
    else {
        console.log("user not logged in");
    }
})

function Signout() {
   firebase.auth().signOut()
	
   .then(function() {
      console.log('Signout Succesfull')
   }, function(error) {
      console.log('Signout Failed')  
   });
}

var navlogout = document.getElementById("nav-logout");
var sidelogout = document.getElementById("side-logout");
if (navlogout){
    navlogout.addEventListener("click", Signout);
}
if (sidelogout){
    sidelogout.addEventListener("click", Signout);
}



