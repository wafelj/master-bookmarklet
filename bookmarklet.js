// jsonp
window.handler = function(data) {
    console.log('got data:', data);
};

var script = document.createElement('script');
script.src = 'http://localhost:3000/api/bookmarklets?callback=handler';
document.head.appendChild(script);

var container = document.createElement('div');
container.className = 'mb-container';
container.style.cssText = 'width: 100%; height: 100px; position: fixed; background-color: red; top: 0; z-index: 10000;';
document.body.appendChild(container);