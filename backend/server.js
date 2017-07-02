const express        = require('express');
const bodyParser     = require('body-parser');
const methodOverride = require('method-override');
const mysql 		 = require('mysql');
const cors		   	 = require('cors');
const exec 		   	 = require('child_process').exec;

const app            = express();

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

const port = process.env.PORT || 6969;

app.use(bodyParser.json()); 
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(methodOverride('X-HTTP-Method-Override')); 
app.use('/images', express.static(__dirname + '/images'));
app.use(cors());

app.listen(port);

console.log('Magic happens on port ' + port);

app.get('/', function (req, res) {
  res.send('Hello World!')
});

app.get('/restaurants/list', (req, res) => {
	const payload = [];
	const query = "SELECT * FROM restaurant";

	connection.query(
		query,
		payload,
		(error, results) => {
			res.send(results);
		}
	);
});

app.get('/menu/:restaurantId', (req, res) => {
	const payload = [req.params.restaurantId];
	const query = "SELECT * FROM food where restaurant_id = ?";

	connection.query(
		query,
		payload,
		(error, results) => {
			res.send(results);
		}
	);
});

app.get('/recommend/:id', (req, res) => {
	const cmd = "python3 " + __dirname + "/../ml/fallback.py 1";

	exec(
		cmd,
		function (error, stdout) {
			let bawal = [];

			if (req.query.vegetarian) bawal = bawal.concat(Object.keys(meat));
			if (req.query.halal) bawal = bawal.concat(Object.keys(halal));
			if (req.query.hypertensive) bawal = bawal.concat(Object.keys(hypertensive));
			
			const recs = JSON.parse(stdout);
			const filtered_recs = [];

			for (let i = 0; i < recs.length; ++i) {
				let removed = false;
				for (let b of bawal) {
					if (~recs[i].tags.indexOf(b)) {
						removed = true;
						break
					}
				}

				if (!removed) filtered_recs.push(recs[i]);
			}

			res.send(filtered_recs.filter((e)=> (req.query.budget
				? e.price <= 100
				: true) && !e["name"].split(' ').some((e) => ~bawal.indexOf(e.toLowerCase()))));
		}
	);
});

app.post('order', (req, res) => {
    res.send(true);
});

const meat = {
	"longganisa":true,
	"meat":true,
	"bacon":true,
	"beef":true,
	"chicken":true,
	"cheeseburger":true,
	"burger":true,
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

const hypertensive = {
	"shrimp":true,
	"crabs":true,
	"crispy pata":true,
	"beef":true,
	"pork":true,
	"lamb":true
};

const halal = {
	"pork": true
};

// expose app           
module.exports = app;                         
