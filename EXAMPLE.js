var auth2; // The Sign-In object.
var SCOPE = 'profile email https://www.googleapis.com/auth/calendar';
var CLIENT_ID = '463068943114-9jvudf1fa16lljeuphr8oiak619elmmu.apps.googleusercontent.com';
var API_KEY = 'AIzaSyDSg6Rg0QO3PXM4eOnwgY2I6zMxNsz-URE';
var signinButton = document.getElementById('signin-button');
var signoutButton = document.getElementById('signout-button');
var calendarButton = document.getElementById('load-calendar');

window.onload = function() {
  // checkSignedIn();
  gapi.load('client:auth2', initAuth);
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
    signinButton.onclick = signIn;
    signoutButton.onclick = signOut;
    calendarButton.onclick = loadCalendarApi;
  });
}

function updateSigninStatus(isSignedIn) { //Switch button showing depending on user signin
  if (isSignedIn) {
    signinButton.style.display = 'none';
    signoutButton.style.display = 'block';
  } else {
    signinButton.style.display = 'block';
    signoutButton.style.display = 'none';
  }
}

// function checkSignedIn(){
//   var isSignedIn = auth2.isSignedIn.get();
//   var location = window.location.href;
//   if (location == 'http://localhost:8000/sign_in.html' && isSignedIn) {
//     window.location.href = 'http://localhost:8000/imommy.html';
//   }
//   else if (location != 'http://localhost:8000/sign_in.html' && !isSignedIn) {
//     window.location.href = 'http://localhost:8000/sign_in.html';
//   }
// }

function signIn(event) { //trigger signin on click
  auth2.signIn();
}

function signOut(event) { //trigger signout on click
  auth2.signOut(); 
}

function loadCalendarApi() { //Load Google Calendar client library
  gapi.client.load('calendar', 'v3', listCalendars);
}

function listCalendars() { // List all calendars
  var request = gapi.client.calendar.calendarList.list();

  request.execute(function(resp) {
    var calendars = resp.items;
    appendPre('Check Console');
    for (i=0;i<calendars.length;i++) {
      listUpcomingEvents(calendars[i]['id']);
    }
  });
}

function listUpcomingEvents(calendarID){ // Print the summary and start datetime/date of the next ten events
  var calendarId = calendarID;
  var request_events = gapi.client.calendar.events.list({
    'calendarId': calendarId,
    'timeMin': (new Date()).toISOString(),
    'singleEvents': true,
    'showDeleted': false,
    'maxResults': 3,
    'orderBy': 'startTime'
  });

  request_events.execute(function(resp) {
    var events = resp.items;

    for (i = 0; i < events.length; i++) {
      var event = events[i];
      var when = event.start.dateTime;
      if (!when) {
        when = event.start.date;
      }
      appendPre(event.summary + ' (' + when + ')');
    }
  })
}

function appendPre(message) { // Append a pre element to the body containing the given message
  var pre = document.getElementById('output');
  var textContent = document.createTextNode(message + '\n');
  pre.appendChild(textContent);
}


var title = $('#title').value
var description = $("#description").value
var start_time = $('#start_time').value
var end_time = $('#end_time').value
var count = $('#rep_count').value

var event = {
  'summary': title,
  'description': description,
  'start': {
    'dateTime': start_time,
  },
  'end': {
    'dateTime': end_time,
  },
  'recurrence': [
    'RRULE:FREQ=DAILY;COUNT='count
  ],
  'reminders': {
    'useDefault': true,
    // 'overrides': [
    //   {'method': 'email', 'minutes': 24 * 60},
    //   {'method': 'popup', 'minutes': 10}
    // ]
  }
};

var request = gapi.client.calendar.events.insert({
  'calendarId': 'primary',
  'resource': event
});

request.execute(function(event) {
  appendPre('Event created: ' + event.htmlLink);
});

