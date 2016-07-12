/*****************************************************************************/
/* Map: Event Handlers */
/*****************************************************************************/
Template.Map.events({
});

/*****************************************************************************/
/* Map: Helpers */
/*****************************************************************************/
Template.Map.helpers({
});

/*****************************************************************************/
/* Map: Lifecycle Hooks */
/*****************************************************************************/
Template.Map.onCreated(function () {
});

Template.Map.onRendered(function(){
  L.Icon.Default.imagePath = 'packages/bevanhunt_leaflet/images';

  Session.set('coords', null)
  var map = L.map('map', {
    doubleClickZoom: false
  })
  map.setView([0, 0], 17);
  map.spin(true);

  Tracker.autorun(function() {
    console.log("Running");
    Session.set('coords', Geolocation.latLng())
    if (Session.get('coords') != null) {
      map.spin(false);
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
    iconUrl: '/MapMarkers/BM.png',
    //shadowUrl: 'joe_shadow.png',
    iconSize: [10, 10],
    //shadowSize: [80, 80],
    iconAnchor: [5, 5],
    //shadowAnchor: [10, 10],
    popupAnchor: [0,0]
  });


  function showPostContents(e){}

  function addMarker(click) {
    if (Meteor.userId()) {
      var txt = prompt("What do you have to say about this location?");
      var time = new Date();
      console.log(Meteor.user().services.facebook.name)
      if (txt) {
        Markers.insert({
          userId: Meteor.userId(),
          latlng: click.latlng,
          text: txt, /*category: tag,*/
          createdAt: time
        });
      }
    }
    else {
      alert("Please sign in to post")
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
});

Template.Map.onDestroyed(function () {
});
