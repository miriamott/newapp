//used with permission from: “https://codepen.io/devinswett/pen/sIjvc”
//used with permission from: "https://developers.google.com/maps/documentation/javascript/directions"
//used with permission from:"https://developers.google.com/maps/documentation/javascript/custom-markers#try-it-yourself"
//used with permission from:"https://www.w3schools.com/css/css3_flexbox.asp"
var start;
var randCoord;
var lat_long;

init_lat = 49.677785;
init_lon = -112.859538;
range = .02;
trackPoints = [];

function findCoordinates(lat, long, range)


{
    // The number of points we want to show (should probably be function param..)
    var numberOfPoints = 16;
    var degreesPerPoint = 360 / numberOfPoints;

    // Keep track of the angle from centre to radius
    var currentAngle = 0;

    // The points on the radius will be lat+x2, long+y2
    var x2;
    var y2;
    // Track the points we generate to return at the end

    for(var i=0; i < numberOfPoints; i++)
    {
        // X2 point will be cosine of angle * radius (range)
        x2 = Math.cos(currentAngle) * range;
        // Y2 point will be sin * range
        y2 = Math.sin(currentAngle) * range;

        // Assuming here you're using points for each x,y..             
        newLat = lat+x2;
        newLong = long+y2;
        lat_long = new google.maps.LatLng(newLat,newLong);          
        trackPoints[i] = lat_long;  
        
        console.log(lat_long);
        // Shift our angle around for the next point
        currentAngle += degreesPerPoint;
    }
    
    // Return the points we've generated
    //gets random coordinate from our array of coords
  
    randCoord = trackPoints[Math.floor(Math.random() * trackPoints.length)];
    /*
    document.getElementById('randCoord').innerHTML = randCoord;
    document.getElementById('points').innerHTML = trackPoints;
    */
}

var directionsDisplay;
var directionsService = new google.maps.DirectionsService();

function initialize() {
  directionsDisplay = new google.maps.DirectionsRenderer();
  var mapOptions = {
    zoom: 12,
    center: new google.maps.LatLng(49.678473, -112.859673)
  };
  var map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);
  directionsDisplay.setMap(map);
}

function calcRoute() {
  //Fires up random coordinate generation based upon distance input
  findCoordinates(init_lat,init_lon,range);  
  //Displays start and chosen random coordinate - for debugging only
//  document.getElementById('buttonClick').innerHTML = lat_long + randCoord; 
    
  //Gets value from doc to use for start value
  //var start = document.getElementById('start').value;

  var request = {
      origin:lat_long,
      destination:randCoord,
      travelMode: 'WALKING'
  };  

  directionsService.route(request, function(response, status) {
    if (status == 'OK') {
      directionsDisplay.setDirections(response);
    } else {
      alert('You broke it.');
   } 
  });
}


google.maps.event.addDomListener(window, 'load', initialize);
