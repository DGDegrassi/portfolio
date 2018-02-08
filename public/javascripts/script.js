$(document).ready(function() {
  function setHeight() {
    windowHeight = $(window).innerHeight();
    $('.firstpage').css('min-height', windowHeight);
  };
  setHeight();
  
  $(window).resize(function() {
    setHeight();
  });
});