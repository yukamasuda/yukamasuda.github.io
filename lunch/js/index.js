$(function () {
	var count = 0;
	var listlength = $('.shoplist').find('li').length;
	var rollingSpeed = 100;
	var listHeight = $('.shoplist li').height();
	var rollHeight = listHeight / 2;
	var timer;
	var rollflag = false;
	var stopflag = false;

	// まずウインドウの横幅を変数に入れる
	var wtimer = false;
	var winWidth = $(window).width();
	var winWidth_resized;

	// ウインドウのリサイズイベントに処理をバインド
	$(window).on("resize", function () {
		// リサイズ後の放置時間が指定ミリ秒以下なら何もしない(リサイズ中に何度も処理が行われるのを防ぐ)
		if (wtimer !== false) {
			clearTimeout(wtimer);
		}
		// 放置時間が指定ミリ秒以上なので処理を実行
		wtimer = setTimeout(function () {
			// リサイズ後のウインドウの横幅を取得
			winWidth_resized = $(window).width();

			// リサイズ前のウインドウ幅とリサイズ後のウインドウ幅が異なる場合
			if (winWidth != winWidth_resized) {
				// ここにやりたい処理書く
				//console.log("ウインドウ横幅のリサイズ");
				//console.log("現在の横幅: ", winWidth);
				//console.log("リサイズ後の横幅: ", winWidth_resized);
				listHeight = $('.shoplist li').height();
				rollHeight = listHeight / 2;

				// 次回以降使えるようにリサイズ後の幅をウインドウ幅に設定する
				winWidth = $(window).width();
			}
		}, 200);
	});


	function startTimer() {
		timer = setInterval(function () { rollDram(rollingSpeed); }, rollingSpeed);
	}

	$('.shoplist').append($('.shoplist').html());
	function positionInit() {
		count++;
		if (count % listlength == 0) {
			$('.wrapper').css({ 'bottom': -rollHeight + 'px' });
			count = 0;
		}
	}
	$('#button').on('click', function () {
		if ($(this).hasClass('is_stop')) {
			pushStop();
		} else {
			if (!rollflag) {
				$(this).addClass('is_stop');
				rollflag = true;
				startTimer();
				$('.shoplist li').removeClass("result");
			}
		}
	});

	function pushStop() {
		if (!stopflag) {
			stopflag = true;
			clearInterval(timer);
			var val = Math.ceil(Math.random() * 4);
			//var val = 1;
			for (var i = 0; i <= 5; i++) { rollDram(100); }
			//val = Math.ceil(Math.random() * 3);
			//for (var i = 0; i <= val; i++) { rollDram(150); }
			//val = Math.ceil(Math.random() * 2);
			for (var i = 0; i <= val; i++) { rollDram(150); }
			rollDram(1000, "last");
		}
	}

	function rollDram(Speed, state) {
		$('.wrapper').animate({ 'bottom': '-=' + listHeight + 'px' }, Speed, 'linear', function () {
			positionInit();
			if (state == "last") {
				$('.wrapper').stop();
				$('#button').removeClass('is_stop');
				var num = listlength - ((-(parseInt($('.wrapper').css("bottom"))) - rollHeight) / listHeight) - 2;
				$('.shoplist li').eq(num).addClass("result");
				$('.shoplist li').eq(num + listlength).addClass("result");
				rollflag = false;
				stopflag = false;
			}
		});
	}

	// 店舗の順番をシャッフルする
	function ShuffleDram() {
		//alert(listlength);
		for (var i = 0; i < listlength; i++) {
			$('.shoplist li').eq(i).addClass("remove");
		}
		$('.shoplist li.remove').remove();
		var shop_array = [];
		$('.shoplist li').each(function () {
			shop_array.push($(this).html());
		});

		function shuffle(array) {
			var n = array.length, i = -1, j, k;
			while (++i < n) {
				j = Math.floor(Math.random() * n);
				k = Math.floor(Math.random() * n);
				t = array[j];
				array[j] = array[k];
				array[k] = t;
			}
		}
		shuffle(shop_array);
		$('.shoplist li').remove();
		for (var i = 0; i < listlength; i++) {
			$('.shoplist').append("<li>" + shop_array[i] + "</li>");
		}
		$('.shoplist').append($('.shoplist').html());
	}
	$('#btn_shuffle').on('click', function () {
		ShuffleDram();
	});

});
