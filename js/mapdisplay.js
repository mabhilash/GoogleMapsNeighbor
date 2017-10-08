function initMap(){

//var largeInfowindow = new google.maps.InfoWindow();
var map;
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 27.9388763, lng: -82.3242353},
        scrollwheel: true,
        zoom: 10
    });
    infoWindow = new google.maps.InfoWindow({
        content: ''
    });
  var places = []
  var jsonPromise = $.getJSON('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=27.9388763,-82.3242353&radius=500&type=shopping&keyword=mall&key=AIzaSyB1nTYOyW0a9aSxqYY05nICV2ByW3mrS6w');
  jsonPromise.done(function(data){
    for(var i = 0; i<data.results.length;i++){
             places.push({
              lat:data.results[i].geometry.location.lat,
              lng:data.results[i].geometry.location.lng,
              placename:data.results[i].name,
              placevicinity:data.results[i].vicinity
            });
          }
          mapMarker(places);

  });

  jsonPromise.fail(function(reason){
    console.log('failed');

  });

  jsonPromise.then(function(data){
   
    placesList(places);
 
  });


function placesList(places){
  //console.log(places)
  var viewmodel = {
    initVal:ko.observable(''),
    placesList:ko.observableArray(places)
    
  };
      viewmodel.placesLoop = ko.dependentObservable(function() {
        var search = this.initVal().toLowerCase();
        return ko.utils.arrayFilter(places, function(placename) {
            return placename.placename.toLowerCase().indexOf(search) >= 0;
        });
    }, viewmodel);
      ko.applyBindings(viewmodel);
}

function mapMarker(places){
  var markers=[];
  var bounds = new google.maps.LatLngBounds();
  for(var i=0;i<places.length;i++){
    var name = places[i].placename;
    var vicinity = places[i].placevicinity;
    var position = new google.maps.LatLng(places[i].lat, places[i].lng);
    var marker = new google.maps.Marker({
    map:map,
    position:position,
    placename:name,
    placevicinity:vicinity,
    title:'<img border ="0" align="LEFT" width="100" height="100" src="images/nordstrom.jpg" >',
    animation:google.maps.Animation.DROP,
    id:i
    });
    markers.push(marker);
    bounds.extend(marker.position);
    marker.addListener('click', function(){
      populateInfoWindow(this, infoWindow)
    });
  }
   map.fitBounds(bounds);
}
function populateInfoWindow(marker,infowindow){
    if(infowindow.marker != marker){
      infowindow.marker=marker;
      infowindow.setContent('<div>' + marker.placevicinity +' '+ '<h2>'+marker.placename+'</h2>'+'</div>');
      infowindow.open(map, marker);
      infowindow.addListener('closeclick', function(){
      infowindow.setmarker=null;
      });
    }
  }
}

 