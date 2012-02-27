$(document).ready(function(){
  $('.tweet').live("mousedown", function(event) { // 'click' is not working, no idea why
    if (event.which != 1) return;
    
    var that = this,
        link = $(this).find('.js-tweet-text').find('a[data-expanded-url]'),
        url = link.attr('data-expanded-url');

    if (link.length > 0 && url && url.indexOf('http://instagr.am') != -1) {
      $.getJSON("http://api.instagram.com/oembed?url=" + url, function(data) {
        (function findContainer() {
          var container = $(that).find('.js-tweet-media-container');

          if (container.length > 0) {
            var img = $('<img>', {src: data.url});
            
            setTimeout(function() {
              container.html(img.css({'max-height': '100%', 'max-width': '100%'}));
            }, 300);

          } else {
            setTimeout(findContainer, 1000);
          }
        })();
      });
    }
  });
});