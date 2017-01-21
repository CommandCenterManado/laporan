angular
	.module('app')
	.service('logger', logger)
	.factory('dataApi', dataApi)
	.factory('postDataApi', postDataApi)
	.factory('userService', userService)
	.factory('alert', alert);

logger.$inject = ['$log'];
dataApi.$inject = ['$http', 'logger'];
postDataApi.$inject = ['$http', 'logger'];
userService.$inject = ['$http', 'logger'];
alert.$inject = ['$rootScope'];

function logger($log) {
	var vm = this;
	vm.info = function (msg) { $log.info(msg); }
	vm.warn = function (msg) { $log.warn(msg); }
	vm.error = function (msg) { $log.error(msg); }
	vm.debug = function (msg) { $log.debug(msg); }
}

function dataApi($http, logger) {
	var baseURL = 'http://edgarjeremy.com/index.php/api';

	return {
		getDataLaporan: getDataLaporan,
		getDataLaporanKategori: getDataLaporanKategori,
		getDataLaporanKecamatan: getDataLaporanKecamatan,
		getDataLaporanKelurahan: getDataLaporanKelurahan,
		getDataLaporanVerify: getDataLaporanVerify
	}

	function getDataLaporan() {
		return $http.get(baseURL + '/ambil_laporan')
			.then(getSuccess)
			.catch(getError('Gagal mengambil data Laporan'));
	}
	function getDataLaporanKategori() {
		return $http.get(baseURL + '/ambil_kategori')
			.then(getSuccess)
			.catch(getError('Gagal mengambil data Kategori Laporan'));
	}
	function getDataLaporanKecamatan() {
		return $http.get(baseURL + '/ambil_kecamatan')
			.then(getSuccess)
			.catch(getError('Gagal mengambil data Laporan Kecamatan'));
	}
	function getDataLaporanKelurahan(idKecamatan) {
		return $http.get(baseURL + '/ambil_kelurahan/' + idKecamatan)
			.then(getSuccess)
			.catch(getError('Gagal mengambil data Laporan Kelurahan'));
	}
	function getDataLaporanVerify(type) {
		return $http.get(baseURL + '/ambil_laporan_publik/' + type)
			.then(getSuccess)
			.catch(getError('Gagal mengambil data Laporan Verifikasi: ' + type));
	}

	//function Handler

	function getSuccess(response) {
		return response.data;
	}
	function getError(error) {
		return function () {
			logger.error(error);
			return { success: false, message: error }
		}
	}
}

function postDataApi($http, logger) {
	var baseURL = 'http://edgarjeremy.com/index.php/api';

	return {
		postSimpanLaporan: postSimpanLaporan,
		postApproveLaporan: postApproveLaporan,
		postUrusLaporan: postUrusLaporan
	}

	function postSimpanLaporan(data) {
		return $http.post(baseURL + '/simpan_laporan', data)
			.then(postSuccess)
			.catch(postError('Gagal mengirim data Verifiksi Laporan'));
	}
	function postApproveLaporan(data) {
		return $http.post(baseURL + '/approve_laporan', data)
			.then(postSuccess)
			.catch(postError('Gagal mengirim data Verifiksi Laporan'));
	}
	function postUrusLaporan(data) {
		return $http.post(baseURL + '/urus_laporan', data)
			.then(postSuccess)
			.catch(postError('Gagal mengirim data Laporan'));
	}

	//function Handler

	function postSuccess(response) {
		return response.data;
	}
	function postError(error) {
		return function () {
			logger.error(error);
			return { success: false, message: error }
		}
	}
}

function userService($http, logger) {
	var baseURL = 'http://edgarjeremy.com/index.php/api';
	return {
		login: login,
		check: check,
		logout: logout
	}

	function login(username, password) {
		return $http.post(baseURL + '/login', { 'username': username, 'password': password })
			.then(successHandle)
			.catch(errorHandle)
	}

	function check() {
		return $http.get(baseURL + '/cek_user_login')
			.then(successHandle)
			.catch(errorHandle)
	}

	function logout() {
		return $http.get(baseURL + '/logout')
			.then(successHandle)
			.catch(errorHandle)
	}

	function successHandle(response) {
		return response.data;
	}
	function errorHandle(response) {
		return function () {
			logger.error('Gagal' + response);
		};
	}
}

function alert() {
	return {
		alertScope: []
	}
}