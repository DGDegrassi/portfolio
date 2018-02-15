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

// Color changing background: to line 76
var colors = new Array(
  [66,0,0],
  
  [0,18,86],
  [43,0,15],
  [4,0,89],
  [71,0,13],
  [33,0,43]);

var step = 0;
//color table indices for: 
// current color left
// next color left
// current color right
// next color right
var colorIndices = [0,1,2,3];

//transition speed
var gradientSpeed = 0.002;

function updateGradient()
{
  
  if ( $===undefined ) return;
  
var c0_0 = colors[colorIndices[0]];
var c0_1 = colors[colorIndices[1]];
var c1_0 = colors[colorIndices[2]];
var c1_1 = colors[colorIndices[3]];

var istep = 1 - step;
var r1 = Math.round(istep * c0_0[0] + step * c0_1[0]);
var g1 = Math.round(istep * c0_0[1] + step * c0_1[1]);
var b1 = Math.round(istep * c0_0[2] + step * c0_1[2]);
var color1 = "rgb("+r1+","+g1+","+b1+")";

var r2 = Math.round(istep * c1_0[0] + step * c1_1[0]);
var g2 = Math.round(istep * c1_0[1] + step * c1_1[1]);
var b2 = Math.round(istep * c1_0[2] + step * c1_1[2]);
var color2 = "rgb("+r2+","+g2+","+b2+")";

 $('.firstpage').css({
   background: "-webkit-gradient(linear, left top, right top, from("+color1+"), to("+color2+"))"}).css({
    background: "-moz-linear-gradient(left, "+color1+" 0%, "+color2+" 100%)"});
  
  step += gradientSpeed;
  if ( step >= 1 )
  {
    step %= 1;
    colorIndices[0] = colorIndices[1];
    colorIndices[2] = colorIndices[3];
    
    //pick two new target color indices
    //do not pick the same as the current one
    colorIndices[1] = ( colorIndices[1] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;
    colorIndices[3] = ( colorIndices[3] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;
    
  }
}

setInterval(updateGradient,10);

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


