var express        = require('express');
var app            = express();
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var mysql = require('mysql');
var cors		   = require('cors');
var async 		   = require('async')
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

app.get('/recommend/:id', function(req, res) {
	var payload = [req.params.user_id];
	var query = "SELECT * FROM food"
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

async function get_tags(food_id) {

}

var meat = {
	"meat":true,
	"bacon":true,
	"beef":true,
	"chicken":true,
	"breast":true,
	"ham":true,
	"hamburger":true,
	"hotdog":true,
	"porkchop":true,
	"pork":true,
	"roast":true,
	"sausage":true,
	"steak":true,
	"turkey":true
};

var hypertensive = {
	"shrimp":true,
	"crabs":true,
	"crispy pata":true,
	"beef":true,
	"pork":true,
	"lamb":true
};

var halal = {
	"pork": true
};

function classifier_vegetarian(row, vegetarian) {
	if (!vegetarian) return true;
	var payload = [row["food_id"]];
	var query = "SELECT tag FROM food_tag where food_id = ?"

	return new Promise((resolve, reject) => {
		connection.query(
			query,
			payload,
			function (error, results, fields) {
				var tags = results;
				for (var tag of tags) {
					if (tag in meat) {
						resolve(false);
					}
				}
				for (var token of row["name"].split(' ').map((x)=>{return x.toLowerCase();})) {
					if (token in meat) {
						resolve(false);
					}
				}
				resolve(false);
			}
		);
	});
};

function classifier_budget(row, budget) {
	if (!budget) return true;
	return row["price"] <= 100;
}

function classifier_halal(row, halal) {
	if (!halal) return true;
	var payload = [row["food_id"]];
	var query = "SELECT tag FROM food_tag where food_id = ?"

	return new Promise((resolve, reject) => {
		connection.query(
			query,
			payload,
			function (error, results, fields) {
				var tags = results;
				for (var tag of tags) {
					if (tag in halal) {
						resolve(false);
					}
				}
				for (var token of row["name"].split(' ').map((x)=>{return x.toLowerCase();})) {
					if (token in halal) {
						resolve(false);
					}
				}
				resolve(true);
			}
		);
	});
}

function classifier_hypertensive(row, hypertensive) {
	if (!hypertensive) return true;
	var payload = [row["food_id"]];
	var query = "SELECT tag FROM food_tag where food_id = ?"

	return new Promise((resolve, reject) => {
		connection.query(
			query,
			payload,
			function (error, results, fields) {
				var tags = results;
				for (var tag of tags) {
					if (tag in hypertensive) {
						resolve(false);
					}
				}
				for (var token of row["name"].split(' ').map((x)=>{return x.toLowerCase();})) {
					if (token in hypertensive) {
						resolve(false);
					}
				}
				resolve(true);
			}
		);
	});
}

// expose app           
module.exports = app;                         
