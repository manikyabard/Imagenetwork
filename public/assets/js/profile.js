firebase.auth().onAuthStateChanged(firebaseUser => {
  if(firebaseUser){
      //console.log(firebaseUser);
      var photo = document.getElementById("profilephoto");
      firebaseUser.providerData.forEach(profile => {
        //console.log(profile.photoURL);
        photo.style.backgroundImage = "url('"+profile.photoURL+"')";
      });
      
  }
  else {
      console.log("user not logged in");
  }
})