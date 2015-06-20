
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var sleep = require('sleep');
app.use( bodyParser.json() ); 

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views'));

var fs = require('fs');
var obj = JSON.parse(fs.readFileSync('02.json', 'utf8'));
//console.log(obj);

app.get('/', function (req, res){
	res.render('index');
});
app.get('/home', function (req, res){
	var x= req.query.x;
	var y= req.query.y;
	if(x){
		
		var data = obj;
		var csv="";
		for(var i=0;i<data.length;i++){
			csv+= data[i].FIELD10+","+data[i][x]+"\n";
		}
		//console.log(csv);
		fs.writeFile('map.csv', csv, function (err) {
		  if (err) throw err;
		  //console.log('It\'s saved!');
		});

		//console.log(x);
		var dota= [];
		for(i=0;i<obj.length;i++)
		{
			dota.push(obj[i][x]);
		}
		//console.log(dota[1]);
		res.render('map',{
			data : dota 
		});
	}
	else
	res.render('home',{
		data : obj
	});
});
app.get('/data', function (req, res){
	var x= req.query.x;
	if(x){
	res.render('data',{
		data : obj,
		x : x
	});
	}
	else
		res.send("Please Enter field value!!");
});

app.get('/graph', function (req, res){
	res.render('graph3');
});
////////------- GOOGLE-MAP -------------------------/////////////////
/*
var geocoderProvider = 'google';
var httpAdapter = 'https';
// optionnal 
var extra = {
    apiKey: 'AIzaSyB3wNLhjT9wEyeFvSN1yjp3iEdTFp76pt8', // for Mapquest, OpenCage, Google Premier 
    formatter: null         // 'gpx', 'string', ... 
};
 
var geocoder = require('node-geocoder')(geocoderProvider, httpAdapter, extra);

var mapdata="[";
var array =[];
for(var i=2;i<obj.length;i++){

	array.push(obj[i].FIELD10) ;
}
//console.log (array);

// Using callback 

for(var i=0,j=0;i<array.length;i+=1){
	var l = array[i]+", Delhi , India";
	console.log("this is generated add "+l);
	
	geocoder.geocode(l, function(err, res) {
		var z=(JSON.stringify(res));
		z= JSON.parse(z);
		mapdata+=("['"+obj[j+1].FIELD10+"',"+z[0].latitude+","+z[0].longitude+","+(j+1)+"],");
		j++;
	    console.log(mapdata)
	    sleep.sleep(0.5);
	});

if(i==array.length)
	write();
}

//setInterval( write(), 50000);
function write(){
console.log(mapdata+"this is data");

	fs.writeFile('mapdata.json', mapdata, function (err) {
	  if (err) throw err;
	  console.log('It\'s saved!');
	});
 }*/

var host = (process.env.VCAP_APP_HOST || 'localhost');
var port = (process.env.VCAP_APP_PORT || 3000);
app.listen(port, host);
console.log('App started on port ' + port);
