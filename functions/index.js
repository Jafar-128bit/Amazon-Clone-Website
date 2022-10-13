const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")('sk_test_51Lrb1hSF9l1ytUzyMd8U6eqsCTQTIQo7f5atAhVtatIDpDyrSo3LWZ5w6Efa43pcEi8dfOQrIuOSit9tQb2LmvGo00o0GKIFEI');
// -> App config
const app = express();
// -> Middlewares
app.use(cors({origin: true}));
app.use(express.json());
// -> API routes
app.get('/', (
    req,
    res, next) => {
    res.status(200).send("Hello world!");
});
app.post('/payments/create', async (
    req,
    res, next) => {
    const total = req.query.total;
    //Debugging the incoming amount from frontend
    const paymentIntent = await stripe.paymentIntents.create({
        amount: total, //submit of the currency
        currency: "inr",
    });
    res.status(201).jsonp({
        clientSecret: paymentIntent.client_secret,
    });
});
// -> Listen command
exports.api = functions.https.onRequest(app);
//Example endpoint
// http://localhost:5001/clone-react-7bc56/us-central1/api
