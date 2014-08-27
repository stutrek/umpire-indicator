'use strict';

var buttons = [].slice.call(document.querySelectorAll('button.counter'));
var undoHistory = [];

function count (element) {
	var countBy = 1;
	if (element.getAttribute('data-count')) {
		countBy = parseFloat(element.getAttribute('data-count'));
	}
	var value = parseFloat(element.innerHTML);
	element.innerHTML = value + countBy;
}

function reset (element) {
	var prop = element.getAttribute('data-reset');
	var elementsToReset = document.querySelectorAll('button[data-reset-event~='+prop+']');
	
	[].forEach.call(elementsToReset, function (elementToReset) {
		var start = elementToReset.getAttribute('data-start') || 0;
		elementToReset.innerHTML = start;
	});
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
	}
	if (element.hasAttribute('data-reset')) {
		reset( element );
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
