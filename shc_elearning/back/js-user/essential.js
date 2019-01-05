$('.marquee').marquee({
	 yScroll: "top",            // the position of the marquee initially scroll (can be either "top" or "bottom")
	 showSpeed: 800,            // the speed of to animate the initial dropdown of the messages
	 scrollSpeed: 10,             // the speed of the scrolling (keep number low)
	 pauseSpeed: 2000,            // the time to wait before showing the next message or scrolling current message
	 pauseOnHover: true,          // determine if we should pause on mouse hover
	 loop: -1,                    // determine how many times to loop through the marquees (#'s < 0 = infinite)
	 fxEasingShow: "swing",       // the animition easing to use when showing a new marquee
	 fxEasingScroll: "linear",    // the animition easing to use when showing a new marquee

	 // define the class statements
	 cssShowing: "marquee-showing",

	 // event handlers
	 init: null,                // callback that occurs when a marquee is initialized
	 beforeshow: null,          // callback that occurs before message starts scrolling on screen
	 show: null,                // callback that occurs when a new marquee message is displayed
	 aftershow: null           // callback that occurs after the message has scrolled
});


//upload foto profile
$('#file-foto').change(function() {
    // select the form and submit
    $('#form-foto').submit();
});

function isNull(str){
	return str === null ? true : false;
}

function isEmpty(str) {
    return (!str || 0 === str.length);
}

function isBlank(str) {
    return (!str || /^\s*$/.test(str));
}

String.prototype.isEmpty = function() {
    return (this.length === 0 || !this.trim());
};

function isValidEmailAddress(emailAddress) {
    var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    return pattern.test(emailAddress);
}

String.prototype.replaceArray = function(find, replace) {
  var replaceString = this;
  var regex;
  for (var i = 0; i < find.length; i++) {
    regex = new RegExp(find[i], "g");
    replaceString = replaceString.replace(regex, replace[i]);
  }
  return replaceString;
};

$('#reply-link').click(function(){
	$('html, body').animate({scrollTop: $("#reply-form").offset().top}, 1000);
});
