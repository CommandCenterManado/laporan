'use strict';

angular
	.module('app')

	.controller('alertController', alertController)
	.controller('headerController', headerController)
	.controller('loginController', loginController)
	.controller('dashboardController', dashboardController)
	.controller('filterController', filterController)
	.controller('laporanListController', laporanListController)
	.controller('laporanCardController', laporanCardController)
	.controller('laporanVerifyWebController', laporanVerifyWebController)
	.controller('laporanVerifyFacebookController', laporanVerifyFacebookController)
	.controller('laporanMapController', laporanMapController)
	.controller('modalController', modalController)
	.controller('modalVerifyWebController', modalVerifyWebController)
	.controller('modalVerifyFacebookController', modalVerifyFacebookController)
	; // endl

alertController.$inject = [
	'alert',
	'$rootScope'
];
headerController.$inject = [
	'userService',
	'$location'
];
loginController.$inject = [
	'userService',
	'$location'
]
dashboardController.$inject = [
	'dataApi',
	'logger'
];
filterController.$inject = [
	'dataApi',
	'logger',
	'share',
	'$rootScope'
];
laporanListController.$inject = [
	'$uibModal',
	'dataApi',
	'logger',
	'$rootScope',
	'$filter',
	'share'
];
laporanCardController.$inject = [
	'$uibModal',
	'dataApi',
	'logger',
	'$rootScope'
];
laporanMapController.$inject = [
	'$uibModal',
	'dataApi',
	'logger',
	'$rootScope'
];
laporanVerifyWebController.$inject = [
	'$uibModal',
	'dataApi',
	'logger',
	'$rootScope'
];
laporanVerifyFacebookController.$inject = [
	'$uibModal',
	'dataApi',
	'logger',
	'$rootScope',
	'$http',
	'loading'
];
modalController.$inject = [
	'$uibModal',
	'$uibModalInstance',
	'logger',
	'modalData',
	'$scope',
	'postDataApi',
	'$rootScope',
	'alert'
];
modalVerifyWebController.$inject = [
	'$uibModal',
	'$uibModalInstance',
	'logger',
	'modalData',
	'dataApi',
	'postDataApi',
	'$http',
	'$scope',
	'$rootScope',
	'alert'
];
modalVerifyFacebookController.$inject = [
	'$uibModal',
	'$uibModalInstance',
	'logger',
	'modalData',
	'dataApi',
	'postDataApi',
	'$http',
	'$scope',
	'$rootScope',
	'alert',
	'loading'
];

function alertController(alert, $rootScope) {
	var vm = this;
	vm.alertScope = alert.alertScope;
	vm.closeAlert = closeAlert;

	function closeAlert(index) {
		vm.alertScope.splice(index, 1);
	}
}
function headerController(userService, $location) {
	var vm = this;

	vm.logout = logout;

	function logout() {
		return userService.logout().then(function () {
			$location.path('/login');
		})
	}
}
function loginController(userService, $location) {
	var vm = this;
	vm.login = loginAuth;
	vm.itemDataSend = {
		'username': undefined,
		'password': undefined
	};

	function loginAuth() {
		return userService.login(vm.itemDataSend.username, vm.itemDataSend.password)
			.then(function (response) {
				if (response.status == 'ok') {
					$location.path('/dashboard')
					var loginAuth = response.data;
					return loginAuth;
				}
			})
	}

}

function dashboardController(dataApi, logger) {
	var vm = this;

	vm.progressbarDilapor = {
		max: 100,
		value: 70
	}

	vm.chartMain = {
		width: '100%',
		credits: { enabled: false },
		title: {
			text: "Laporan Diterima",
			align: 'left'
		},
		xAxis: {
			categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
		},
		yAxis: {
			title: { text: null }
		},
		tooltip: {
			valueSuffix: '%'
		},
		legend: {
			layout: 'horizontal',
			align: 'right',
			verticalAlign: 'top',
			borderWidth: 0,
			floating: false
		},
		series: [{
			color: '#2ecc71',
			name: 'Selesai',
			data: (function () {
				var data = [];
				var i;
				for (i = 0; i < 12; i++) {
					data.push([i + Math.random(1) * 1111111111]);
				}
				return data;
			} ())
		}, {
			color: '#f1c40f',
			name: 'Diproses',
			data: (function () {
				var data = [];
				var i;
				for (i = 0; i < 12; i++) {
					data.push([i + Math.random(1) * 2111111111]);
				}
				return data;
			} ())
		}, {
			color: '#e74c3c',
			name: 'Dilapor',
			data: (function () {
				var data = [];
				var i;
				for (i = 0; i < 12; i++) {
					data.push([i + Math.random(1) * 3111111111]);
				}
				return data;
			} ())
		}]
	};
	vm.chartSelesai = {
		chart: {
			type: 'column',
			spacing: [0, 0, 0, 0]
		}, title: {
			text: null
		}, xAxis: {
			categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
			visible: false
		}, yAxis: {
			visible: false
		}, legend: {
			enabled: false
		}, plotOptions: {
			column: {
				pointPadding: 0,
				borderWidth: 0
			}, series: {
				states: {
					hover: {
						enabled: false
					}
				}
			}
		}, tooltip: {
			enabled: false
		}, series: [{
			name: 'Tokyo',
			data: (function () {
				var data = [];
				angular.forEach(vm.chartMain.series[0].data, function (value, key) {
					data.push(value);
				})
				return data;
			} ()),
			color: "#ecf0f1"
		}], credits: {
			enabled: false
		}
	};
	vm.chartProses = {
		chart: {
			type: 'column',
			spacing: [0, 0, 0, 0]
		}, title: {
			text: null
		}, xAxis: {
			categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
			visible: false
		}, yAxis: {
			visible: false
		}, legend: {
			enabled: false
		}, plotOptions: {
			column: {
				pointPadding: 0,
				borderWidth: 0
			}, series: {
				states: {
					hover: {
						enabled: false
					}
				}
			}
		}, tooltip: {
			enabled: false
		}, series: [{
			name: 'Tokyo',
			data: (function () {
				var data = [];
				angular.forEach(vm.chartMain.series[1].data, function (value, key) {
					data.push(value);
				})
				return data;
			} ()),
			color: "#ecf0f1"
		}], credits: {
			enabled: false
		}
	};
	vm.chartDilapor = {
		chart: {
			type: 'column',
			spacing: [0, 0, 0, 0]
		}, title: {
			text: null
		}, xAxis: {
			categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
			visible: false
		}, yAxis: {
			visible: false
		}, legend: {
			enabled: false
		}, plotOptions: {
			column: {
				pointPadding: 0,
				borderWidth: 0
			}, series: {
				states: {
					hover: {
						enabled: false
					}
				}
			}
		}, tooltip: {
			enabled: false
		}, series: [{
			name: 'Tokyo',
			data: (function () {
				var data = [];
				angular.forEach(vm.chartMain.series[2].data, function (value, key) {
					data.push(value);
				})
				return data;
			} ()),
			color: "#ecf0f1"
		}], credits: {
			enabled: false
		}
	};
}
function filterController(dataApi, logger, share, $rootScope) {
	var vm = this;
	vm.filter = {
		jenis_laporan: undefined,
		status_laporan: undefined,
		idkategori_laporan: undefined,
		idkecamatan: undefined,
		idkelurahan: undefined,
		dari_tanggal: undefined,
		sampai_tanggal: undefined
	};

	vm.resetFilter = function () {
		$rootScope.filter = {
			jenis_laporan: undefined,
			status_laporan: undefined,
			idkategori_laporan: undefined,
			idkecamatan: undefined,
			idkelurahan: undefined,
			dari_tanggal: undefined,
			sampai_tanggal: undefined
		};
		console.log($rootScope.filter);
	}

	$rootScope.filter = vm.filter;

	activate();

	function activate() {
		getFilterKategori().then(function (response) {
			vm.dataFilterKategori = response;
		})
		getFilterKecamatan().then(function (response) {
			console.log(response);
			vm.dataFilterKecamatan = response;
		})
		vm.getDataFilterKelurahan = getDataFilterKelurahan;

		function getDataFilterKelurahan(idKecamatan) {
			getFilterKelurahan(idKecamatan).then(function (response) {
				vm.dataFilterKelurahan = response;
			})
		}
	}
	function getFilterKategori() {
		return dataApi.getDataLaporanKategori()
			.then(function (response) {
				return response;
			})
	}
	function getFilterKecamatan() {
		return dataApi.getDataLaporanKecamatan()
			.then(function (response) {
				return response;
			})
	}
	function getFilterKelurahan(idKecamatan) {
		return dataApi.getDataLaporanKelurahan(idKecamatan)
			.then(function (response) {
				return response;
			})
	}
}
function laporanListController($uibModal, dataApi, logger, $rootScope, $filter, share) {
	var vm = this;
	vm.openModal = openModal;

	activate();

	function activate() {
		return getDataLaporan().then(function (data) {
			console.log(data);
			vm.dataLaporan = data;

			angular.forEach(vm.dataLaporan, function (value, key) {
				if (value.status == 'dilapor') {
					value.status_baru = [true, false, false];
				} else if (value.status == 'proses') {
					value.status_baru = [false, true, false];
				} else if (value.status == 'selesai') {
					value.status_baru = [false, false, true];
				} else {
					logger.error('Kesalahan Data ' + value.status);
				}
				if (value.jenis_laporan == "web") {
					value.icon = [value.icon, "fa fa-globe fa-lg"];
				} else if (value.jenis_laporan == "android") {
					value.icon = [value.icon, "fa fa-android fa-lg"];
				} else if (value.jenis_laporan == "facebook") {
					value.icon = [value.icon, "fa fa-facebook fa-lg"];
				} else if (value.jenis_laporan == "twitter") {
					value.icon = [value.icon, "fa fa-twitter fa-lg"];
				} else if (value.jenis_laporan == "sms") {
					value.icon = [value.icon, "fa fa-envelope fa-lg"];
				} else {
					value.icon = [value.icon, "fa fa-phone fa-lg"];
				}
			});
		});
	}
	function getDataLaporan() {
		return dataApi.getDataLaporan()
			.then(function (data) {
				vm.dataBijon = data;
				return vm.dataBijon;
			})
	}
	function openModal(itemData) {
		var modalInstance = $uibModal.open({
			ariaLabelledBy: 'modal-title',
			ariaDescribedBy: 'modal-body',
			templateUrl: 'views/template/uibModal.html',
			controller: 'modalController',
			controllerAs: 'vm',
			resolve: {
				modalData: function () {
					return {
						itemData: itemData
					};
				}
			}
		});
	}
}
function laporanCardController($uibModal, dataApi, logger, $rootScope) {
	var vm = this;
	vm.openModal = openModal;

	$rootScope.laporanActivate = activate;

	activate();

	function activate() {
		getDataLaporan().then(function (data) {
			vm.dataLaporan = data;

			angular.forEach(vm.dataLaporan, function (value, key) {
				if (value.jenis_laporan == "web") {
					value.icon = [value.icon, "fa fa-globe fa-lg"];
				} else if (value.jenis_laporan == "android") {
					value.icon = [value.icon, "fa fa-android fa-lg"];
				} else if (value.jenis_laporan == "facebook") {
					value.icon = [value.icon, "fa fa-facebook fa-lg"];
				} else if (value.jenis_laporan == "twitter") {
					value.icon = [value.icon, "fa fa-twitter fa-lg"];
				} else if (value.jenis_laporan == "sms") {
					value.icon = [value.icon, "fa fa-envelope fa-lg"];
				} else {
					value.icon = [value.icon, "fa fa-phone fa-lg"];
				}
			});
		});
	}
	function getDataLaporan() {
		return dataApi.getDataLaporan()
			.then(function (data) {
				var dataLaporan = data;
				return dataLaporan;
			})
	}

	function openModal(itemData) {
		var modalInstance = $uibModal.open({
			ariaLabelledBy: 'modal-title',
			ariaDescribedBy: 'modal-body',
			templateUrl: 'views/template/uibModal.html',
			controller: 'modalController',
			controllerAs: 'vm',
			resolve: {
				modalData: function () {
					return {
						itemData: itemData
					};
				}
			}
		});
	}
}
function laporanMapController($uibModal, dataApi, logger, $rootScope) {
	var vm = this;
	vm.openModal = openModal;

	activate();

	function activate() {
		return getDataLaporan().then(function (data) {
			vm.dataLaporan = data;
		});
	}
	function getDataLaporan() {
		return dataApi.getDataLaporan()
			.then(function (data) {
				vm.dataBijon = data;
				return vm.dataBijon;
			})
	}

	function openModal(itemData) {
		var modalInstance = $uibModal.open({
			ariaLabelledBy: 'modal-title',
			ariaDescribedBy: 'modal-body',
			templateUrl: 'views/template/uibModal.html',
			controller: 'modalController',
			controllerAs: 'vm'
		});
	}
}

function laporanVerifyWebController($uibModal, dataApi, logger, $rootScope) {
	var vm = this;
	vm.openModal = openModal;
	vm.itemDataSend = {
		latLng: undefined
	}
	$rootScope.laporanVerifyWeb = activate;
	activate();

	function activate() {
		getDataLaporanVerify().then(function (data) {
			vm.dataLaporan = data;
			angular.forEach(vm.dataLaporan, function (value, key) {
				if (value.jenis_laporan == "web") {
					value.icon = [value.icon, "fa fa-globe fa-lg"];
				} else if (value.jenis_laporan == "android") {
					value.icon = [value.icon, "fa fa-android fa-lg"];
				} else if (value.jenis_laporan == "facebook") {
					value.icon = [value.icon, "fa fa-facebook fa-lg"];
				} else if (value.jenis_laporan == "twitter") {
					value.icon = [value.icon, "fa fa-twitter fa-lg"];
				} else if (value.jenis_laporan == "sms") {
					value.icon = [value.icon, "fa fa-envelope fa-lg"];
				} else {
					value.icon = [value.icon, "fa fa-phone fa-lg"];
				}
			});
		});
	}
	function getDataLaporanVerify() {
		return dataApi.getDataLaporanVerify('web')
			.then(function (data) {
				$rootScope.dataLaporanWeb = data;
				var dataLaporan = data;
				return dataLaporan;
			})
	}

	function openModal(itemData, indexLaporan) {
		var modalInstance = $uibModal.open({
			ariaLabelledBy: 'modal-title',
			ariaDescribedBy: 'modal-body',
			templateUrl: 'views/template/uibModal.verify.web.html',
			controller: 'modalVerifyWebController',
			controllerAs: 'vm',
			resolve: {
				modalData: function () {
					return {
						itemData: itemData,
						indexLaporan: indexLaporan
					};
				}
			}
		});
	}
}
function laporanVerifyFacebookController($uibModal, dataApi, logger, $rootScope, $http, loading) {
	var vm = this;
	vm.openModal = openModal;
	vm.itemDataSend = {
		latLng: undefined
	}
	$rootScope.laporanVerifyFacebook = activate;

	activate();

	function activate() {
		getDataLaporanVerify().then(function (data) {
			vm.dataLaporan = data;
		});
	}
	function getDataLaporanVerify() {
		return dataApi.getDataLaporanVerify('facebook')
			.then(function (data) {
				var dataLaporan = data;
				$rootScope.dataLaporanFacebook = data;
				return dataLaporan;
			})
	}

	function openModal(itemData, indexLaporan) {
		var modalInstance = $uibModal.open({
			ariaLabelledBy: 'modal-title',
			ariaDescribedBy: 'modal-body',
			templateUrl: 'views/template/uibModal.verify.facebook.html',
			controller: 'modalVerifyFacebookController',
			controllerAs: 'vm',
			resolve: {
				modalData: function () {
					return {
						itemData: itemData,
						indexLaporan: indexLaporan
					};
				}
			}
		});
	}
}

function modalController($uibModal, $uibModalInstance, logger, modalData, $scope, postDataApi, $rootScope, alert) {
	var vm = this;
	vm.sendData = sendData;
	vm.itemData = modalData.itemData;
	logger.debug(vm.itemData);
	vm.itemDataSend = {
		idlaporan_masyarakat: vm.itemData.idlaporan_masyarakat,
		proses: {
			tindakan_proses: undefined,
			pengerjaan_hari: undefined,
			pengerjaan_jam: undefined,
			file_respon_proses: {
				nama: undefined,
				file: undefined
			}
		},
		selesai: {
			tindakan_selesai: undefined,
			file_respon_selesai: {
				nama: undefined,
				file: undefined
			}
		}
	};
	vm.openMapModal = openMapModal;
	vm.cancel = modalCancel;

	$scope.uploadProses = function (el) {
		if (el.files && el.files[0]) {
			var fr = new FileReader();
			var fileType = el.files[0].type;
			fr.onload = function (e) {
				if (fileType.split("/")[0] == "image") {
					vm.itemDataSend.proses.file_respon_proses.nama = el.files[0].name;
					vm.itemDataSend.proses.file_respon_proses.file = e.target.result;
					angular.element(el).removeClass('error');
				} else {
					angular.element(el).addClass('error');
					el.value = '';
				}
			}
			fr.readAsDataURL(el.files[0]);
		}
	}
	$scope.uploadSelesai = function (el) {
		if (el.files && el.files[0]) {
			var fr = new FileReader();
			var fileType = el.files[0].type;
			fr.onload = function (e) {
				if (fileType.split("/")[0] == "image") {
					vm.itemDataSend.selesai.file_respon_selesai.nama = el.files[0].name;
					vm.itemDataSend.selesai.file_respon_selesai.file = e.target.result;
					angular.element(el).removeClass('error');
				} else {
					angular.element(el).addClass('error');
					el.value = '';
				}
			}
			fr.readAsDataURL(el.files[0]);
		}
	}

	function openMapModal() {
		var modalInstance = $uibModal.open({
			ariaLabelledBy: 'modal-title',
			ariaDescribedBy: 'modal-body',
			templateUrl: 'views/template/uibModal.verify.map.html',
			windowClass: 'secondPopupMap',
			controller: modalSecondController,
			controllerAs: 'vm',
			size: 'lg'
		});

		function modalSecondController(NgMap, $scope) {
			this.close = closeModal;
			this.dragEnd = dragEnd;

			function dragEnd(event) {
				vm.latLng = event.latLng.lat() + ', ' + event.latLng.lng();
			}

			this.refresh = refreshMap;

			function refreshMap() {
				var self = this;
				NgMap.getMap().then(function (map) {
					self.gMap = map;
					google.maps.event.trigger(self.gMap, 'resize');
				})
			}

			function closeModal() {
				modalInstance.dismiss();
			}
		}
	}

	function sendData() {
		postUrusLaporan().then(function (response) {
			$uibModalInstance.dismiss();
			$rootScope.laporanActivate();
			if (response.status == 'ok') {
				alert.alertScope.push({ type: 'info', msg: 'Laporan di tangani' });
			} else {
				alert.alertScope.push({ type: 'danger', msg: 'Laporan tidak di tangani' })
			}
		})
	}
	function postUrusLaporan() {
		return postDataApi.postUrusLaporan(vm.itemDataSend)
			.then(function (data) {
				var urusLaporan = data;
				return urusLaporan;
			})
	}

	function modalCancel() {
		$uibModalInstance.close(function () {
			return 'close'
		});
	};
}

function modalVerifyWebController($uibModal, $uibModalInstance, logger, modalData, dataApi, postDataApi, $http, $scope, $rootScope, alert) {
	var vm = this;
	vm.modalInstance = $uibModalInstance;
	vm.sendData = sendData;
	vm.openMapModal = openMapModal;
	vm.itemData = modalData.itemData;
	vm.hapusData = hapusData;
	vm.latLng = undefined;
	vm.itemDataSend = {
		idlaporan_masyarakat: vm.itemData.idlaporan_masyarakat,
		jenis_laporan: 'web',
		latitude: undefined,
		longitude: undefined
	};

	function sendData() {
		postSimpanLaporanWeb().then(function (response) {
			$uibModalInstance.dismiss();
			$rootScope.laporanVerifyWeb();
			alert.alertScope.push({ type: 'info', msg: 'Laporan Berhasil di Approve' });
		})
	}
	function postSimpanLaporanWeb() {
		return postDataApi.postApproveLaporan(vm.itemDataSend)
			.then(function (data) {
				var simpanLaporanWeb = data;
				return simpanLaporanWeb;
			})
	}

	function hapusData() {
	}

	function openMapModal() {
		var modalInstance = $uibModal.open({
			ariaLabelledBy: 'modal-title',
			ariaDescribedBy: 'modal-body',
			templateUrl: 'views/template/uibModal.verify.map.html',
			windowClass: 'secondPopupMap',
			controller: modalSecondController,
			controllerAs: 'vm',
			size: 'lg'
		});

		function modalSecondController(NgMap, $scope) {
			this.close = closeModal;
			this.dragEnd = dragEnd;

			function dragEnd(event) {
				vm.itemDataSend.latitude = event.latLng.lat();
				vm.itemDataSend.longitude = event.latLng.lng();
				vm.latLng = event.latLng.lat() + ', ' + event.latLng.lng();
			}

			this.refresh = refreshMap;

			function refreshMap() {
				var self = this;
				NgMap.getMap().then(function (map) {
					self.gMap = map;
					google.maps.event.trigger(self.gMap, 'resize');
				})
			}

			function closeModal() {
				modalInstance.dismiss();
			}
		}
	}
}
function modalVerifyFacebookController($uibModal, $uibModalInstance, logger, modalData, dataApi, postDataApi, $http, $scope, $rootScope, alert, loading) {
	var vm = this;
	vm.modalInstance = $uibModalInstance;
	vm.sendData = sendData;
	vm.hapusData = hapusData;
	vm.openMapModal = openMapModal;
	vm.itemData = modalData.itemData;
	vm.latLng = undefined;
	vm.itemDataSend = {
		nama_pelapor: vm.itemData.nama_user,
		email_pelapor: undefined,
		nomorhp_pelapor: undefined,
		alamat_pelapor: undefined,
		idkategori_laporan: undefined,
		idkacamatan: undefined,
		idkalurahan: undefined,
		id_laporan_facebook: vm.itemData.id_laporan_facebook,
		isi_laporan: vm.itemData.message,
		jenis_laporan: 'facebook',
		latitude: undefined,
		longitude: undefined,
		file_attach: {
			nama: undefined,
			file: undefined
		}
	};

	$scope.upload = function (el) {
		if (el.files && el.files[0]) {
			var fr = new FileReader();
			var fileType = el.files[0].type;
			fr.onload = function (e) {
				if (fileType.split("/")[0] == "image") {
					vm.itemDataSend.file_attach.nama = el.files[0].name;
					vm.itemDataSend.file_attach.file = e.target.result;
					angular.element(el).removeClass('error');
				} else {
					angular.element(el).addClass('error');
					el.value = '';
				}
			}
			fr.readAsDataURL(el.files[0]);
		}
	}

	activate();
	function activate() {
		getDataLaporanKategori().then(function (data) {
			vm.dataLaporanKategori = data;
		});
		getDataLaporanKecamatan().then(function (data) {
			vm.dataLaporanKecamatan = data;
		});
		vm.dataKelurahan = dataKelurahan

		function dataKelurahan(idKecamatan) {
			console.log(idKecamatan);
			getDataLaporanKelurahan(idKecamatan).then(function (data) {
				vm.dataLaporanKelurahan = data;
			});
		};
	}
	function getDataLaporanKategori() {
		return dataApi.getDataLaporanKategori()
			.then(function (data) {
				var dataLaporanKategori = data;
				return dataLaporanKategori;
			})
	}
	function getDataLaporanKecamatan() {
		return dataApi.getDataLaporanKecamatan()
			.then(function (data) {
				var dataLaporanKecamatan = data;
				return dataLaporanKecamatan;
			})
	}
	function getDataLaporanKelurahan(idKecamatan) {
		return dataApi.getDataLaporanKelurahan(idKecamatan)
			.then(function (data) {
				var dataLaporanKelurahan = data;
				return dataLaporanKelurahan;
			})
	}

	function sendData() {
		postSimpanLaporanFacebook().then(function (response) {
			$uibModalInstance.dismiss();
			$rootScope.laporanVerifyFacebook();
			alert.alertScope.push({ type: 'info', msg: 'Laporan berhasil di approve' });
		})
	}
	function postSimpanLaporanFacebook() {
		return postDataApi.postSimpanLaporan(vm.itemDataSend)
			.then(function (data) {
				var simpanLaporanFacebook = data;
				return simpanLaporanFacebook;
			})
	}

	function hapusData() {

	}

	function openMapModal() {
		var modalInstance = $uibModal.open({
			ariaLabelledBy: 'modal-title',
			ariaDescribedBy: 'modal-body',
			templateUrl: 'views/template/uibModal.verify.map.html',
			windowClass: 'secondPopupMap',
			controller: modalSecondController,
			controllerAs: 'vm',
			size: 'lg'
		});

		function modalSecondController(NgMap, $scope) {
			this.close = closeModal;
			this.dragEnd = dragEnd;

			function dragEnd(event) {
				vm.itemDataSend.latitude = event.latLng.lat();
				vm.itemDataSend.longitude = event.latLng.lng();
				vm.latLng = event.latLng.lat() + ', ' + event.latLng.lng();
			}

			this.refresh = refreshMap;

			function refreshMap() {
				var self = this;
				NgMap.getMap().then(function (map) {
					self.gMap = map;
					google.maps.event.trigger(self.gMap, 'resize');
				})
			}

			function closeModal() {
				modalInstance.dismiss();
			}
		}
	}
}
