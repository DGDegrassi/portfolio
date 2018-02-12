// First page set height to browser window
$('.firstpage').ready(function() {
  function setHeight() {
    windowHeight = $(window).innerHeight();
    $('.firstpage').css('min-height', windowHeight);
  };
  setHeight();
  
  $(window).resize(function() {
    setHeight();
  });
});
