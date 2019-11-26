
//const selectedFile = document.getElementById('user_group_logo').files[0];



const button = document.getElementById("filebtn");
if(button)
  button.addEventListener('click', handleFiles, false);


var prog = document.getElementById("progress_bar");
if(prog){
prog.innerHTML = "";
}
function handleFiles() {
  var inputElement = document.getElementById("user_group_logo");
  const fileList = inputElement.files;

    // Get current username
  var user = firebase.auth().currentUser;

  var storage = firebase.storage();
  var file = fileList[0];

  // Create a Storage Ref w/ username
  var storageRef = storage.ref(user.uid + '/images/' + file.name);
  var filename = file.name;
  filename = filename.replace(/\./g,"");
  filename = filename.replace(/\#/g,"");
  filename = filename.replace(/\$/g,"");
  filename = filename.replace(/\//g,"");
  filename = filename.replace(/\[/g,"");
  filename = filename.replace(/\]/g,"");
  console.log(filename);
  /*
  // Upload file
  var uploadTask = storageRef.put(file).then(function(snapshot) {
    console.log('Uploaded a blob or file!');
  });

}
*/

  var uploadTask = storageRef.put(file);
  // Listen for state changes, errors, and completion of the upload.
  uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
    function(snapshot) {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      prog.style.width = progress + "%";
      //console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED: // or 'paused'
          //console.log('Upload is paused');
          break;
        case firebase.storage.TaskState.RUNNING: // or 'running'
          //console.log('Upload is running');
          break;
      }
    }, function(error) {

    // A full list of error codes is available at
    // https://firebase.google.com/docs/storage/web/handle-errors
    switch (error.code) {
      case 'storage/unauthorized':
        // User doesn't have permission to access the object
        break;

      case 'storage/canceled':
        // User canceled the upload
        break;

      case 'storage/unknown':
        // Unknown error occurred, inspect error.serverResponse
        break;
    }
  }, function() {
    // Upload completed successfully, now we can get the download URL
  uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
      console.log('File available at', downloadURL);
      //console.log(file.name);
      var ref = firebase.database().ref('users/' + user.uid).push();
      ref.key = filename;
      console.log(filename);
      ref.set({
        [filename] : downloadURL
        
      });
      /*
      firebase.database().ref('users/' + user.uid).set({
        [filename] : downloadURL
        
      });
      */
    });
  });
}
