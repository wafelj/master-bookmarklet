if(!document.getElementById('mb-container')) {
  (function() {
    var itemData = null,
        container = null;

    var render = function(context) {
      container = document.createElement('div');
      container.id = 'mb-container';
      container.innerHTML = Handlebars.templates.template(context);
      document.body.appendChild(container);
    };

    var getData = function(callback) {
      window.mbJsonpHandler = function(data) {
        window.mbJsonpHandler = undefined;
        callback(data);
      };

      var script = document.createElement('script');
      script.src = 'http://localhost:3000/api/bookmarklets?callback=mbJsonpHandler';
      document.head.appendChild(script);
    };

    var execute = function() {
      var id = this.getAttribute('data-id'), data;
      for(var i=0; i<itemData.length; i++) {
        if(itemData[i]._id === id) {
          eval(itemData[i].code);
          break;
        }
      }
    };

    var close = function(e) {
      e.preventDefault();
      document.getElementById('mb-close').removeEventListener("click", close, false);
      
      var items = document.getElementsByClassName('mb-item');
      for(var i=0; i<items.length; i++) {
        items[i].removeEventListener("click", execute, false);
      }

      if(container) {
        document.body.removeChild(container);
      }
    };

    // begin execution
    getData(function(data) {
      itemData = data;
      render({items: data});

      document.getElementById('mb-close').addEventListener("click", close, false);
      var items = document.getElementsByClassName('mb-item');
      for(var i=0; i<items.length; i++) {
        items[i].addEventListener("click", execute, false);
      }
    });
  })();
}