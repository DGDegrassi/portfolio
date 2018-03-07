// Finds height of browser window
var pageHeights = function(page) {
  $(page).ready(function() {
    function setHeight() {
      windowHeight = $(window).innerHeight();
      windowHeight = windowHeight
      $(page).css('min-height', windowHeight);
    };
    setHeight();
    $(window).resize(function() {
      setHeight();
    });

// Sets some specific numbers for the first page and the contact page
    paddingTop = String(windowHeight * .3 + "px");
    contactHeight = String(windowHeight - 100 + 'px')
    firstPageBG = String(windowHeight * 2 + 'px')
    $('.firstpagecontent').css('padding-top', paddingTop);
    $('#contact').css('min-height', contactHeight );

  });
};

// Sets each page to proper height
pageHeights('.firstpage');
pageHeights('#about');
pageHeights('#portfolio')
pageHeights('#contact');


// Focus on
// instantianes .portfolio-container mixer
var mixer = mixitup('.portfolio-container');


// Sticky navbar with waypoint
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

// Sets active navbar link
var activePage = function(page, active){
  var aboutwp = new Waypoint.Inview({
    element: page,
    enter: function(direction) {
      $('nav>.active-nav').removeClass('active-nav');
      $(active).addClass('active-nav');
    }
  });
};
// var activeHelp = function(page, active){
//   var aboutwp = new Waypoint({
//     element: document.getElementById(page),
//     handler: function(direction) {
//       $('nav>.active-nav').removeClass('active-nav');
//       $(active).addClass('active-nav');
//     }
//   });
// };

// Scroll to 'About' page when button on first page is clicked
scrollToPage('#scrollto2ndpage', '#about');

// Scrolls to each page when you click on navbar
scrollToPage('#homebutton', '.firstpage');
scrollToPage('#aboutbutton', '#about-waypoint');
scrollToPage('#portfoliobutton', '#portfolio-waypoint');
scrollToPage('#contactbutton', '#contact-waypoint');
// Scrolls back to top from footer
scrollToPage('#back-to-top-div', '.firstpage');

// Sets active navbar link for each page
activePage('#about', '#aboutbutton');
activePage('#home', '#homebutton');
activePage('#portfolio', '#portfoliobutton');
activePage('#contact', '#contactbutton');

// Hack to get the About and Contact page waypoints to
// cooperate!

// $('#aboutbutton').click(function(event){
//   console.log("ppoooooppp");
//   $('nav>.active-nav').delay(5000).removeClass('active-nav');
//   $('#aboutbutton').delay(5000).addClass('active-nav');
// })

// For future validation incase HTML5 validations don't work.
// Lower Priority
// $("#contact-form").onclick(function(){
  // var nameval = document.getElementById("contact-name");
  // var emailval = document.getElementById("contact-email");
  // var messageval = document.getElementById("contact-content");
//   if( !nameval.value || !emailval.value || !messageval.value) {
//     console.log("missingfields")
//   } else if() {

//   }

// })

// AJAX for submitting contact form without reloading any pages
$("#contact-form").submit(function(){
    var nameval = document.getElementById("contact-name");
    var emailval = document.getElementById("contact-email");
    var messageval = document.getElementById("contact-content");
    $.post("/contact",
    {
        name: nameval.value,
        email: emailval.value,
        message: messageval.value
    });
    return false;
});