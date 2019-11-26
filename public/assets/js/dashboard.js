/*

// Create a reference under which you want to list
var listRef = storageRef.child('files/uid');

// Find all the prefixes and items.
listRef.listAll().then(function(res) {
  res.prefixes.forEach(function(folderRef) {
    // All the prefixes under listRef.
    // You may call listAll() recursively on them.
  });
  res.items.forEach(function(itemRef) {
    // All the items under listRef.
  });
}).catch(function(error) {
  // Uh-oh, an error occurred!
});

*/

function dash(){

  var user = firebase.auth().currentUser;
  var ref = firebase.database().ref('users/' + user.uid);

  ref.once('value', function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
          childSnapshot.forEach(function(childSnapshot2){
              var childKey = childSnapshot2.key;
              var childData = childSnapshot2.val();
              console.log(childKey+"key");
              console.log(childData+"Data");
              createcol(childData);

          })
        
        // ...
      });
    });
}

function createcol(src){
  var elem = document.createElement("div");
  elem.setAttribute("class", "col");
  var img = document.createElement("img");

  img.crossOrigin = "anonymous";
  img.setAttribute("class", "flex-shrink-1");
  img.setAttribute("src", src);
 
  img.setAttribute("style", "width: 260px;");
  var par = document.getElementById("img-row");
  par.appendChild(elem);
  elem.appendChild(img);
  img.addEventListener("click", detect, false);

}
//                <div class="col"><img class="flex-shrink-1" src="assets/img/testimonials-2.jpg" style="width: 260px;"></div>


function detect(ev){
  console.log(this);
  // Load the model.
  cocoSsd.load().then(model => {
    // detect objects in the image.
    model.detect(this).then(predictions => {
      console.log('Predictions: ', predictions);
      console.log(predictions[0].class + " "+ predictions[0].score);
      var elem2 = document.createElement("div");
      elem2.setAttribute("class", "col");
      elem2.innerHTML = "Class: "+predictions[0].class + " Score: "+ predictions[0].score;
      var par = document.getElementById("img-row");
      par.appendChild(elem2);
    });
  });
}