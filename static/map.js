var geocoder;
var map;
var data;

function initialize() {
  geocoder = new google.maps.Geocoder();
  var latlng = new google.maps.LatLng(0,0); //37.09025, -95.712891
  var mapOptions = {
    zoom: 1,
    center: latlng
  }
  map = new google.maps.Map(document.getElementById('map'), mapOptions);
}

function codeAddress(address, context) {
  geocoder.geocode( { 'address': address}, function(results, status) {
    if (status == 'OK') {
      var marker = new google.maps.Marker({
          map: map,
          position: results[0].geometry.location
      });
      var infowindow = new google.maps.InfoWindow();
      makeInfoWindowEvent(map, infowindow, context, marker);

    } else {
      console.log('Geocode was not successful for the following reason: ' + status);
    }
  });
}


function makeInfoWindowEvent(map, infowindow, contentString, marker) {
  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(contentString);
    infowindow.open(map, marker);
  });
}



function getLocations() {
   var searched = document.getElementById('inputsearch').value;

  $.ajax({
    url: 'http://localhost:8001/proxy/getlocation/?'+searched,
    method: "GET"
  }).done(function(data) {
  processingTweet(data)
  })
}


function processingTweet(data){

  var object = JSON.parse(data)
  var tweets = object["statuses"]
  for (var i = 0; i < tweets.length; i++){
    var text = tweets[i].text
    var location = tweets[i].user['location']
    var context = "<h1>" + location + "</h1>" +"<p>"+ text + "</p>";
    codeAddress(location, context)
  }

}
