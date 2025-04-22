;(function () {
	
	'use strict';

	// iPad and iPod detection	
	var isiPad = function(){
		return (navigator.platform.indexOf("iPad") != -1);
	};

	var isiPhone = function(){
	    return (
			(navigator.platform.indexOf("iPhone") != -1) || 
			(navigator.platform.indexOf("iPod") != -1)
	    );
	};

	// Go to next section
	var gotToNextSection = function(){
		var el = $('.fh5co-learn-more'),
			w = el.width(),
			divide = -w/2;
		el.css('margin-left', divide);
	};

	// Loading page - MODIFICADO para que se muestre hasta que la imagen esté cargada
	var loaderPage = function() {
		// Asegurar que el preloader se muestre correctamente
		$('.fh5co-loader').css({
			'position': 'fixed',
			'left': '0px',
			'top': '0px',
			'width': '100%',
			'height': '100%',
			'z-index': '9999',
			'background': 'url(images/loader.gif) center no-repeat #fff',
			'opacity': '1',
			'display': 'block',
			'visibility': 'visible'
		});
		
		// Precargar la imagen de fondo
		var bgImg = new Image();
		bgImg.src = 'images/espacio.jpg';
		
		// Cuando la imagen termine de cargar, ocultar el preloader
		bgImg.onload = function() {
			$(".fh5co-loader").fadeOut("slow");
			
			// Asegurarse de que la imagen de fondo se aplique correctamente
			if ($(window).width() <= 767) {
				$('#fh5co-hero').css({
					'background-image': 'url(images/espacio.jpg)',
					'background-size': 'cover',
					'background-position': 'center center',
					'background-attachment': 'scroll'
				});
			}
		};
		
		// Por seguridad, si la imagen ya está en caché o falla la carga
		// ocultar el preloader después de un tiempo máximo razonable
		setTimeout(function() {
			if ($('.fh5co-loader').is(':visible')) {
				$(".fh5co-loader").fadeOut("slow");
			}
		}, 3000); // 3 segundos como máximo
	};

	// FullHeight - MODIFICADO para separar la configuración de imagen
	var fullHeight = function() {
		if (!isiPad() && !isiPhone()) {
			$('.js-fullheight').css('height', $(window).height() - 49);
			$(window).resize(function(){
				$('.js-fullheight').css('height', $(window).height() - 49);
			});
		}
		
		// // Arreglo para centrado en iOS
		// if (isiPhone() || isiPad()) {
		// 	$('.fh5co-center-position').css({
		// 		'display': 'flex',
		// 		'flex-direction': 'column',
		// 		'align-items': 'center',
		// 		'justify-content': 'center',
		// 		'text-align': 'center',
		// 		'width': '100%'
		// 	});
			
			$('.fh5co-center-position h2, .animated-bounce-in').css({
				'text-align': 'center',
				'width': '100%'
			});
		}
	};

	var toggleBtnColor = function() {
		if ( $('#fh5co-hero').length > 0 ) {	
			$('#fh5co-hero').waypoint( function( direction ) {
				if( direction === 'down' ) {
					$('.fh5co-nav-toggle').addClass('dark');
				}
			} , { offset: - $('#fh5co-hero').height() } );

			$('#fh5co-hero').waypoint( function( direction ) {
				if( direction === 'up' ) {
					$('.fh5co-nav-toggle').removeClass('dark');
				}
			} , { 
				offset:  function() { return -$(this.element).height() + 0; }
			} );
		}
	};

	// Scroll Next
	var ScrollNext = function() {
		$('body').on('click', '.scroll-btn', function(e){
			e.preventDefault();

			$('html, body').animate({
				scrollTop: $( $(this).closest('[data-next="yes"]').next()).offset().top
			}, 1000, 'easeInOutExpo');
			return false;
		});
	};

	// Click outside of offcanvass
	var mobileMenuOutsideClick = function() {
		$(document).click(function (e) {
			var container = $("#fh5co-offcanvas, .js-fh5co-nav-toggle");
			if (!container.is(e.target) && container.has(e.target).length === 0) {
				if ( $('body').hasClass('offcanvas-visible') ) {
					$('body').removeClass('offcanvas-visible');
					$('.js-fh5co-nav-toggle').removeClass('active');
				}
			}
		});
	};

	// Offcanvas
	var offcanvasMenu = function() {
		$('body').prepend('<div id="fh5co-offcanvas" />');
		$('#fh5co-offcanvas').prepend('<ul id="fh5co-side-links">');
		$('body').prepend('<a href="#" class="js-fh5co-nav-toggle fh5co-nav-toggle"><i></i></a>');

		$('.left-menu li, .right-menu li').each(function(){
			var $this = $(this);
			$('#fh5co-offcanvas ul').append($this.clone());
		});
	};

	// Burger Menu
	var burgerMenu = function() {
		$('body').on('click', '.js-fh5co-nav-toggle', function(event){
			var $this = $(this);
			$('body').toggleClass('fh5co-overflow offcanvas-visible');
			$this.toggleClass('active');
			event.preventDefault();
		});

		$(window).resize(function() {
			if ( $('body').hasClass('offcanvas-visible') ) {
				$('body').removeClass('offcanvas-visible');
				$('.js-fh5co-nav-toggle').removeClass('active');
			}
		});

		$(window).scroll(function(){
			if ( $('body').hasClass('offcanvas-visible') ) {
				$('body').removeClass('offcanvas-visible');
				$('.js-fh5co-nav-toggle').removeClass('active');
			}
		});
	};

	var testimonialFlexslider = function() {
		var $flexslider = $('.flexslider');
		$flexslider.flexslider({
			animation: "fade",
			manualControls: ".flex-control-nav li",
			directionNav: false,
			smoothHeight: true,
			useCSS: false /* Chrome fix*/
		});
	}

	var goToTop = function() {
		$('.js-gotop').on('click', function(event){
			event.preventDefault();
			$('html, body').animate({
				scrollTop: $('html').offset().top
			}, 500);
			return false;
		});
	};

	// Animations
	var contentWayPoint = function() {
		var i = 0;
		$('.animate-box').waypoint( function( direction ) {
			if( direction === 'down' && !$(this.element).hasClass('animated') ) {
				i++;
				$(this.element).addClass('item-animate');
				setTimeout(function(){
					$('body .animate-box.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							el.addClass('fadeInUp animated');
							el.removeClass('item-animate');
						}, k * 200, 'easeInOutExpo' );
					});
				}, 100);
			}
		} , { offset: '95%' } );
	};

	// Document on load.
	$(function(){
		gotToNextSection();
		loaderPage();
		fullHeight();
		toggleBtnColor();
		ScrollNext();
		mobileMenuOutsideClick();
		offcanvasMenu();
		burgerMenu();
		testimonialFlexslider();
		goToTop();

		// Animate
		contentWayPoint();
	});

}());