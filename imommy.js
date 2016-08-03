
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

// function appendResults(text) {
//   var results = document.getElementById('results');
//   results.appendChild(document.createElement('P'));
//   results.appendChild(document.createTextNode(text));
// }

// function makeRequest() {
//   var request = gapi.client.urlshortener.url.get({
//     'shortUrl': 'http://goo.gl/fbsS'
//   });
//   request.then(function(response) {
//     appendResults(response.result.longUrl);
//   }, function(reason) {
//     console.log('Error: ' + reason.result.error.message);
//   });
// }

// function init() {
//   gapi.client.setApiKey('YOUR API KEY');
//   gapi.client.load('urlshortener', 'v1').then(makeRequest);
// }

// gapi.load('client', init);




// $(document).ready(function(){
//   fade_now();
// });

// function fade_now(){
//     var click_target = $("button");
//     $(click_target).click(function(){
//         $(this).fadeTo(0, .5);
//     });
// }