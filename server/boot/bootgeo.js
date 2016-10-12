var loopback = require('loopback');
module.exports = function (server, done) {
  
  var here = new loopback.GeoPoint({lat: 10.5, lng: 5.5});
  var location1 = new loopback.GeoPoint({lat: 10.2, lng: 6.7});
  var location2 = new loopback.GeoPoint({lat: 10.4, lng: 5.8});
  var location3 = new loopback.GeoPoint({lat: 10.3, lng: 5.9});
  var CoffeeShop = loopback.createModel('coffee-shop4', {
    location: 'GeoPoint'
  });
  CoffeeShop.attachTo(server.dataSources.mongodbDs);
  server.dataSources.mongodbDs.automigrate(['coffee-shop4'], function(err) {
    if(err) return done(err);
    CoffeeShop.create([
      {location: location1},
      {location: location2},
      {location: location3}
    ]);
    var query = { where: {
        location: {near: here}
      },
      limit:2
    };
    CoffeeShop.find(query, function(err, nearbyShops) {
      console.info('found the first 2 nearby coffeeshops:', nearbyShops);
      done(err);
    });    
  });
}