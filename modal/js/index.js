$(function() {
	// JSでiOSにも配慮した背景固定なスクロール対応のモーダルウィンドウ
	// https://spyweb.media/2017/09/21/modal-window-fixed-background-also-support-ios/

	var $window = $(window),
		$html = $('html'),
		$body = $('body'),
		$overlay = $('.overlay'),
		scrollbar_width = window.innerWidth - document.body.scrollWidth,
		touch_start_y;
	
	// タッチしたとき開始位置を保存しておく
	$window.on('touchstart', function(event) {
		touch_start_y = event.originalEvent.changedTouches[0].screenY;
	});
	
	$('[data-modal]').on('click', function() {
		$('.modal_list > li').removeClass('is_show');
		$('#' + $(this).data('modal')).addClass('is_show');
		// スワイプしているとき
		$window.on('touchmove.noscroll', function(event) {
			var overlay = $overlay[0],
				current_y = event.originalEvent.changedTouches[0].screenY,
				height = $overlay.outerHeight(),
				is_top = touch_start_y <= current_y && overlay.scrollTop === 0,
				is_bottom = touch_start_y >= current_y && overlay.scrollHeight - overlay.scrollTop === height;
			// スクロール対応モーダルの上端または下端のとき
			if (is_top || is_bottom) {
				// スクロール禁止
				event.preventDefault();
			}
		});
	
		// スクロール禁止
		$('html, body').css('overflow', 'hidden');
		
		// スクロールバーがあるとき
		if (scrollbar_width) {
			// その分padding-rightを追加
			$html.css('padding-right', scrollbar_width);
		}
		
		// モーダルをフェードイン
		$overlay.fadeIn(300);
	});
	
	// モーダルを閉じる処理
	var closeModal = function() {
		// overflow:hiddenを消す
		$body.removeAttr('style');
		// イベントを削除
		$window.off('touchmove.noscroll');
		
		// モーダルをフェードアウト
		$overlay.animate({
			opacity: 0
		}, 300, function() {
			// モーダルは一番上にスクロールしておく
			$overlay.scrollTop(0).hide().removeAttr('style');
			// overflow:hiddenを消す
			$html.removeAttr('style');
		});
	};
	
	// オーバーレイをクリック
	$overlay.on('click', function(event) {
		// モーダルの領域外をクリックで閉じる
		if (!$(event.target).closest('.modal').length) {
			closeModal();
		}
	});
	
	// 閉じるボタンクリックでモーダルを閉じる
	$('.button').on('click', function() {
		closeModal();
	});
	
});