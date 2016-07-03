// on startup run resizing event
Meteor.startup(function() {
  $(window).resize(function() {
    $('#map').css('height', window.innerHeight - 82 - 45);
  });
  $(window).resize(); // triggger resize event
});


//Create and Subscribe to Markers Collection
var Markers = new Meteor.Collection('markers');
Meteor.subscribe('markers');


Template.map.rendered = function(){
  L.Icon.Default.imagePath = 'packages/bevanhunt_leaflet/images';

  Session.set('coords', null)
  var map = L.map('map', {
    doubleClickZoom: false
  })
  map.setView([0, 0], 17);

  Tracker.autorun(function() {
    console.log("Running");
    Session.set('coords', Geolocation.latLng())
    if (Session.get('coords') != null) {
      var lat = Session.get('coords').lat;
      var lng = Session.get('coords').lng;
      map.setView([lat, lng],17);
    }
  })



  //---Option 3----------*

  L.tileLayer('https://api.mapbox.com/styles/v1/elijahk/cinw81l640021b1ma3vv2j3s6/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZWxpamFoayIsImEiOiJjaWw5cnprcGkwMGRudHlsem41Mm5obWlzIn0.usfH555I6BGhzP5r-Tqfkg', {
  maxZoom: 19
  }).addTo(map);

  var blueDot = L.icon({
    iconUrl: 'joe.png',
    //shadowUrl: 'joe_shadow.png',
    iconSize: [80, 80],
    //shadowSize: [80, 80],
    iconAnchor: [10, 10],
    //shadowAnchor: [10, 10],
    popupAnchor: [0,0]
  });


  function showPostContents(e){}

  function addMarker(click) {
    var txt = prompt("What do you have to say about this location? (optional: sign your name)");
    var time = new Date();
    if (txt) {
      Markers.insert({latlng: click.latlng, text: txt, /*category: tag,*/ createdAt: time});
    }
  }

  function populateMap(){
    Markers.find().map( function(u){
      var post = L.marker(u.latlng, {icon: blueDot});
      post.on('click', showPostContents);
      post.addTo(map);
      post.descrip = u.text;
    })
  }


  function showPostContents(e){
    var text = e
    console.log(e);
    Session.set("selectedPost", e.target.descrip);
  }
  //map.on('mousemove', populateMap);
  map.on('click', addMarker);
  map.on('click', populateMap);
}





//----------------------Template Helpers and Events
Template.descriptionBox.helpers({
  'description': function(){
    return Session.get("selectedPost");
  }
})

Template.searchBar.events({
  'submit .searchQuery'(event) {
    event.preventDefault();

    var target = event.target;
    var text = target.text.value;
    Session.set("searchFilter", text);
    //Empty text box
    //target.text.value="";
  }
})

Template.searchBar.helpers({
  'currentCategory': function() {
    return Session.get("searchFilter");
  }
})
