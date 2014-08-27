/* jshint latedef: false */
'use strict';

var buttons = [].slice.call(document.querySelectorAll('button.counter'));
var undoHistory = [];

function count (element) {
	var countBy = 1;
	resetEvent( element );
	if (element.getAttribute('data-count')) {
		countBy = parseFloat(element.getAttribute('data-count'));
	}
	var value = parseFloat(element.innerHTML);
	var newValue = value + countBy;
	if (element.hasAttribute('data-max')) {
		var max = parseFloat(element.getAttribute('data-max'));
		if (newValue > max) {
			maxEvent( element );
			resetEvent( element );
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

function resetEvent (element) {
	if (!element.hasAttribute('data-reset')) {
		return;
	}
	var prop = element.getAttribute('data-reset');
	var elementsToReset = document.querySelectorAll('button[data-reset-event~='+prop+']');
	
	[].forEach.call(elementsToReset, resetElement);
}

function maxEvent (element) {
	if (!element.hasAttribute('data-max-event')) {
		return;
	}
	var prop = element.getAttribute('data-max-event');
	var elementsToIncrement = document.querySelectorAll('button[data-increment-event~='+prop+']');
	
	[].forEach.call(elementsToIncrement, function (elementToIncrement) {
		count( elementToIncrement );
	});

	var elementsToReset = document.querySelectorAll('button[data-reset-event~='+prop+']');
	[].forEach.call(elementsToReset, resetElement);
}

function save () {
	var results = buttons.map(function (element) { return element.innerHTML; });
	while (undoHistory.length > 100) {
		undoHistory.shift();
	}
	undoHistory.push(results);
	localStorage.setItem('ump-indicator-data', JSON.stringify(results));
	localStorage.setItem('ump-indicator-undo', JSON.stringify(undoHistory));
}

function restore (data) {
	buttons.forEach(function (element, index) {
		element.innerHTML = data[index];
	});
}

var savedData = localStorage.getItem('ump-indicator-data');
if (savedData) {
	undoHistory = JSON.parse(localStorage.getItem('ump-indicator-undo') || '[]');
	restore(JSON.parse(savedData));
} else {
	undoHistory = [];
	save();
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
	if (element.classList.contains('counter')) {
		count( element );
	} else {
		resetEvent( element );
	}

	if (element.classList.contains('undo')) {
		undoHistory.pop();
		var undone = undoHistory.pop();
		if (undone) {
			restore( undone );
		}
	}
	save();
}, true);
