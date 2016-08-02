// var client_id = "463068943114-9jvudf1fa16lljeuphr8oiak619elmmu.apps.googleusercontent.com";

// var secret = "kXuZo1bFrcCv17bDilfRrZ5c";

function onSignIn(user){
  var profile = user.getBasicProfile();
  console.log(profile.getName());
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
$(document).ready(function(){
  fade_now();
});

function fade_now(){
    var click_target = $("#tutorials");
    $(click_target).click(function(){
        $(this).fadeTo(0, .5);
    });
}