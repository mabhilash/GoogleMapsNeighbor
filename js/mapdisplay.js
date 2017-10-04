      var map;
     // Function to initialize the map within the map div
     function initMap() {


      var locations=[
{
  title:"International Plaza and Bay Street",
  lat : 27.9640468,
  lng : -82.5216049,
  address:"2223 N West Shore Blvd (at Boy Scout Blvd), Tampa",
  image: "images/nordstrom.jpg"
},
{
  title:"Costco Wholesale",
  lat : 27.92132,
  lng : -82.331209,
  address:"10921 Causeway Blvd, Brandon",
  images: "images/nordstrom.jpg"
},
{
  title:"Nordstrom International Plaza",
  lat : 27.9640468,
  lng : -82.5216049,
  address:"2223 N West Shore Blvd, Tampa",
  images: "images/nordstrom.jpg"
},
{
  title:"Barnes & Noble",
  lat : 27.9388763,
  lng : -82.3242353,
  address: "122 Brandon Town Center Dr (Brandon Square), Brandon",
  images: "images/nordstrom.jpg"
},
{
  title: "Sam's Club",
  lat : 28.0970139,
  lng : -82.4994832999999,
  address:"15835 N Dale Mabry Hwy, Tampa",
  images: "images/nordstrom.jpg"
}],

       map = new google.maps.Map(document.getElementById('map'), {
         center: {lat: 40.74135, lng: -73.99802},
         zoom: 14
       });
  var markers=[];
  var largeInfowindow = new google.maps.InfoWindow();
  var bounds = new google.maps.LatLngBounds();
  var imag = document.createElement('img');
  for (var i =0; i < locations.length;i++){
    var position = new google.maps.LatLng(locations[i].lat, locations[i].lng);
    var title = locations[i].title;
    var marker = new google.maps.Marker({
    map:map,
    position:position,
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

  };

  function populateInfoWindow(marker,infowindow){
    if(infowindow.marker != marker){
      infowindow.marker=marker;
      infowindow.setContent('<div>' + marker.title + '</div>');
      infowindow.open(map, marker);
      infowindow.addListener('closeclick', function(){
        infowindow.setmarker=null;
      });
    }
  }
ko.applyBindings(initMap);




