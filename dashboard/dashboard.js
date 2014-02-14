Bookmarklets = new Meteor.Collection('bookmarklets');

if (Meteor.isClient) {
  Template.hello.greeting = function () {
    return "Welcome to dashboard.";
  };

  Template.add.events({
    'click input.add-bookmarklet' : function () {
      var name = document.getElementById('bookmarklet-name').value;
      var code = document.getElementById('bookmarklet-code').value;

      Bookmarklets.insert({
        'name' : name,
        'code' : code
      });
    }
  });

  Template.bookmarklets.items = function () {
    return Bookmarklets.find({});
  };
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    collectionApi = new CollectionAPI({
      authToken: undefined,
      apiPath: 'api',
      standAlone: false,
      sslEnabled: false,
      listenPort: 3005
    });

    collectionApi.addCollection(Bookmarklets, 'bookmarklets', {
      methods: ['GET']
    });

    collectionApi.start();
  });
}
