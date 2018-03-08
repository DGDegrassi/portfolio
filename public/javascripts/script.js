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
    paddingTop = String(windowHeight * .4 + "px");
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


// Responsive navbar
function myFunction() {
    var x = document.getElementById("myNavbar");
    if (x.className === "navbar") {
        x.className += " responsive";
    } else {
        x.className = "navbar";
    }
}

// Sticky navbar with waypoint
var sticky = new Waypoint.Sticky({
  element: $('#myNavbar')[0]
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
    exit: function(direction) {
      $('nav>.active-nav').removeClass('active-nav');
      $(active).addClass('active-nav');
    }
  });
};

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


// Portfolio
$('#chateau').hover(function(){
  $(this).animate({opacity: 0}, 500)
  }, function(){
  $(this).animate({opacity: 1}, 500)
});
// For future validation incase HTML5 validations don't work.
// Lower Priority

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

    // Custom thank you for sending an email
    var cc = $('#contact-container');
      cc.animate({
      width: '0px',
      height: '0px'
      }, 500
    );
    var ty = $('#thank-you');
    setTimeout(function(){
      cc.css('display', 'none')
      }, 499
    );
    setTimeout(function(){
      ty.css('display', 'initial')
      }, 501

    );
    setTimeout(function(){
      ty.animate({color: 'white', borderColor: 'white'}, 1000);
      }, 550
    );

    return false;
});