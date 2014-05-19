(function () {
	'use strict';
	var setters = {
		'boolean': function (key, defaultValue) {
			return function (value) {
				this[key] = value === undefined ? defaultValue : !! value;
			};
		},
		'string': function (key, defaultValue) {
			return function (value) {
				this[key] = value ? value + '' : '';
			};
		},
		'array': function (key, defaultValue) {
			return function (value) {
				this[key] = angular.isArray(value) ? value : defaultValue;
			};
		},
		'object': function (key, defaultValue) {
			return function (value) {
				this[key] = value === undefined ? defaultValue : value;
			};
		},
		'number': function (key, defaultValue) {
			return function (value) {
				this[key] = value === undefined ? defaultValue : +value;
			};
		},
		'function': function(key, defaultValue) {
			return function(value) {
				this[key] = angular.isFunction(value)? value: defaultValue;
			};
		},
		'null': function (key, defaultValue) {
			return function (value) {
				this[key] = value === undefined ? defaultValue : value;
			};
		}
	};

	var getter = function (key) {
		return this[key];
	};

	function construct(component, attrs) {
		angular.forEach(attrs, function (value, key) {
			if (value && value.set) {
				value.get = value.get || getter;
			} else {
				var type = $.type(value);
				attrs[key] = {
					get: getter,
					set: setters[type](key, value)
				};
			}
		});

		component.prototype.attr = function (key, value) {
			if (arguments.length === 1) {
				return attrs[key].get.call(this, key);
			} else {
				attrs[key].set.call(this, value);
			}
		};
	}
	window.construct = construct;

	function init(instance, attrs, param) {
		angular.forEach(attrs, function(value, key) {
			instance.attr(key, param[key]);
		});
	}

	window.init = init;
})();