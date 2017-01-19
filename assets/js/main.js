$(function(){
	$("#dropdownDashboardChange .dropdown-menu li a").click(function(){
		$("#dropdownDashboardChange > a > i").attr('class', $(this).children('i').attr('class') + " fa-lg" );
		console.log($("#dropdownDashboardChange > a > i"));
	})
})