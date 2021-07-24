//YOUR FIREBASE LINKS
var firebaseConfig = {
      apiKey: "AIzaSyCD-UzAAdz9QCTpuGwC-b5A54lrKIsHXlY",
      authDomain: "class-test-440c2.firebaseapp.com",
      databaseURL: "https://class-test-440c2-default-rtdb.firebaseio.com",
      projectId: "class-test-440c2",
      storageBucket: "class-test-440c2.appspot.com",
      messagingSenderId: "440282802273",
      appId: "1:440282802273:web:3818dc170499417363a220"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    user_name = localStorage.getItem("user_name");
    room_name = localStorage.getItem("room_name");

    function send()
{
  msg = document.getElementById("msg").value;
  firebase.database().ref(room_name).push({
    name:user_name,
    message:msg,
    like:0
   });

  document.getElementById("msg").value = "";
}
function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
         firebase_message_id = childKey;
         message_data = childData;
//Start code
console.log(firebase_message_id);
console.log(message_data);
name = message_data['name'];
message = message_data['message'];
like = message_data['like'];
name_with_tag = "<h4>" + name + "<img class = 'user_tick' src = 'tick.png'> </h4>";
message_with_tag = "<h4 class = 'message_h4'>" + message + "</h4>";
like_button = "<button class = 'btn btn-warning' id = "+firbase_message_id+" value ="+like+" onclick ='updateLike(this.id)'>";
span_with_tag = "<span class = 'glyphicon glyphicon-thumbs-up'>Like: " + like + "</span></button><hr>";
row = name_with_tag + message_with_tag + like_button + span_with_tag;
document.getElementById("output").innerHTML += row;

function updateLike(message_id){
      console.log("click on the like button-" + message_id);
      button_id = message_id;
      likes = document.getElementById(button_id).value;
      updatedLikes = Number(likes) + 1;
      console.log(updatedLikes);
      firebase.database().ref(room_name).child(message_id).update({
            like: updatedLikes
      });
      }
//End code
      } });  }); }
getData();
function logOut(){
      localStorgage.removeItem("user_name");
      localStorage.removeItem("room_name");
      window.loaction = "index.html";
}
