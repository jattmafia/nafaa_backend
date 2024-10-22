const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3030;
const userRoutes = require('./src/routes/user_routes');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.listen(PORT, () => console.log("started"));
app.use("/api/user",userRoutes);

mongoose.connect("mongodb+srv://naafa:tSrcIrRfZs0uiVi5@cluster0.fawcv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
app.get("/", function (req, res) {
    res.send("started");
});