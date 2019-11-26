// TODO: Replace the following with your app's Firebase project configuration
var firebaseConfig = {
    apiKey: "AIzaSyDotaKVCoCtusr26SemJeBwogpnO_CD5dg",
        authDomain: "imagenet-a7b4b.firebaseapp.com",
        databaseURL: "https://imagenet-a7b4b.firebaseio.com",
        projectId: "imagenet-a7b4b",
        storageBucket: "gs://imagenet-a7b4b.appspot.com",
        messagingSenderId: "222638698054",
        appId: "1:222638698054:web:df26969ce6cbbff9582447",
        measurementId: "G-JKJCNHJB1V"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();


  // Get a reference to the storage service, which is used to create references in your storage bucket
  var storage = firebase.storage();

  