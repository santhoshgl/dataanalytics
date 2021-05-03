const Express = require("express");
const BodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const cors = require('cors')

require('dotenv').config()

const ObjectId = require("mongodb").ObjectID;
const password = process.env.PASSWORD
const CONNECTION_URL = 'mongodb+srv://root:' + password + '@cluster0.sib0u.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const DATABASE_NAME = "accounting_department";

var app = Express();
app.use(cors())

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));
var database, collection;

var port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log('Our app is running on http://localhost:' + port);
    MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {
        if (error) {
            throw error;
        }
        database = client.db(DATABASE_NAME);
        collection = database.collection("personnel");
        console.log("Connected to `" + DATABASE_NAME + "`!");
    });
});

app.post("/personnel", (request, response) => {
    collection.insert(request.body, (error, result) => {
        if (error) {
            return response.status(500).send(error);
        }
        response.send(result.result);
    });
});

