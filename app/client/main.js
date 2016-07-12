``// on startup run resizing event
Meteor.startup(function() {
  $(window).resize(function() {
    $('#map').css('height', window.innerHeight - 82 - 45);
  });
  $(window).resize(); // triggger resize event
});


//Create and Subscribe to Markers Collection
Markers = new Meteor.Collection('markers');
Meteor.subscribe('markers');

//----------------------Template Helpers and Events
Template.descriptionBox.helpers({
  'description': function(){
    return Session.get("selectedPost");
  }
  /*Wait for this!!!!!
    function showPostContents(e){
      var text = e
      console.log(e);
      Session.set("selectedPost", e.target.descrip);
    }
    //map.on('mousemove', populateMap);
    map.on('click', addMarker);
    map.on('click', populateMap);
  });
  */

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
