/*****************************************************************************/
/* UserLogin: Event Handlers */
/*****************************************************************************/
Template.UserLogin.events({
  'click #facebook-login': function(e) {
    Meteor.loginWithFacebook({}, function(err){
      if (err) {
        throw new Meteor.Error("Facebook login failed");
      }
    });
  },

  'click #facebook-logout': function(e) {
    Meteor.logout(function(err){
      if (err) {
        throw new Meteor.Error("Facebook logout failed")
      }
    });
  },

  'click #google-login': function(e) {
    Meteor.loginWithGoogle({}, function(err) {
      if (err) {
        throw new Meteor.Error("Google login failed");
      }
    });
  },

  'click #google-logout': function(e) {
    Meteor.logout(function(err) {
      if (err) {
        throw new Meteor.Error("Google logout failed")
      }
    })
  }
});

/*****************************************************************************/
/* UserLogin: Helpers */
/*****************************************************************************/
Template.UserLogin.helpers({
});

/*****************************************************************************/
/* UserLogin: Lifecycle Hooks */
/*****************************************************************************/
Template.UserLogin.onCreated(function () {
});

Template.UserLogin.onRendered(function () {
});

Template.UserLogin.onDestroyed(function () {
});
