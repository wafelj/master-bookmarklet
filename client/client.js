Bookmarklets = new Meteor.Collection('bookmarklets');

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

Template.masterCode.code = function() {
  return 'javascript:!function(){if(document.getElementById("mb-container"))return;var e=new XMLHttpRequest;e.onreadystatechange=function(){4===e.readyState&&200===e.status&&document.body.insertAdjacentHTML("beforeend",e.responseText)},e.open("GET","' + Meteor.absoluteUrl().replace(/https?:/, '') + 'widget?id=' + Meteor.userId() + '"),e.send()}();';
}
