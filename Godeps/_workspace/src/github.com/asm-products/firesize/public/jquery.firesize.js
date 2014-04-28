/*
 * Firesize jquery plugin
 */

if( typeof jQuery == 'function' ){
  (function($){
    $(function(){
      $('img[data-src]').each(function(){
        var data = $(this).data();
        var width = $(this).attr('width');
        var height = $(this).attr('height');

        var args = {
          width: width,
          height: height,
          gravity: data.gravity,
          frame: data.frame
        };

        var url = "http://0.0.0.0:3000/" + btoa(JSON.stringify(args)) + "/" + data.src;
        $(this).attr('src', url)

        console.log('src', data.src, 'url', url)
      });
    });
  })(jQuery);
} else {
  if( typeof console.error == 'function' ) console.error('Firesize plugin requires jQuery' );
}