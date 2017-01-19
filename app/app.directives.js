angular
.module('app')
.directive('title', title)
.directive('hcLine', hcLine);

function title(){
	return {
		template: "{{vm.title}}",
		controller: titleController,
		controllerAs: 'vm'
	}
}
titleController.$inject = ['$rootScope', '$timeout', 'logger'];
function titleController($rootScope, $timeout, logger){
	var vm = this;
	vm.listener = listener;

	function listener(event, toState) {
		$timeout(function(){
			vm.title = (toState.data && toState.data.pageTitle) ? toState.data.pageTitle : 'Default Title';
		});
	}
	$rootScope.$on('$stateChangeSuccess', vm.listener);
}

function hcLine(){
	var directive = {
		link: link,
		restrict: 'EA',
		template: '<div></div>',
		scope: {
			options: '='
		}
	}
	return directive;

	function link(scope, element){
		element[0].style.display = 'block';
		Highcharts.chart(element[0], scope.options);
	}
}