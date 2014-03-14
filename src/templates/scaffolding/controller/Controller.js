(function (define) {
	define(function (require, exports, module) {

	module.exports = Controller;
	var csst = require('csst');
	var slice = Array.prototype.slice;
	var update = csst.lift(csst.toggle('hidden'));
	var controllerSection = document.querySelector('.controller-section');

	function Controller() {
	}

	Controller.prototype.display = function() {
		hide();
	};
	
	function show() {
		update(false, controllerSection);
	}
	function hide() {
		update(true, controllerSection);
	}
	
	})
}(
	typeof define == 'function' && define.amd
		? define
		: function (factory) { module.exports = factory(require, exports, module); }
));

