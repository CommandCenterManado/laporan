'use strict';

angular
	.module('app')
	.service('logger', logger)
	.factory('dataApi', dataApi)
	.factory('postDataApi', postDataApi)
	.factory('userService', userService)
	.factory('loading', loading)
	.factory('alert', alert)
	.factory('share', share)
	;// endl

logger.$inject = ['$log'];
dataApi.$inject = ['$http', 'logger', 'loading'];
postDataApi.$inject = ['$http', 'logger', 'loading'];
userService.$inject = ['$http', 'logger', 'loading'];
loading.$inject = ['$rootScope'];
alert.$inject = ['$rootScope'];
share.$inject = [];

function logger($log) {
	var vm = this;
	vm.info = function (msg) { $log.info(msg); }
	vm.warn = function (msg) { $log.warn(msg); }
	vm.error = function (msg) { $log.error(msg); }
	vm.debug = function (msg) { $log.debug(msg); }
}
// var baseURL = 'http://10.11.12.242/belajar/backend/index.php/api';
var baseURL = 'http://localhost/belajar/backend/index.php/api';

function dataApi($http, logger, loading) {
	return {
		getDataLaporan: getDataLaporan,
		getDataLaporanKategori: getDataLaporanKategori,
		getDataLaporanKecamatan: getDataLaporanKecamatan,
		getDataLaporanKelurahan: getDataLaporanKelurahan,
		getDataLaporanVerify: getDataLaporanVerify
	}

	function getDataLaporan() {
		loading.open();
		return $http.get(baseURL + '/ambil_laporan')
			.then(getSuccess)
			.catch(getError('Gagal mengambil data Laporan'));
	}
	function getDataLaporanKategori() {
		loading.open();
		return $http.get(baseURL + '/ambil_kategori')
			.then(getSuccess)
			.catch(getError('Gagal mengambil data Kategori Laporan'));
	}
	function getDataLaporanKecamatan() {
		loading.open();
		return $http.get(baseURL + '/ambil_kecamatan')
			.then(getSuccess)
			.catch(getError('Gagal mengambil data Laporan Kecamatan'));
	}
	function getDataLaporanKelurahan(idKecamatan) {
		loading.open();
		return $http.get(baseURL + '/ambil_kelurahan/' + idKecamatan)
			.then(getSuccess)
			.catch(getError('Gagal mengambil data Laporan Kelurahan'));
	}
	function getDataLaporanVerify(type) {
		loading.open();
		return $http.get(baseURL + '/ambil_laporan_publik/' + type)
			.then(getSuccess)
			.catch(getError('Gagal mengambil data Laporan Verifikasi: ' + type));
	}

	//function Handler

	function getSuccess(response) {
		loading.close();
		return response.data;
	}
	function getError(error) {
		loading.close();
		return function () {
			logger.error(error);
			return { success: false, message: error }
		}
	}
}

function postDataApi($http, logger, loading) {
	return {
		postSimpanLaporan: postSimpanLaporan,
		postApproveLaporan: postApproveLaporan,
		postUrusLaporan: postUrusLaporan
	}

	function postSimpanLaporan(data) {
		loading.open();
		console.log(loading);
		return $http.post(baseURL + '/simpan_laporan', data)
			.then(postSuccess)
			.catch(postError('Gagal mengirim data Verifiksi Laporan'));
	}
	function postApproveLaporan(data) {
		loading.open();
		return $http.post(baseURL + '/approve_laporan', data)
			.then(postSuccess)
			.catch(postError('Gagal mengirim data Verifiksi Laporan'));
	}
	function postUrusLaporan(data) {
		loading.open();
		return $http.post(baseURL + '/urus_laporan', data)
			.then(postSuccess)
			.catch(postError('Gagal mengirim data Laporan'));
	}

	//function Handler

	function postSuccess(response) {
		// loading.close();
		return response.data;
	}
	function postError(error) {
		// loading.close();
		return function () {
			logger.error(error);
			return { success: false, message: error }
		}
	}
}

function userService($http, logger, loading) {
	return {
		login: login,
		check: check,
		logout: logout
	}

	function login(username, password) {
		loading.open();
		return $http.post(baseURL + '/login', { 'username': username, 'password': password })
			.then(successHandle)
			.catch(errorHandle)
	}

	function check() {
		loading.open();
		return $http.get(baseURL + '/cek_user_login')
			.then(successHandle)
			.catch(errorHandle)
	}

	function logout() {
		loading.open();
		return $http.get(baseURL + '/logout')
			.then(successHandle)
			.catch(errorHandle)
	}

	function successHandle(response) {
		loading.close();
		return response.data;
	}
	function errorHandle(response) {
		loading.close();
		return function () {
			logger.error('Gagal' + response);
		};
	}
}
function loading($rootScope) {
	return {
		open: open,
		close: close
	}

	$rootScope.loadingToggle = false;
	function open() {
		$rootScope.loadingToggle = true;
	}
	function close() {
		$rootScope.loadingToggle = false;
	}
}
function alert() {
	return {
		alertScope: []
	}
}
function share(){
	return {
		filter: undefined
	}
}