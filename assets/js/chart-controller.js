// $(function () {
	var chart = Highcharts.chart('chart_div', {
		credits: {
			enabled: false
		},
		title: {
			text: "Laporan Diterima",
			align: 'left'
		},
		xAxis: {
			categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
			'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
		},
		yAxis: {
			title: {
				text: null
			}
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
			data: (function(){
				var data = [];
				for(i=0;i<12;i++){
					data.push([i + Math.random(1)*1111111111]);
				}
				return data;
			}())
		}, {
			color: '#f1c40f',
			name: 'Diproses',
			data: (function(){
				var data = [];
				for(i=0;i<12;i++){
					data.push([i + Math.random(1)*2111111111]);
				}
				return data;
			}())
		}]
	});
	Highcharts.chart('placeholder-laporan-selesai', {
		chart: {
			type: 'column',
			spacing: [0,0,0,0]
		}, title: {
			text: null
		}, xAxis: {
			categories: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
			visible: false
		}, yAxis: {
			visible: false
		}, legend:{
			enabled: false
		}, plotOptions: {
			column: {
				pointPadding: 0,
				borderWidth: 0
			}, series: {
				states:{
					hover: {
						enabled: false
					}
				}
			}
		}, tooltip: {
			enabled: false
		}, series: [{
			name: 'Tokyo',
			data: (function(){
				var data = [];
				jQuery.each(chart.get().series[0].data, function(index, value){
					data.push([value.options.y]);
				});
				return data;
			}()),
			color: "#ecf0f1"
		}], credits: {
			enabled: false
		}
	});
	Highcharts.chart('placeholder-laporan-proses', {
		chart: {
			type: 'column',
			spacing: [0,0,0,0]
		}, title: {
			text: ''
		}, xAxis: {
			categories: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
			visible: false
		}, yAxis: {
			visible: false
		}, legend:{
			enabled: false
		}, plotOptions: {
			column: {
				pointPadding: 0,
				borderWidth: 0,
			}, series: {
				states:{
					hover: {
						enabled: false
					}
				}
			}
		}, tooltip: {
			enabled: false
		}, series: [{
			name: 'Tokyo',
			data: (function(){
				var data = [];
				jQuery.each(chart.get().series[1].data, function(index, value){
					data.push([value.options.y]);
				});
				return data;
			}()),
			color: "#ecf0f1"
		}], credits: {
			enabled: false
		}
	});
// });