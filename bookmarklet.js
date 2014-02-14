(function() {
  if(document.getElementById('mb-container')) {
    return;
  }

  var mbContainer = document.createElement('div');
  mbContainer.id = 'mb-container';
  mbContainer.style.cssText = 'padding-bottom: 30px; left: 0; right: 0; position: fixed; background-color: white; top: 0; z-index: 10000;';
  mbContainer.innerHTML = '<div id="mb-header" style="height:50px;"><div id="mb-close" style="height: 50px;width: 50px;float: right; background-size: cover; background-image: url(http://static.freepik.com/free-photo/close-button-with-rounded-corners_318-9865.jpg);"></div></div>';
  document.body.appendChild(mbContainer);

  var mbItemData;

  var execute = function(e) {
    var id = e.srcElement.getAttribute('data-id'),
        data;

    for(var i=0; i<mbItemData.length; i++) {
      if(mbItemData[i]._id === id) {
        eval(mbItemData[i].code);
        break;
      }
    }
  };

  var close = function() {
    document.getElementById('mb-close').removeEventListener("click", close, false);
    document.body.removeChild(mbContainer);
    mbContainer = undefined;
    mbItemData = undefined;
  };
  document.getElementById('mb-close').addEventListener("click", close, false);

  // jsonp
  window.handler = function(data) {
    for(var i=0; i<data.length; i++) {
      var item = document.createElement('div');
      //item.setAttribute('data-id', data[i]._id);
      //item.className = 'mb-close';
      item.innerHTML = '<img data-id="' + data[i]._id + '" src="' + data[i].thumbnailUrl + '" style="width: 80px; height: 80px; background-size: cover;" /><span>' + data[i].name + '</span>';
      item.style.cssText = 'height: 100px; width: 80px; padding: 10px;';
      mbContainer.appendChild(item);

      item.addEventListener("click", execute, false);

      mbItemData = data;
    }
  };

  var script = document.createElement('script');
  script.src = 'http://localhost:3000/api/bookmarklets?callback=handler';
  document.head.appendChild(script);
})();

