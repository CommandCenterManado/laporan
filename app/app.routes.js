angular
	.module('app')
	.config(config)
	.run(function (userService, $location, $rootScope, loading) {
		$rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams, options) {
			loading.open();
			userService.check().then(function (response) {
				if (response.status == 0) {
					$location.path('/login');
				} else {
					$rootScope.userData = response.userdata;
					if (toState.name == 'login') {
						$location.path('/dashboard')
					}
				}
			});
		})
		$rootScope.$on('$stateChangeSuccess', function () {
			loading.close();
		})
	});

function config($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise('/')

	$stateProvider
		.state('login', {
			url: '/login',
			views: {
				'content': {
					templateUrl: 'login.html',
					controller: 'loginController as vm'
				},
				'loader': {
					templateUrl: 'views/template/loading.html'
				}
			}
		})

		// tasks state
		.state('tasks', {
			views: {
				'header': {
					templateUrl: 'views/template/header.html',
					controller: 'headerController as vm'
				},
				'navSecond@tasks': {
					templateUrl: 'views/template/header.navSecond.html'
				},
				'content': {
					template: '<main id="main" ui-view="tasks"></main><div ui-view="alert" id="alert"></div>'
				},
				'loader': {
					templateUrl: 'views/template/loading.html'
				}
			}
		})
		.state('tasks.dashboard', {
			url: '/',
			data: {
				pageTitle: "Dashboard"
			},
			views: {
				'tasks': {
					templateUrl: 'views/dashboard.html',
					controller: 'dashboardController as dashboard'
				}
			}
		})
		.state('tasks.laporan', {
			views: {
				'tasks': {
					template: '<section id="filter" ui-view="filter"></section><div ui-view="laporan"></div>'
				},
				'filter@tasks.laporan': {
					templateUrl: 'views/template/filter.html',
					controller: 'filterController as vm'
				},
				'alert@tasks': {
					template: '<div uib-alert ng-repeat="alert in vm.alertScope" ng-class="' + "'alert-'" + ' + alert.type" close="vm.closeAlert($index)" dismiss-on-timeout="5000">{{alert.msg}}</div>',
					controller: 'alertController as vm'
				}
			}
		})
		.state('tasks.laporan.list', {
			url: '/laporan/list',
			data: {
				pageTitle: "Laporan List"
			},
			views: {
				'laporan': {
					templateUrl: 'views/laporan.list.html',
					controller: 'laporanListController as vmList'
				}
			}
		})
		.state('tasks.laporan.card', {
			url: '/laporan/card',
			data: {
				pageTitle: "Laporan Card"
			},
			views: {
				'laporan': {
					templateUrl: 'views/laporan.card.html',
					controller: 'laporanCardController as vmCard'
				}
			}
		})
		.state('tasks.laporan.map', {
			url: '/laporan/map',
			data: {
				pageTitle: "Laporan Map"
			},
			views: {
				'laporan': {
					templateUrl: 'views/laporan.map.html',
					controller: 'laporanMapController as vmMap'
				}
			}
		})

		// verify state
		.state('verify', {
			views: {
				'header': {
					templateUrl: 'views/template/header.html',
					controller: 'headerController as vm'
				},
				'navSecond@verify': {
					templateUrl: 'views/template/header.navSecond.verify.html'
				},
				'content': {
					template: '<main id="main" ui-view="verify"></main><div ui-view="alert" id="alert"></div>'
				},
				'alert@verify': {
					template: '<div uib-alert ng-repeat="alert in vm.alertScope" ng-class="' + "'alert-'" + ' + alert.type" close="vm.closeAlert($index)" dismiss-on-timeout="5000">{{alert.msg}}</div>',
					controller: 'alertController as vm'
				},
				'loader': {
					templateUrl: 'views/template/loading.html'
				}
			}
		})
		.state('verify.web', {
			url: '/verify/web',
			data: {
				pageTitle: "Verifikasi Laporan Web"
			},
			views: {
				'verify': {
					templateUrl: 'views/laporan.verify.web.html',
					controller: 'laporanVerifyWebController',
					controllerAs: 'vmWeb'
				}
			}
		})
		.state('verify.android', {
			url: '/verify/android',
			data: {
				pageTitle: "Verifikasi Laporan Android"
			},
			views: {
				'verify': {
					template: '<h1>Android</h1>'
				}
			}
		})
		.state('verify.facebook', {
			url: '/verify/facebook',
			data: {
				pageTitle: "Verifikasi Laporan Android"
			},
			views: {
				'verify': {
					templateUrl: 'views/laporan.verify.facebook.html',
					controller: 'laporanVerifyFacebookController',
					controllerAs: 'vmFacebook'
				}
			}
		})
		.state('verify.twitter', {
			url: '/verify/twitter',
			views: {
				'verify': {
					template: '<h1>Twitter</h1>'
				}
			}
		})
		.state('verify.sms', {
			url: '/verify/sms',
			views: {
				'verify': {
					template: '<h1>SMS</h1>'
				}
			}
		})
		.state('verify.telephone', {
			url: '/verify/telephone',
			views: {
				'verify': {
					template: '<h1>Telephone</h1>'
				}
			}
		})

		// setting state
		.state('setting', {
			views: {
				'header': {
					templateUrl: 'views/template/header.html',
					controller: 'headerController as vm'
				},
				'navSecond@setting': {
					templateUrl: 'views/template/header.navSecond.setting.html'
				},
				'content': {
					template: '<main id="main" ui-view=""></main><div ui-view="alert" id="alert"></div>'
				},
				'@setting': {
					template: '<section id="filter" ui-view="filter"></section><div ui-view="setting"></div>'
				},
				'filter@setting': {
					templateUrl: 'views/template/filter.html',
					controller: 'filterController as vm'
				},
				'loader': {
					templateUrl: 'views/template/loading.html'
				}
			}
		})
		.state('setting.kategori', {
			url: '/setting/kategori',
			data: {
				pageTitle: "Pengaturan Kategori"
			},
			views: {
				'setting': {
					templateUrl: 'views/setting.kategori.html',
					controller: 'settingKategoriController as vm'
				}
			}
		})
		.state('setting.user', {
			url: '/setting/user',
			data: {
				pageTitle: "Pengaturan User"
			},
			views: {
				'setting': {
					templateUrl: 'views/setting.user.html',
					controller: 'settingKategoriController as vm'
				}
			}
		})

}