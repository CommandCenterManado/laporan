var app = require("express")();
var server = require("http").Server(app);
var io = require("socket.io")(server);
var bodyParser = require("body-parser");


server.listen(7001);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

app.get("/",function(req,res){
	
	res.send("Jalan...");

});

app.get("/track",function(req,res){


	res.send("wowo");

})

app.post("/trigger_laporan_baru",function(req,res){

	console.log(req.body);
	kirimTrigger(req.body);
	res.send("sukses!");

});

console.log("Node server siap tempur!");

function kirimTrigger(data) {
	if(data.hasOwnProperty("dari_publik")) {
		console.log("Laporan publik baru. >> Masuk verifikasi");
		io.emit("laporanpublik",data);
	} else {
		io.emit("laporanfixed",data);
		console.log("Laporan fixed terverifikasi!");
	}

}
