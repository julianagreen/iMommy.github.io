
var auth2; // The Sign-In object.
var SCOPE = 'https://www.googleapis.com/auth/calendar';
var CLIENT_ID = '463068943114-9jvudf1fa16lljeuphr8oiak619elmmu.apps.googleusercontent.com';
var API_KEY = 'AIzaSyDSg6Rg0QO3PXM4eOnwgY2I6zMxNsz-URE';
var config = {
  apiKey: "AIzaSyCQfdDRPJMVYP0ayXcavuV07KH91v0pcls",
  authDomain: "imommy-54972.firebaseapp.com",
  databaseURL: "https://imommy-54972.firebaseio.com",
  storageBucket: "imommy-54972.appspot.com",
};

window.onload = function() {
  debugger;
  firebase.initializeApp(config);
  gapi.load('client:auth2', initAuth);
  window.friendlyChat = new FriendlyChat();
}

function initAuth() { // Log user in
  gapi.client.setApiKey(API_KEY);
  gapi.auth2.init({
    client_id: CLIENT_ID,
    scope: SCOPE
  }).then(function () {
    auth2 = gapi.auth2.getAuthInstance();
    auth2.isSignedIn.listen(updateSigninStatus); // Listen for sign-in state changes.
    updateSigninStatus(auth2.isSignedIn.get()); // Handle the initial sign-in state.
  });
}

function updateSigninStatus(isSignedIn) { //Switch current page depending on user signin
  var location = window.location.pathname;
  if (location == '/sign_in.html' && isSignedIn) {
    window.location.href = '/imommy.html';
  }
  else if (location != '/sign_in.html' && !isSignedIn) {
    window.location.href = '/sign_in.html';
  }
}

function renderButton() {
  gapi.signin2.render('my-signin2', {
    'scope': 'profile email https://www.googleapis.com/auth/calendar',
    'width': 240,
    'height': 50,
    'longtitle': true,
    'theme': 'dark',
    'onsuccess': onSuccess,
    'onfailure': onFailure
  });
}

function onSuccess(googleUser) {
  console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
  user = googleUser;
  profile = googleUser.getBasicProfile;
  console.log(profile.getName());
  console.log(profile.getId());
}

function onFailure(error) {
  console.log(error);
}

function signIn(event) { //trigger signin on click
  auth2.signIn();
}

function signOut(event) { //trigger signout on click
  auth2.signOut(); 
}

function loadCalendarApi() { //Load Google Calendar client library
  gapi.client.load('calendar', 'v3', listCalendars);
}

// function listCalendars() { // List all calendars
//   var request = gapi.client.calendar.calendarList.list();

//   request.execute(function(resp) {
//     var calendars = resp.items;
//     appendPre('Check Console');
//     for (i=0;i<calendars.length;i++) {
//       listUpcomingEvents(calendars[i]['id']);
//     }
//   });
// }

function addCalendarEvent(){
    var details = {}
  var list = $('.edit_cal input');
  for (i = 0; i < list.length; i++) { 
    details[list[i].id] = list[i].value;
  }

  var month = $('#month');
  var day = $('#day');
  var end_month = $('#end_month');
  var end_day = $('#end_day');

  var calendar_event = {
    'summary': details.title,
    'description': details.description,
    "start": {
      "dateTime": "2016-" + month + "-" + day + "T10:00:00-12:00:00",
      "timeZone": "America/Los_Angeles"
    },
    "end": {
      "dateTime": "2016-" + end_month + "-" + end_day + "T10:00:00-12:00:00",
      "timeZone": "America/Los_Angeles"
    },
    'reminders': {
      'useDefault': true
    }
  };

  var request = gapi.client.calendar.events.insert({
    'calendarId': 'primary',
    'resource': calendar_event
  });

  request.execute(function(response) {
    alert(details.title + "was successfully added to your calendar");
  });
}

// function listUpcomingEvents(calendarID){ // Print the summary and start datetime/date of the next ten events
//   var calendarId = calendarID;
//   var request_events = gapi.client.calendar.events.list({
//     'calendarId': calendarId,
//     'timeMin': (new Date()).toISOString(),
//     'singleEvents': true,
//     'showDeleted': false,
//     'maxResults': 3,
//     'orderBy': 'startTime'
//   });

//   request_events.execute(function(resp) {
//     var events = resp.items;

//     for (i = 0; i < events.length; i++) {
//       var event = events[i];
//       var when = event.start.dateTime;
//       if (!when) {
//         when = event.start.date;
//       }
//       appendPre(event.summary + ' (' + when + ')');
//     }
//   })
// }

// function appendPre(message) { // Append a pre element to the body containing the given message
//   var pre = document.getElementById('output');
//   var textContent = document.createTextNode(message + '\n');
//   pre.appendChild(textContent);
// }

// var carousel = $(".carousel"),
//     currdeg  = 0;

// $(".next").on("click", { d: "n" }, rotate);
// $(".prev").on("click", { d: "p" }, rotate);

// function rotate(e){
//   if(e.data.d=="n"){
//     currdeg = currdeg - 60;
//   }
//   if(e.data.d=="p"){
//     currdeg = currdeg + 60;
//   }
//   carousel.css({
//     "-webkit-transform": "rotateY("+currdeg+"deg)",
//     "-moz-transform": "rotateY("+currdeg+"deg)",
//     "-o-transform": "rotateY("+currdeg+"deg)",
//     "transform": "rotateY("+currdeg+"deg)"
//   });
// }


//carousel
var currdeg = 0;
var carousel;

window.onload = function(){
  carousel = $(".carousel"),
  $(".next").on("click", { d: "n" }, rotate);
  $(".prev").on("click", { d: "p" }, rotate);
}



function rotate(e){
  if(e.data.d=="n"){
    currdeg = currdeg - 60;
  }
  if(e.data.d=="p"){
    currdeg = currdeg + 60;
  }
  carousel.css({
    "-webkit-transform": "rotateY("+currdeg+"deg)",
    "-moz-transform": "rotateY("+currdeg+"deg)",
    "-o-transform": "rotateY("+currdeg+"deg)",
    "transform": "rotateY("+currdeg+"deg)"
  });
}

