
function inputHandler (){

	if (window.navigator.msPointerEnabled) {
		//Internet Explorer 10 style
		this.eventTouchstart    = "MSPointerDown";
		this.eventTouchmove     = "MSPointerMove";
		this.eventTouchend      = "MSPointerUp";
	} else {
		this.eventTouchstart    = "touchstart";
		this.eventTouchmove     = "touchmove";
		this.eventTouchend      = "touchend";
	};

	this.listen = function (){

		var keyCodes = {
			39: 1, // Right
			76: 1, // Vim right
			68: 1, // D

			37: 3, // Left
			72: 3, // Vim left
			65: 3,  // A

			82: 4, // R - Restart/New game
			78: 4 // N - Restart/New game
		};

		// Respond to keydown
		document.addEventListener("keydown", function (e) {
			var modifiers = e.altKey || e.ctrlKey || e.metaKey || e.shiftKey;

			if (!modifiers) {
				RhombusGame.toProcess (keyCodes[e.keyCode]);
			}
		});

		// Respond to finger motion
		RhombusGame.ui.element['Board'].addEventListener(this.eventTouchstart, function (e) {
			if ((!window.navigator.msPointerEnabled && event.touches.length > 1) || event.targetTouches > 1) {
				return; // too many fingers...
			}

			if (window.navigator.msPointerEnabled) {
				touchStartClientX = event.pageX;
				touchStartClientY = event.pageY;
			} else {
				touchStartClientX = event.touches[0].clientX;
				touchStartClientY = event.touches[0].clientY;
			}
			e.preventDefault();
		});

		RhombusGame.ui.element['Board'].addEventListener(this.eventTouchend, function (e) {
			if (window.navigator.msPointerEnabled) {
				touchEndClientX = event.pageX;
				touchEndClientY = event.pageY;
			} else {
				touchEndClientX = event.changedTouches[0].clientX;
				touchEndClientY = event.changedTouches[0].clientY;
			}

			var dx = touchEndClientX - touchStartClientX;
			var absDx = Math.abs(dx);

			if (absDx > 10) RhombusGame.toProcess ( (dx > 0 ? 1 : 3) ); // (right : left)

			e.preventDefault();
		});

		RhombusGame.ui.element['Board'].addEventListener(this.eventTouchmove, function (e) {
			e.preventDefault();
		});

		RhombusGame.ui.element['Help'].addEventListener("click", function (e) {
			RhombusGame.Desciption();
			e.preventDefault();
		} );

		RhombusGame.ui.element['Rules'].addEventListener("click", function (e) {
			RhombusGame.Desciption(1);
			e.preventDefault();
		} );

		RhombusGame.ui.element['Controls'].addEventListener("click", function (e) {
			RhombusGame.Desciption(2);
			e.preventDefault();
		} );

		RhombusGame.ui.element['GameRestart'].addEventListener("click", function (e) {
			RhombusGame.toProcess(4);
			e.preventDefault();
		} );

	}
}
