import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  Markers = new Meteor.Collection('markers');
});
