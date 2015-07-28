
if (/iPhone|iPod|iPad/.test(navigator.userAgent)) {
	document.body.classList.add('ios');
}

var buttons = [].slice.call(document.querySelectorAll('button.counter'));
var undoHistory = [];

function forEach (ctx, cb) {
	Array.prototype.forEach.call(ctx, cb);
}

function hasClass (element, className) {
	if (element.classList) {
		return element.classList.contains(className);
	}
	var classes = element.className.split(' ');
	return classes.indexOf(className) !== -1;
}

function incrementElement (element) {
	var countBy = 1;
	sendResetEventForElement( element );
	if (element.hasAttribute('data-count')) {
		countBy = parseFloat(element.getAttribute('data-count'));
	}
	var value = parseFloat(element.innerHTML);
	var newValue = value + countBy;
	if (element.hasAttribute('data-max')) {
		var max = parseFloat(element.getAttribute('data-max'));
		if (newValue > max) {
			maxEvent( element );
			resetElement( element );
			return;
		}
	}
	element.innerHTML = value + countBy;
}

function resetElement (element) {
	var start = element.getAttribute('data-start') || 0;
	element.innerHTML = start;
}

function resetElementsWithProperty (prop) {
	var elementsToReset = document.querySelectorAll('button[data-reset-event~='+prop+']');
	
	forEach(elementsToReset, resetElement);
}

function sendResetEventForElement (element) {
	if (!element.hasAttribute('data-reset')) {
		return;
	}
	var prop = element.getAttribute('data-reset');
	resetElementsWithProperty( prop );
}

function maxEvent (element) {
	if (!element.hasAttribute('data-max-event')) {
		return;
	}
	var prop = element.getAttribute('data-max-event');
	var elementsToIncrement = document.querySelectorAll('button[data-increment-event~='+prop+']');
	
	forEach(elementsToIncrement, function (elementToIncrement) {
		incrementElement( elementToIncrement );
	});

	resetElementsWithProperty( prop );
}

function saveState () {
	var results = buttons.map(function (element) { return element.innerHTML; });
	while (undoHistory.length > 100) {
		undoHistory.shift();
	}
	undoHistory.push( results );
	localStorage.setItem('ump-indicator-data', JSON.stringify(results));
	localStorage.setItem('ump-indicator-undo', JSON.stringify(undoHistory));
}

function restoreState (data) {
	buttons.forEach(function (element, index) {
		element.innerHTML = data[index];
	});
}

var savedData = localStorage.getItem('ump-indicator-data');
if (savedData) {
	undoHistory = JSON.parse( localStorage.getItem('ump-indicator-undo') || '[]' );
	restoreState( JSON.parse( savedData ) );
} else {
	undoHistory = [];
	saveState();
}

var eventName = 'click';
var cancelled = false;
if ('ontouchstart' in window) {
	eventName = 'touchend';
	document.addEventListener('touchmove', function (event) {
		cancelled = true;
		event.preventDefault();
	});
}

document.addEventListener(eventName, function (event) {
	if (cancelled) {
		cancelled = false;
		return;
	}
	var element = event.target;
	if (event.target.control) {
		element = event.target.control;
	}
	if (hasClass(element, 'counter')) {
		incrementElement( element );
	} else {
		sendResetEventForElement( element );
	}

	if (hasClass(element, 'undo')) {
		undoHistory.pop();
		var desiredState = undoHistory.pop();
		if (desiredState) {
			restoreState( desiredState );
		}
	}
	saveState();
}, true);
