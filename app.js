const express = require("express");
const app = express();
// const morgan = require("morgan");
const bodyParser = require("body-parser");

const productRoutes = require("./api/routes/products");
const orderRoutes = require("./api/routes/orders");

// app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
      return res.status(200).json({});
  }
  next();
});

// Routes which should handle requests
app.use("/products", productRoutes);

app.use("/orders/query", orderRoutes);


// EdWisor assignment Rest apis 
app.use("/test/query", (req,res) =>{
  let fullname = req.query.fullname;
  let arr = fullname.split(' ');
  let name = {
    firstname : arr[0],
    lastname : arr[1]
  }
  res.send(JSON.stringify(name))
})

app.use("/calculate/age/query", (req,res) => {
   
  let date = req.query.dob;
  let arr = date.split('-');
  let birthDate = [];
  for(let i = 0; i<arr.length; i++){
    birthDate.push(arr[i]);
  }
console.log("birhtdate"+ birthDate)

function calculate_age(date) { 
  var diff_ms = Date.now() - date.getTime();
  var age_dt = new Date(diff_ms); 

  return Math.abs(age_dt.getUTCFullYear() - 1970);
}

// console.log(calculate_age(new Date(1996, 5, 4)));

let result = calculate_age(new Date(birthDate));
console.log("from console log"+ result);
res.send(JSON.stringify(result));
})

// edwisor apis ending



app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;