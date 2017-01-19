angular
	.module('app')
	.controller('headerController', headerController)
	.controller('dashboardController', dashboardController)
	.controller('laporanListController', laporanListController)
	.controller('laporanCardController', laporanCardController)
	.controller('laporanVerifyWebController', laporanVerifyWebController)
	.controller('laporanVerifyFacebookController', laporanVerifyFacebookController)
	.controller('laporanMapController', laporanMapController)
	.controller('modalController', modalController)
	.controller('modalVerifyWebController', modalVerifyWebController)
	.controller('modalVerifyFacebookController', modalVerifyFacebookController);

dashboardController.$inject = ['dataApi', 'logger'];
laporanListController.$inject = ['$uibModal', 'dataApi', 'logger'];
laporanCardController.$inject = ['$uibModal', 'dataApi', 'logger'];
laporanMapController.$inject = ['$uibModal', 'dataApi', 'logger'];
laporanVerifyWebController.$inject = ['$uibModal', 'dataApi', 'logger', '$rootScope'];
laporanVerifyFacebookController.$inject = ['$uibModal', 'dataApi', 'logger', '$rootScope', '$http'];
modalController.$inject = ['$uibModal', '$uibModalInstance', 'logger', 'modalData', '$scope', 'postDataApi'];
modalVerifyWebController.$inject = ['$uibModal', '$uibModalInstance', 'logger', 'modalData', 'dataApi', 'postDataApi', '$http', '$scope', '$rootScope'];
modalVerifyFacebookController.$inject = ['$uibModal', '$uibModalInstance', 'logger', 'modalData', 'dataApi', 'postDataApi', '$http', '$scope', '$rootScope'];

function headerController() {

};

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
};

function laporanListController($uibModal, dataApi, logger) {
	var vm = this;
	vm.openModal = openModal;

	activate();

	function activate() {
		return getDataLaporan().then(function (data) {
			vm.dataLaporan = data;

			logger.debug(vm.dataLaporan);
			angular.forEach(vm.dataLaporan, function (value, key) {
				if (value.status == 'dilapor') {
					value.status = [true, false, false];
				} else if (value.status == 'proses') {
					value.status = [false, true, false];
				} else if (value.status == 'selesai') {
					value.status = [false, false, true];
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
			console.log(vm.dataLaporan);
		});
	}
	function getDataLaporan() {
		return dataApi.getDataLaporan()
			.then(function (data) {
				vm.dataBijon = data;
				return vm.dataBijon;
			})
	}
	function openModal(itemData, indexLaporan) {
		logger.info(itemData);
		var modalInstance = $uibModal.open({
			ariaLabelledBy: 'modal-title',
			ariaDescribedBy: 'modal-body',
			templateUrl: 'views/template/uibModal.html',
			controller: 'modalController',
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
function laporanCardController($uibModal, dataApi, logger) {
	var vm = this;
	vm.openModal = openModal;

	activate();

	function activate() {
		getDataLaporan().then(function (data) {
			vm.dataLaporan = data;
			logger.info('dataLaporan is Activate');
			logger.debug(data);

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
					return itemData;
				}
			}
		});
	}
}
function laporanMapController($uibModal, dataApi, logger) {
	var vm = this;
	vm.openModal = openModal;

	activate();

	function activate() {
		return getDataLaporan().then(function (data) {
			vm.dataLaporan = data;
			logger.debug(vm.dataLaporan);
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
			logger.debug(data);
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
function laporanVerifyFacebookController($uibModal, dataApi, logger, $rootScope, $http) {
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

function modalController($uibModal, $uibModalInstance, logger, modalData, $scope, postDataApi) {
	var vm = this;
	vm.sendData = sendData;
	vm.itemData = modalData.itemData;
	vm.itemDataSend = {
		proses: {
			isi_laporan: undefined,
			pengerjaan_hari: undefined,
			pengerjaan_jam: undefined,
			file_attach: undefined
		},
		selesai: {
			isi_laporan: undefined,
			file_attach: undefined
		}
	};
	vm.openSecond = openSecondModal;
	vm.cancel = modalCancel;

	$scope.uploadProses = function (el) {
		if (el.files && el.files[0]) {
			var fr = new FileReader();
			fr.onload = function (e) {
				vm.itemDataSend.proses.file_attach = e.target.result;
			}
			fr.readAsDataURL(el.files[0]);
		}
	}
	$scope.uploadSelesai = function (el) {
		if (el.files && el.files[0]) {
			var fr = new FileReader();
			fr.onload = function (e) {
				vm.itemDataSend.selesai.file_attach = e.target.result;
			}
			fr.readAsDataURL(el.files[0]);
		}
	}

	function openSecondModal() {
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
		postDataApi.postData(vm.itemDataSend)
			.then(function (response) {
				console.log(response);
			})
		$uibModalInstance.dismiss();
	}

	function modalCancel() {
		$uibModalInstance.close(function () {
			return 'close'
		});
	};
}

function modalVerifyWebController($uibModal, $uibModalInstance, logger, modalData, dataApi, postDataApi, $http, $scope, $rootScope) {
	var vm = this;
	vm.modalInstance = $uibModalInstance;
	vm.sendData = sendData;
	vm.openSecond = openSecondModal;
	vm.itemData = modalData.itemData;
	vm.hapusData = hapusData;
	vm.latLng = undefined;
	vm.itemDataSend = {
		idlaporan_masyarakat: vm.itemData.idlaporan_masyarakat,
		jenis_laporan: 'web',
		latitude: undefined,
		longitude: undefined,
		file_attach: vm.itemData.file_attach
	};

	function sendData() {
		postSimpanLaporanWeb().then(function (response) {
			$uibModalInstance.dismiss();
			$rootScope.laporanVerifyWeb();
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

	function openSecondModal() {
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
function modalVerifyFacebookController($uibModal, $uibModalInstance, logger, modalData, dataApi, postDataApi, $http, $scope, $rootScope) {
	var vm = this;
	vm.modalInstance = $uibModalInstance;
	vm.sendData = sendData;
	vm.hapusData = hapusData;
	vm.openSecond = openSecondModal;
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
	console.log(vm.itemData);

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

		function dataKelurahan(idKecamtan) {
			getDataLaporanKelurahan(idKecamtan).then(function (data) {
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
	function getDataLaporanKelurahan(idKecamtan) {
		return dataApi.getDataLaporanKelurahan(idKecamtan)
			.then(function (data) {
				var dataLaporanKelurahan = data;
				return dataLaporanKelurahan;
			})
	}

	function sendData() {
		postSimpanLaporanFacebook().then(function (response) {
			$uibModalInstance.dismiss();
			$rootScope.laporanVerifyFacebook();
			console.log(vm.dataLaporan)
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

	function openSecondModal() {
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
