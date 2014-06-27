var myLatLng;
var myLatLng2;
 var gl = navigator.geolocation;
    
    var latitude;
    var longitude;
    var marker;
    var map;

function initializar() {
  
  

  //navigator.geolocation.getCurrentPosition(function(position) {
      //var pos = new google.maps.LatLng(position.coords.latitude,
  //                                     position.coords.longitude);
                                       
  //var myLatLng = new google.maps.LatLng(24.800, 252.600);
  //var myLatLng2 = new google.maps.LatLng(24.780, 252.600);

   
    
    gl.getCurrentPosition(
        function (position) {
            latitude = position.coords.latitude;
            longitude = position.coords.longitude;
        //alert("lat " + latitude);
        
         myLatLng = new google.maps.LatLng(latitude,longitude);
         myLatLng2 = new google.maps.LatLng(latitude, longitude);
        var mapOptions = {
          //center: new google.maps.LatLng(24.800, 252.600),
          center: new google.maps.LatLng(latitude, longitude),
          zoom: 13,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }
        
        
        
        
      map = new google.maps.Map(document.getElementById("map_canvas"),
            mapOptions);
            
            marker = new google.maps.Marker({
      position: myLatLng2,
      map: map,
      title: 'Usted esta aqui!',
      draggable: true
      });

  var infowindow = new google.maps.InfoWindow({
    content: 'Cambia de posicion el marcador y luego  <a href="#">Haz click</a> aqui ',
    position: myLatLng
  });
  infowindow.open(map, marker);

  google.maps.event.addListener(map, 'zoom_changed', function() {
    var zoomLevel = map.getZoom();
    //alert("zoom");
    map.setCenter(myLatLng);
    infowindow.setContent('Zoom: ' + zoomLevel);
  });


// Permito los eventos drag/drop sobre el marcador
  google.maps.event.addListener(marker, 'dragstart', function() {
    updateMarker('Arrastrando...');
  });

            
        },
        function (error) {
            alert("Error getting geolocation:" + error);
        }
    );
    
  google.maps.event.addListener(marker, 'drag', function() {
    //updateMarkerStatus('Arrastrando...');
   // updateMarkerPosition(marker.getPosition());
   //infowindow.setPosition(marker.getPosition()) ;
   infowindow.setContent('Arrastrando ');
  //document.form_mapa.latitud.value = latLng.lat();
  });
 
  google.maps.event.addListener(marker, 'dragend', function() {
    //updateMarkerStatus('Arrastre finalizado');
    //geocodePosition(marker.getPosition());
    infowindow.setContent('Arrastre finalizado <a href="#">Haz click</a>');
  });

}

function updateMarker(location) {
        marker.setPosition(location);
        //updateMarkerPosition(location);
        geocodePosition(location);
      }

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
}      

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
}

google.maps.event.addDomListener(window, 'load', initializar);

//$('#localizar').on('click',function(e){
  //      e.preventDefault();
    //    revisarPosicion();
//    });
    
    
