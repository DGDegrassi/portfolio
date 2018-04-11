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

// Prevent Hover on Scroll
var body = document.body,
    timer;

window.addEventListener('scroll', function() {
  clearTimeout(timer);
  if(!body.classList.contains('disable-hover')) {
    body.classList.add('disable-hover')
  }

  timer = setTimeout(function(){
    body.classList.remove('disable-hover')
  },300);
}, false);

mixitup('#gallery', {
  load: {
    filter: '.ruby'
  }
});

// instantiates #gallery mixer with javascript as its 
// default active.  WHY DOES WRAP CLASS SCREW IT UP??
// var mixer = mixitup('#gallery', {
//   load: {
//     filter: '.javascript'
//   }
// });


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
scrollToPage('#scrollto2ndpage', '#about-waypoint');

// Scrolls to each page when you click on navbar
scrollToPage('#homebutton', '.firstpage');
scrollToPage('#aboutbutton', '#about-waypoint');
scrollToPage('#portfoliobutton', '#portfolio-waypoint');
scrollToPage('#contactbutton', '#contact-waypoint');
// Scrolls to contact page from about blurb
scrollToPage('#q-or-op', '#contact-waypoint');
// Scrolls back to top from footer
scrollToPage('#back-to-top-div', '.firstpage');

// Sets active navbar link for each page
activePage('#about', '#aboutbutton');
activePage('#home', '#homebutton');
activePage('#portfolio', '#portfoliobutton');
activePage('#contact', '#contactbutton');

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
    var ty = $('#thank-you');
      cc.animate({
      width: '0px',
      height: '0px'
      }, 500
    );

    setTimeout(function(){
      cc.css('display', 'none')
      }, 480
    );
    setTimeout(function(){
      ty.css('display', 'initial')
      }, 520

    );
    setTimeout(function(){
      ty.animate({color: 'white', borderColor: 'white'}, 1000);
      }, 550
    );
    return false;
});


// MODAL
$(document).ready(function() {
  var modalText = {
    chateau: {
      title: 'Château de Missery',
      tag: 'CASTLE IN FRANCE',
      detail: 'Built a responsive, budget friendly, search engine optimized, and beautiful web application using Ruby, HTML, CSS, with a touch of Javascript. I integrated a free CMS to allow the client to update and create new content and pages on their site',
      link: 'http://www.chateaudemissery.com/',
      img: '/images/chateau4.png'
    },
    myportfolio: {
      title: 'My Portfolio',
      tag: 'Deep dive in to Javascript',
      detail: "When I started building this website, I only had a small amount of experience with Javascript, and none with Nodejs.  I've since became very comfortable with and gained an appreciation for both. I wrote the code above after being unable to find a form submitted response clean enough for what I wanted.  If you want to see what it does, use the contact form and say hi!  This just a few of the many lines of code that I'm proud of in this project.",
      img: '/images/portfolio1.png'
    }, 
    delphi: {
      title: 'Delphi',
      tag: 'Student Project',
      detail: 'A Yelp clone that integrates with the Google Maps API and includes features like user comments, star ratings, image uploading, and user authentication.',
      link: 'https://delphi-daniel-degrassi.herokuapp.com/',
      img: '/images/delphi2.png'
    },
    flixster: {
      title: 'Flixster',
      tag: 'Student Project',
      detail: 'A two-sided, video-streaming marketplace platform that features credit card payment capabilities, user role management, complex user interfaces, and advanced database relationships.',
      link: 'https://flixter-dan-degrassi.herokuapp.com/',
      img: '/images/flixster1.png'
    },
    todo: {
      title: 'Todoster',
      tag: 'Student Project',
      detail: 'This single-page to-do application features a fluid user interface that allows users to rapidly add dynamic content.',
      link: 'https://todoster-dan-degrassi.herokuapp.com/',
      img: '/images/todo1.png'
    }
  };

  var modal = document.getElementById('myModal')
  var trigger = document.getElementById("myportfolio");
  var closeButton = document.querySelector(".close");
    function toggleModal() {
        modal.classList.toggle("show-modal");
    }

    function windowOnClick(event) {
        if (event.target === modal) {
            toggleModal();
        }
    }
  $('#gallery .button').click(function() {
    fillModal(this.id);
    modal.classList.toggle("show-modal");
  });



  // closes modals
  $('#gallery.close')
  closeButton.addEventListener("click", toggleModal);
  window.addEventListener("click", windowOnClick);

  function fillModal(id) {
    $('#modal-img').attr('src', modalText[id].img);
    $('.modal-title').text(modalText[id].title);
    $('.modal-text').text(modalText[id].detail);
    $('.modal-undertitle').text(modalText[id].tag);
// first if sets myportfolio.link to null.  Needs to be adapted to allow
// multiple linkless modalText's to hide their link
    if(modalText[id].title == 'My Portfolio') { $('.modal-link').css('visibility', 'hidden')};
// Check for a link, and if present will show the link button
    if (modalText[id].link) { $('.modal-link').css('visibility', 'visible').attr('onclick', "window.location.href='" + modalText[id].link +"'")};
  };

});