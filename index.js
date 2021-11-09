const express = require("express");
const app = express();
const { MongoClient } = require("mongodb");
require("dotenv").config();
const cors = require("cors");
const ObjectId = require("mongodb").ObjectId;
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.uhu2y.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

async function run() {
    try {
        await client.connect();
        console.log("connected");
    } finally {
    }
}
run().catch(console.dir);

app.get("/", (req, res) => {
    res.send("wings are spinning...");
});

app.listen(port, () => {
    console.log("server opened at port ", port);
});
