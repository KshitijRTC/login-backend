const express = require("express");
const mongoose = require("mongoose")
const bodyparser = require('body-parser');

const userRoutes = require("./Routes/userRoutes");

const app = express();

app.use(bodyparser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  
    next();
  });

const PORT = process.env.PORT || 4000;


app.use("/users", userRoutes);


mongoose.connect("mongodb+srv://kshitijupmanyu101:Kshitij_01@cluster0.tiqebv1.mongodb.net/?retryWrites=true&w=majority")
.then(() => {
    console.log("successfully connected")
    app.listen(PORT)
}).catch((err) => {console.log(err)})



