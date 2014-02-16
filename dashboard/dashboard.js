Bookmarklets = new Meteor.Collection('bookmarklets');

if (Meteor.isClient) {
  Template.bookmarklets.items = function () {
    return Bookmarklets.find({'userId': Meteor.userId()});
  };

  Template.bookmarklets.events({
    'click .list-group-item' : function () {
      Session.set('currentId', this._id);
      $('#dialog').modal('show');
    }
  });

  Template.dialog.item = function() {
    return Bookmarklets.findOne(Session.get('currentId'));
  };
  
  Template.dialog.events({
    'click button#dialog-save' : function () {
      // collect form data
      var form = {};
      $.each($('#dialog-form').serializeArray(), function() {
          form[this.name] = this.value;
      });

      if(form.name && form.code) {
        Meteor.call('upsert', form.id, {
          'userId': Meteor.userId(),
          'name' : form.name,
          'description': form.description,
          'thumbnailUrl': form.thumbnailUrl,
          'code' : form.code,
        });

        $('#dialog').modal('hide');
      }
    },
    'click button#dialog-delete' : function () {
      var id = $('#dialog-form input[name=id]').val();

      $('#dialog').one('hidden.bs.modal', function () {
        Meteor.call('delete', id);
      })
      
      $('#dialog').modal('hide');
    }
  }); 
}

if (Meteor.isServer) {
  Meteor.methods({
    upsert: function (id, doc) {
      if(doc.userId === Meteor.userId() && doc.name && doc.code) {
        Bookmarklets.upsert(id, doc);
      }
    }, 

    delete: function (id) {
      if(Bookmarklets.findOne(id).userId === Meteor.userId()) {
        Bookmarklets.remove(id);
      }
    }
  });

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
