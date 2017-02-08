window.onload = function(){
	var latlng = new google.maps.LatLng(35.66, 139.66);
	var options = {
		zoom: 15,
		center: latlng
	};
	var map = new google.maps.Map(document.getElementById('map'), options);
}
