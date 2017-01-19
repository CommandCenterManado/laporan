angular
.module('app')
.service('logger', logger)
.factory('dataApi', dataApi)
.factory('postDataApi', postDataApi);

logger.$inject = ['$log'];
dataApi.$inject = ['$http', 'logger'];

function logger($log){
	var vm = this;
	vm.info = function(msg){ $log.info(msg); }
	vm.warn = function(msg){ $log.warn(msg); }
	vm.error = function(msg){ $log.error(msg); }
	vm.debug = function(msg){ $log.debug(msg); }
}

function dataApi($http, logger){
	var baseURL = 'http://edgarjeremy.com/index.php/api';

	return {
		getDataLaporan: getDataLaporan,
		getDataLaporanKategori: getDataLaporanKategori,
		getDataLaporanKecamatan: getDataLaporanKecamatan,
		getDataLaporanKelurahan: getDataLaporanKelurahan,
		getDataLaporanVerifyWeb: getDataLaporanVerifyWeb,
		getDataLaporanVerifyAndroid: getDataLaporanVerifyAndroid,
		getDataLaporanVerifyFacebook: getDataLaporanVerifyFacebook
	}

	function getDataLaporan(){
		return $http.get(baseURL + '/ambil_laporan')
		.then(getDataLaporanComplete)
		.catch(getDataLaporanFailed);

		function getDataLaporanComplete(response){
			return response.data;
		}
		function getDataLaporanFailed(error){
			logger.error('Gagal mengambil data');
		}
	}
	function getDataLaporanKategori(){
		return $http.get(baseURL + '/ambil_kategori')
		.then(getDataLaporanKategoriComplete)
		.catch(getDataLaporanKategoriFailed);

		function getDataLaporanKategoriComplete(response){
			return response.data;
		}
		function getDataLaporanKategoriFailed(error){
			logger.error('Gagal mengambil data');
		}
	}
	function getDataLaporanKecamatan(){
		return $http.get(baseURL + '/ambil_kecamatan')
		.then(getDataLaporanKecamatanComplete)
		.catch(getDataLaporanKecamatanFailed);

		function getDataLaporanKecamatanComplete(response){
			return response.data;
		}
		function getDataLaporanKecamatanFailed(error){
			logger.error('Gagal mengambil data');
		}
	}
	function getDataLaporanKelurahan(idKecamatan){
		return $http.get(baseURL + '/ambil_kelurahan/' + idKecamatan)
		.then(getDataLaporanKelurahanComplete)
		.catch(getDataLaporanKelurahanFailed);

		function getDataLaporanKelurahanComplete(response){
			return response.data;
		}
		function getDataLaporanKelurahanFailed(error){
			logger.error('Gagal mengambil data');
		}
	}
	function getDataLaporanVerifyWeb(){
		return $http.get(baseURL + '/ambil_laporan_publik/web')
		.then(getDataLaporanVerifyWebComplete)
		.catch(getDataLaporanVerifyWebFailed);

		function getDataLaporanVerifyWebComplete(response){
			return response.data;
		}
		function getDataLaporanVerifyWebFailed(error){
			logger.error('Gagal mengambil data')
		}
	}
	function getDataLaporanVerifyAndroid(){
		return $http.get(baseURL + '/ambil_laporan_publik/android')
		.then(getDataLaporanVerifyAndroidComplete)
		.catch(getDataLaporanVerifyAndroidFailed);

		function getDataLaporanVerifyAndroidComplete(response){
			return response.data;
		}
		function getDataLaporanVerifyAndroidFailed(error){
			logger.error('Gagal mengambil data')
		}
	}
	function getDataLaporanVerifyFacebook(){
		return $http.get(baseURL + '/ambil_laporan_facebook')
		.then(getDataLaporanVerifyFacebookComplete)
		.catch(getDataLaporanVerifyFacebookFailed);

		function getDataLaporanVerifyFacebookComplete(response){
			return response.data;
		}
		function getDataLaporanVerifyFacebookFailed(error){
			logger.error('Gagal mengambil data')
		}
	}
}

function postDataApi($http, logger){
	var baseURL = 'http://edgarjeremy.com/index.php/api';

	return {
		postSimpanLaporan: postSimpanLaporan
	}
	
	function postSimpanLaporan(data){
		return $http.post(baseURL + '/simpan_laporan', data)
		.then(postSimpanLaporanComplete)
		.catch(postSimpanLaporanFailed);

		function postSimpanLaporanComplete(response){
			return response.data;
		}
		function postSimpanLaporanFailed(error){
			logger.error('Gagal mengambil data');
		}
	}
}
