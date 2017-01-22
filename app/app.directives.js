'use strict';

angular
	.module('app')
	.directive('updateTitle', updateTitle)
	.directive('hcLine', hcLine)
	; // endl

function updateTitle() {
	return {
		template: "Pelaporan Kota Manado",
		controller: titleController,
		controllerAs: 'vm',
		link: link
	}
	function link(scope, element, attribute, controller) {
		var vm = controller;
		vm.rootScope.$on('$stateChangeSuccess', function () {
			vm.timeout(function () {
				element.text(vm.title);
			})
		});
	}
}

function hcLine() {
	var directive = {
		link: link,
		restrict: 'EA',
		template: '<div></div>',
		scope: {
			options: '='
		}
	}
	return directive;

	function link(scope, element) {
		element[0].style.display = 'block';
		Highcharts.chart(element[0], scope.options);
	}
}

// Directive Controller

titleController.$inject = ['$rootScope', '$timeout', 'logger'];

function titleController($rootScope, $timeout, logger) {
	var vm = this;
	vm.listener = listener;
	vm.rootScope = $rootScope;
	vm.timeout = $timeout

	function listener(event, toState) {
		$timeout(function () {
			vm.title = (toState.data && toState.data.pageTitle) ? toState.data.pageTitle : 'Pelaporan Kota Manado';
			console.log(toState);
		});
	}
	$rootScope.$on('$stateChangeSuccess', vm.listener);
}