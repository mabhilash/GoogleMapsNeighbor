function initMap(){
  var places = []
   $.getJSON('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=27.9388763,-82.3242353&radius=500&type=shopping&keyword=mall&key=AIzaSyB1nTYOyW0a9aSxqYY05nICV2ByW3mrS6w',
        function(data){
          //console.log(data.results)
          for(var i = 0; i<data.results.length;i++){
             places.push({
              lat:data.results[i].geometry.location.lat,
              lng:data.results[i].geometry.location.lng,
              placename:data.results[i].name,
              placevicinity:data.results[i].vicinity
            });
          }
          //console.log(places);
          mapMarker(places);      
         }

         
    );
  map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 27.9388763, lng: -82.3242353},
        scrollwheel: true,
        zoom: 10
    });

    infoWindow = new google.maps.InfoWindow({
        content: ''
    });
    //console.log(places);
    
}
function mapMarker(places){
  console.log(places);
  var markers=[];
  var bounds = new google.maps.LatLngBounds();
  var largeInfowindow = new google.maps.InfoWindow();
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
      populateInfoWindow(this, largeInfowindow)
    //largeInfowindow.open(map,marker);
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


