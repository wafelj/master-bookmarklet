Bookmarklets = new Meteor.Collection('bookmarklets');

if (Meteor.isClient) {
  Template.add.events({
    'click input.add-bookmarklet' : function () {
      var name = document.getElementById('bookmarklet-name').value;
      var code = document.getElementById('bookmarklet-code').value;
      var thumbnailUrl = document.getElementById('bookmarklet-thumbnail-url').value;

      if(!name || !code || !thumbnailUrl) {
        return;
      }

      Bookmarklets.insert({
        'userId': Meteor.userId(),
        'name' : name,
        'code' : code,
        'thumbnailUrl': thumbnailUrl,
      });
    }
  });

    
  Template.bookmarklets.empty = function () {
    return Bookmarklets.find({'userId': Meteor.userId()}).count === 0;
  };

  Template.bookmarklets.items = function () {
    return Bookmarklets.find({'userId': Meteor.userId()});
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
