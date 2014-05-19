angular.module('components', []).directive('wgxSelect', function () {
	return {
		restrict: 'E',
		transclude: true,
		scope: {
			options: '='
		},
		template: '<select><option ng-repeat="{{option in options}}" value="{{value}}">{{text}}</option></select>',
		replace: true
	};
});