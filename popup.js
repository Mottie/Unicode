$(function(){

	// Preview popups
	var h, hde, leg, ov, pos, popup, s, t, w, tt;
	$('table.codes').find('td').hover(function(){
		t = $(this);
		s = [t.width(), t.height()];
		pos = t.position();
		h = t.html().replace(/(<\/?small>|<br>|tooltip)/g, function(m){
				return {
					'<small>'  : '<br><small>&amp;#', // decimal code
					'</small>' : ';</small>',    // semi-colon for hex code
					'<br>'     : ';<br>&amp;#x', // hex code
					'tooltip'  : 'tooltip hide'  // make sure any residual tooltips are hidden
				}[m];
			});
		tt = $('<p class="tooltip">' + h + '</p>').appendTo(t);
		tt
			.css({
				top : pos.top + s[1]/2 - tt.outerHeight()/2 - 8, // 8 is the padding, which isn't included in the outerHeight (because it is still hidden)
				left: pos.left + s[0]/2 - tt.outerWidth()/2
			})
			.fadeIn('fast');
	}, function(){
		$(this).find('p')
			.stop(true,true)
			.fadeOut('fast', function() {
				$(this).remove();
			});
	});

	// Legend popup
	t = '<table class="legend"><thead>' +
		'<tr><th class="names">Name</th><th class="descrip">Description</th><th class="tabs">Tabs <span class="close">x</span></th></tr>' +
		'</thead><tbody>' +
		'<tr><th>Arabic</th><td>Arabic</td><td><span class="box blue"></span><span class="box purple"></span></td></tr>' +
		'<tr><th>Bohairic</th><td>Bohairic Coptic</td><td><span class="box white"></span></td></tr>' +
		'<tr><th>Braille</th><td>Braille</td><td><span class="box white"></span></td></tr>' +
		'<tr><th>Bopomofo</th><td>Chinese</td><td><span class="box yellow"></span><span class="box white"></span></td></tr>' +
		'<tr><th>Burmese</th><td>Myanmar</td><td><span class="box"></span></td></tr>' +
		'<tr><th>CJK</th><td>Ideograph used for Chinese, Japanese, and Korean. Also called "Kanji".</td><td><span class="box purple"></span><span class="box red"></span><span class="box white"></span></td></tr>' +
		'<tr><th>Canadian</th><td>Syllabics for Canadian aboriginal</td><td><span class="box blue"></span></td></tr>' +
		'<tr><th>Chinese CT</th><td>Chinese corner tone</td><td><span class="box yellow"></span></td></tr>' +
		'<tr><th>Fullwidth</th><td>Double-byte characters</td><td><span class="box purple"></span></td></tr>' +
		'<tr><th>Greek</th><td>Greek</td><td><span class="box blue"></span></td></tr>' +
		'<tr><th>Hangul</th><td>Korean</td><td><span class="box purple"></span><span class="box green"></span><span class="box yellow"></span><span class="box white"></span></td></tr>' +
		'<tr><th>Hiragana</th><td>Japanese</td><td><span class="box white"></span></td></tr>' +
		'<tr><th>Latin</th><td>Latin character with accents</td><td><span class="box blue"></span><span class="box yellow"></span><span class="box white"></span></td></tr>' +
		'<tr><th>Kanbun</th><td>Japanese</td><td><span class="box white"></span></td></tr>' +
		'<tr><th>Katakana</th><td>Japanese</td><td><span class="box purple"></span><span class="box white"></span></td></tr>' +
		'<tr><th>Khmer</th><td>Cambodian</td><td><span class="box blue"></span></td></tr>' +
		'<tr><th>Private</th><td>Area for private use</td><td><span class="box black"></span></td></tr>' +
		'<tr><th>Russian</th><td>Russian</td><td><span class="box blue"></span></td></tr>' +
		'<tr><th>Symbols</th><td>Symbols</td><td><span class="box blue"></span><span class="box white"></span></td></tr>' +
		'</tbody></table>' +
		'<div id="overlay"></div>';
	$('body').append(t);

	leg = $('.legend');
	ov = $('#overlay');

	popup = function(){
		leg
			.show()
			.css({
				left: $(window).width()/2 - leg.width()/2,
				top: $(window).height()/2 - leg.height()/2
			});
		ov
			.show()
			.height( $(window).height() );
	};

	hde = function(){
		leg.hide();
		ov.hide();
	};

	ov.bind('click', function(){ hde(); });
	leg.find('.close').bind('click', function(){ hde(); });

	$('.popup').click(function(){
		popup();
		return false;
	});

	$(document).bind('keyup', function(e){
		// shift-f1 or f2
		if (e.which === 112 && e.shiftKey || e.which === 113) {
			popup();
			return false;
		}
		if (e.which === 27) {
			hde();
			return false;
		}
	});

});