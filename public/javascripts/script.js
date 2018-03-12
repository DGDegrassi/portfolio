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
    filter: '.javascript'
  }
});
// Focus on
// instantiates #gallery mixer with javascript as its 
// default active.  WHY DOES WRAP CLASS SCREW IT UP??
var mixer = mixitup('#gallery', {
  load: {
    filter: '.javascript'
  }
});


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

// MODAL TIME

// var modal = document.getElementById('myModal')
//   var trigger = document.getElementById("myportfolio");
//   var closeButton = document.querySelector(".close");
// console.log(trigger)
//   function toggleModal() {
//       modal.classList.toggle("show-modal");
//   }

//   function windowOnClick(event) {
//       if (event.target === modal) {
//           toggleModal();
//       }
//   }
// $('#gallery .button').click(function() {
//   console.log('sup dawg');
//   modal.classList.toggle("show-modal");
// });


// closes modals
// closeButton.addEventListener("click", toggleModal);
// window.addEventListener("click", windowOnClick);

// MODAL
$(document).ready(function() {
  var modalText = {
    chateau: {
      title: 'Château de Missery',
      tag: 'CASTLE IN FRANCE',
      detail: 'Talk all about the castle and the website itself',
      link: 'http://chateaudemissery.herokuapp.com/',
      img: '#'
    },
    myportfolio: {
      title: 'dgdegrassiportfolio',
      tag: 'all about me',
      detail: 'talk about this portfolio and why its featured here',
      img: '/images/modaltest.png'
    }, 
    delphi: {
      title: 'Delphi',
      tag: 'Student Project',
      detail: 'A Yelp clone that integrates with the Google Maps API and includes features like user comments, star ratings, image uploading, and user authentication.',
      link: 'https://delphi-daniel-degrassi.herokuapp.com/',
      img: '#'
    },
    flixster: {
      title: 'Flixster',
      tag: 'STUDENT PROJECT',
      detail: 'A two-sided, video-streaming marketplace platform that features credit card payment capabilities, user role management, complex user interfaces, and advanced database relationships.',
      link: 'https://flixter-dan-degrassi.herokuapp.com/',
      img: '#'
    },
    todo: {
      title: 'Todoster',
      tag: 'STUDENT PROJECT',
      detail: 'This single-page to-do application features a fluid user interface that– by using JavaScript– allows users to rapidly add dynamic content.',
      link: 'https://todoster-dan-degrassi.herokuapp.com/',
      img: '#'
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
    console.log(modalText[id].img);

    $('#modal-img').attr('src', modalText[id].img);
    $('.modal-title').text(modalText[id].title);
    $('.modal-text').text(modalText[id].detail);
    $('.modal-undertitle').text(modalText[id].tag);
    if (modalText[id].link) { $('.modal-link').css('visibility', 'visible').attr('onclick', "window.location.href='" + modalText[id].link +"'")};
  };

});