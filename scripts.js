$(function() {
	var mobile_nav_height = 160;
	if ($(window).width() > 768)
		mobile_nav_height = 78;

	$('body').prepend(`
		<div id="mobile-nav" class="mobile-nav w-100 md-hide">
			<div class="container">
				<ul class="mobile-nav__menu ls-unstyled xs-grid-2 sm-grid-5 p-top-5 txt-center gutters-0">
	`);

	$('#mobile-nav').css({
		'position' : 'absolute',
		'transform': 'matrix(1, 0, 0, 1, 0, -' + mobile_nav_height + ')'
	});

	$(window).resize(function() {
		mobile_nav_height = 160;
		if ($(this).width() > 768)
			mobile_nav_height = 78;

		$('#mobile-nav').css('transform', 'matrix(1, 0, 0, 1, 0, -' + mobile_nav_height + ')');
		$('.navbar').css('transform', 'matrix(1, 0, 0, 1, 0, 0)');

		$('#mobile-nav').removeClass('open');

		$('#mobile-nav ul li').css({
			'opacity'   : 0,
			'visibility': 'hidden'
		});
	});

	$($('.navbar__collapse.maxmd-hide').get().reverse()).each(function() {
		$($(this).find('.navbar__item')).each(function() {
			var navbar_item_link = $(this).children('a').prop('href');
			var navbar_item_text = $(this).text();
			$('#mobile-nav ul')
				.append('<li><a class="p-2" href="' + navbar_item_link + '">' + navbar_item_text + '</a></li>')
				.children()
				.css({
					'opacity'   : 0,
					'visibility': 'hidden'
				});
		});
	});

	$('.navbar__toggler').click(function() {
		if (!$('#mobile-nav').hasClass('open')) {
			$('#mobile-nav').addClass('open');

			AnimateDirectionY('#mobile-nav', -mobile_nav_height, 0);
			AnimateDirectionY('.navbar', 0, mobile_nav_height);

			$('#mobile-nav ul li').each(function(index) {
				$(this).css('visibility', 'visible');
				$(this).delay(100 * index).animate({
					'opacity': 1
				}, 200);
			});
		} else {
			AnimateDirectionY('#mobile-nav', 0, -mobile_nav_height);
			AnimateDirectionY('.navbar', mobile_nav_height, 0);

			$($('#mobile-nav ul li').get().reverse()).each(function(index) {
				$(this).delay(100 * index).animate({
					'opacity' : 0,
					'duration': 200,
					'complete': function() {
						$(this).css('visibility', 'hidden');
					}
				});
			});

			$('#mobile-nav').removeClass('open');
		}
	});

	function AnimateDirectionY(element, position_start, position_end) {
		// Caching the object for performance reasons.
		var $elem = $(element);

		// We use a pseudo object for the animation
		// (starts from `distance_start` to `distance_end`), you can name it as you want
		$({pos: position_start}).animate({pos: position_end}, {
			duration: 100,
			step: function(now) {
				// in the step-callback (that is fired each step of the animation),
				// you can use the `now` parameter which contains the current
				// animation-position (`distance_start` up to `distance_end`).
				$elem.css({
					'transform': 'matrix(1, 0, 0, 1, 0, ' + now + ')'
				});
			}
		});
	}
});
