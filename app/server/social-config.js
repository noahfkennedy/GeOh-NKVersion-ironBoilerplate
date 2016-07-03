ServiceConfiguration.configurations.remove({
  service:'facebook'
});

ServiceConfiguration.configurations.remove({
  service: 'google'
});

ServiceConfiguration.configurations.insert({
  service:'facebook',
  appId :"591004647745301",
  secret:"61d9246f7d98ee1723a37a5f376aa633"
});

ServiceConfiguration.configurations.insert({
  service:'google',
  clientId: "75184922960-8sbdmngaa9enm2erm7gjv6daimgpjniq.apps.googleusercontent.com",
  secret : "lwrq-xlflpWa0Qv0U4J-VOxO"
});
