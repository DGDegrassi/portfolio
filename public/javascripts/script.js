// Finds height of browser window
var pageHeights = function(page) {
  $(page).ready(function() {
    function setHeight() {
      windowHeight = $(window).innerHeight();
      $(page).css('min-height', windowHeight);
    };
    setHeight();
    $(window).resize(function() {
      setHeight();
    });

    paddingTop = String(windowHeight * .3 + "px");
    $('.firstpagecontent').css('padding-top', paddingTop);
  });
};

// Sets each page to proper height
pageHeights('.firstpage');
pageHeights('#about');
pageHeights('#portfolio')
pageHeights('#contact');

// instatianes .portfolio-container mixer
var mixer = mixitup('.portfolio-container');


// Sticky navbar
var sticky = new Waypoint.Sticky({
  element: $('.navbar')[0]
});

// Function to Scroll to a target when something is clicked
var scrollToPage = function(clicked, target) {
  $(clicked).click(function(event) {
    event.preventDefault();
    $('html, body').animate({
    scrollTop: $(target).offset().top}, 500);
  });
};

// Scroll to 'About' page when button on first page is clicked
scrollToPage('#scrollto2ndpage', '#about');

// Scrolls to each page when you click on navbar
scrollToPage('#homebutton', '.firstpage');
scrollToPage('#aboutbutton', '#about');
scrollToPage('#portfoliobutton', '#portfolio');
scrollToPage('#contactbutton', '#contact');


// Sends arrow off the page when hovered over
$('#scrollto2ndpage').hover(function() {
  // invalidates for small screens
  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
    return;  
  } else {
    // finds exactly where the arrow will be located as it moves down (and out of the 'scrollto2ndpage' div it starts in)
    var elmnt = document.getElementById("scrollto2ndpage");
    var arrowlocation = String(elmnt.offsetWidth / 2 - 12) + "px";
    // moves the arrow down
    $('#moveable-fav').css("position", "fixed").css("margin-left", arrowlocation).animate({marginTop: "1000px"}, 700);
    // sets the scrollto2ndpage div to accomodate for the missing favicon
    $('#scrollto2ndpage').css("padding-right", "37px").css("padding-left", "4.5px");
  } 
});

$('#contact-form').submit(function(e) {
  var name = $('#contact-name'),
      email = $('#contact-email'),
      message = $('contact-content');
  if(!name.value || !email.value || !message.value) {
    //error needed
  } else {
    $.ajax( {
      url: "https://formspree.io/dgdegrassi@gmail.com",
      method: "POST",
      data: $(this).serialize(),
      dataType: "json"
    });
    e.prevent.Default()
    $(this).get(0).reset()
    //alert for success
  }
});

