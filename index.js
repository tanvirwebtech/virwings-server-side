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

        const database = client.db("virwings");
        const products = database.collection("all_drones");
        const orders = database.collection("all_orders");
        const reviews = database.collection("reviews");
        const users = database.collection("users");

        /// POST METHODS ///
        app.post("/add-product", async (req, res) => {
            const product = req.body;
            const result = await products.insertOne(product);
            res.send(result);
        });
        app.post("/orders", async (req, res) => {
            const order = req.body;
            const result = await orders.insertOne(order);
            res.send(result);
        });
        app.post("/reviews", async (req, res) => {
            const order = req.body;
            const result = await reviews.insertOne(order);
            res.send(result);
        });
        app.post("/users", async (req, res) => {
            const user = req.body;
            const result = await users.insertOne(user);
            res.json(result);
        });

        /////--------------////

        /// GET METHODS ///
        app.get("/all-products", async (req, res) => {
            const allProducts = products.find({});
            const result = await allProducts.toArray();
            res.json(result);
        });
        app.get("/products/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const product = await products.findOne(query);
            res.json(product);
        });
        app.get("/orders", async (req, res) => {
            const allOrders = orders.find({});
            const result = await allOrders.toArray();
            res.json(result);
        });
        app.get("/orders/:email", async (req, res) => {
            const email = req.params.email;
            const query = { email: email };
            const allOrders = orders.find(query);
            const result = await allOrders.toArray();
            res.json(result);
        });
        app.get("/reviews", async (req, res) => {
            const allReviews = reviews.find({});
            const result = await allReviews.toArray();
            res.json(result);
        });

        ///------------------///

        /// ---- DELETE ----///
        app.delete("/orders/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = orders.deleteOne(query);
            res.json(result);
        });
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

/* 

https://i.ibb.co/tPfzyDP/surveillence3.png

https://i.ibb.co/SPR3q9s/professional2.png






*/
