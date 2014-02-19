Bookmarklets = new Meteor.Collection('bookmarklets');

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

HTTP.methods({
  'widget': function() {
    var items = Bookmarklets.find({'userId': this.query.id}).fetch();

    this.addHeader('Access-Control-Allow-Origin', '*');
    this.addHeader('Access-Control-Allow-Methods', 'GET');

    return Handlebars.templates['bookmarklet']({
      items: items, 
      styleUrl: Meteor.absoluteUrl('bookmarklet.css')
    });
  }
});

