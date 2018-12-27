// =SOCIAL SHARE CONDITION
function socialShare() {
	$(window).scroll(function() {
		var postContent = $("#content").position().top;
		var contentHeight = ($(".single-post").height()) / 1.8;
		$(".share-box-wrapper").height(contentHeight);
		if ( $(this).scrollTop() > postContent) {
			$(".share-box-wrapper .share-box").addClass("sticky");
		} else {
			$(".share-box-wrapper .share-box").removeClass("sticky");
		}

		if ($(this).scrollTop() > contentHeight ) {
			$(".share-box-wrapper .share-box").addClass("holdy");
		} else {
			$(".share-box-wrapper .share-box").removeClass("holdy");
		}
	});
}

$(document).ready(function() {

	// Click dropdown menu on mobile
	$(".dropdown").on("click", function(){
		$(this).toggleClass("active");
	});

	// SLick Slider
	$(".post-slider").slick({
		dots: true,
		lazyLoad: '',
		autoplay: true,
		autoplaySpeed: 7000,
		pauseOnHover: true
	});

	// Gallery Slider Preview
	$(".slider-preview").slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		fade: true,
		asNavFor: '.slider-nav',
		responsive: [
		{
			breakpoint: 480,
			settings: {
				arrows: true,
				asNavFor: '',
				fade: false
			}
		}
		]
	});

	// Gallery Slider Nav
	$(".slider-nav").slick({
		slidesToShow: 3,
		slidesToScroll: 1,
		asNavFor: '.slider-preview',
		dots: false,
		focusOnSelect: true,
	});

	// Navbar on mobile
	$(".dropdown > a").click(function(event) {
		event.stopPropagation();
		$(this).parent().find(".dropdown-menu").toggle();
	});

	// Navbar dropdown on mobile
	function checkWidth() {
		// alert("berubah");
		var screenWidth = $(window).width();
		if (screenWidth > 992) {
			$(".dropdown > a").on("click", function(e) {
				$(this).parent().toggleClass("active");
				$(this).parent().find(".dropdown-menu").toggleClass("open");

				e.preventDefault();
			});
		}
	}
	checkWidth();
	$(window).resize(checkWidth);
});

