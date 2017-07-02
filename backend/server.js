var express        = require('express');
var app            = express();
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var mysql = require('mysql');
var cors		   = require('cors');
app.use(cors());
const connection = mysql.createConnection({
  host : 'localhost',
  user : 'root',
  password: 'root',
  db : 'furcifer'
});

connection.connect((err) => {
    if (!err) {
        connection.query('USE furcifer;');
        console.log("Database connected!");
    } else {
        console.log("Error in database connection!");
		console.log(err);
    }
});
var port = process.env.PORT || 6969; 
app.use(bodyParser.json()); 
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(methodOverride('X-HTTP-Method-Override')); 
app.use('/images', express.static(__dirname + '/images')); 
app.listen(port);                             
console.log('Magic happens on port ' + port);

app.get('/', function (req, res) {
  res.send('Hello World!')
});

app.get('/restaurants/list',function(req,res){
	var payload = [];
	var query = "SELECT * FROM restaurant"
	connection.query(
		query,
		payload,
		function (error, results, fields) {
			console.log(results);
			res.send(results);
		}
	);
	//x.push({restaurantId:32,name:"Jolibee",distance:5,thumbnail:"https://d34nj53l8zkyd3.cloudfront.net/ph/view/703817211a"});
});

app.get('/menu/:restaurantId',function(req,res){
	var payload = [req.params.restaurantId];
	var query = "SELECT * FROM food where restaurant_id = ?"
	connection.query(
		query,
		payload,
		function (error, results, fields) {
			res.send(results);
		}
	);
});

app.post('order',function(req,res){
	var user_id = req.body.userId;
    var token = req.body.token;
    var name = req.body.orders;
    res.send(true);
});


// expose app           
module.exports = app;                         
