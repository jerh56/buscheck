var myLatLng;
var myLatLng2;
var gl = navigator.geolocation;
var latitude;
var longitude;
var marker;
var map;
var bMap = false;

$(document).ready(function() {
		inicializar();
});






function inicializar() {
  
  var Geo={};
			  var options = { maximumAge: 3000, timeout: 5000, enableHighAccuracy: true };

			        if (navigator.geolocation) {
			           navigator.geolocation.watchPosition(success, error, options);
			        }

			        //Get the latitude and the longitude;
			        function success(position) {
			            Geo.lat = position.coords.latitude;
			            Geo.lng = position.coords.longitude;
			            populateHeader(Geo.lat, Geo.lng);
			        }

			        function error(){
			            console.log("Geocoder failed");
			        }

			        function populateHeader(lat, lng){
			            $('#Lat').html("Latitud: " + lat);
			            $('#Long').html("Longitud: " + lng);

			            $('#Lat').val(lat);
			            $('#Long').val(lng);
			            
			            myLatLng = new google.maps.LatLng(lat,lng);
				    myLatLng2 = new google.maps.LatLng(lat, lng);
			            if (!bMap){
			              
				      var mapOptions = {
				          //center: new google.maps.LatLng(24.800, 252.600),
				          center: new google.maps.LatLng(lat, lng),
				          zoom: 13,
				          mapTypeId: google.maps.MapTypeId.ROADMAP
				        }
        			      map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
				      bMap = true; 	            
			             marker = new google.maps.Marker({
				        position: myLatLng2,
				        map: map,
				        title: 'Usted esta aqui!',
				        draggable: true
      				      });
      				      
      				      var infowindow = new google.maps.InfoWindow({
					    content: 'Usted está <a href="#">aquí</a>',
					    position: myLatLng
					  });
					  infowindow.open(map, marker);
      				      
			            
			            }            
				
				    //marker.setMap(null);
				    
			             marker.setPosition(myLatLng2);
			             map.setCenter(myLatLng2);
			            
			        }
			       

};










function updateMarker(location) {
        marker.setPosition(location);
        //updateMarkerPosition(location);
        geocodePosition(location);
      };

function revisarPosicion() {      

$.ajaxSetup({
  beforeSend: function(request) {
    request.setRequestHeader("X-Auth-Token","qkvLsZ0dNe11yjHV9a5oZVBJbwnucz9cy42ifaSksrAf68rgjqy4KYiIRCiB3YGverQ-K7d0_oQ4bwakPvxm-w");
    request.setRequestHeader("Accept","application/json");
    request.setRequestHeader("Content-Type","application/json"); 
  }
});
    
$.ajax({
         url: "http://orion.lab.fi-ware.org:1026/ngsi10/contextEntities/bus:000002", type: 'GET'
    }).then(function(data) {
        //alert(JSON.stringify(data));
        colocaMarcador(data); 
    });
};      

function colocaMarcador(data){
     var latitude = data.contextElement.attributes[1].value;
     var longitude =  data.contextElement.attributes[2].value;
     var posicionTransporte = new google.maps.LatLng(latitude,longitude);
     //var posicionTransporte = new google.maps.LatLng(20.6992985,-103.3236317);
     var marker = new google.maps.Marker({
      position: posicionTransporte,
      map: map,
      title: 'El transporte esta aqui!'
    });
    marker.setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png');
};

function realizarSuscripcion(){
 
};

//google.maps.event.addDomListener(window, 'load', initializar);
    
