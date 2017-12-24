var currentQuote = '';
var currentAuthor = '';

particlesJS("snowfall", {
  "particles": {
    "number": {
      "value": 80
    },
    "shape": {
      "type": "circle"
    },
    "size": {
      "value": 10,
      "random": true
    },
    "line_linked": {
      "enable": false
    },
    "move": {
      "enable": true,
      "speed": 2,
      "direction": "bottom",
      "straight": false
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": false
      }
    },
    "modes": {
      "push": {
        "particles_nb": 12
      }
    }
  }
});

$(document).ready(function() {
  getQuote();
  $('#btn-get-quote').click(function() {
    getQuote();
  });
  $('#share-quote-twitter').click(function() {
    openURL('https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURIComponent('"' + currentQuote + '" ' + currentAuthor));
  });
  $('#share-quote-email').click(function() {
    var emailhref = "mailto:?subject=Quote of the day!&body="+currentQuote+" by " + currentAuthor;
    document.location.href=emailhref;
  });
});

function getQuote() {
    $.ajax({
        headers: {
            "X-Mashape-Key": "TQAOFcb2xmmshSppN5x7h9M8FCmcp1jbUlgjsnTojdihAAhxle",
            Accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded"
        },
        url: 'https://andruxnet-random-famous-quotes.p.mashape.com/cat=',
        success: function (val) {
            console.log(val);
            if (typeof val == 'string') {
                val = JSON.parse(val);
            }
            showQuotes(val);
        }
    });
}

function showQuotes(val) {
    currentQuote = val.quote;
    currentAuthor = val.author;

    $('#quote-content').text(val.quote);
  
    if (val.category == 'Famous') {
      $('#quote-author').html("\u2014 A quote by <cite><strong>" + val.author +"</strong></cite>");
    } else if (val.category == 'Movies') {
      $('#quote-author').html("\u2014 A quote from <cite><strong>" + val.author +"</strong></cite>");
    } else {
      $('#quote-author').text(val.author);
    }
}

function openURL(url){
  window.open(url, 'Share', 'width=550, height=400, toolbar=0, scrollbars=1 ,location=0 ,statusbar=0,menubar=0, resizable=0');
}