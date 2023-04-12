const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const dotenv = require('dotenv')
const path = require("path");


const errorMiddleware = require("./middleware/error");

// config 
dotenv.config({path:"backend/config/config.env"})
const cors = require('cors');

const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,        
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());


// Route Imports
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");
const payment = require("./routes/paymentRoute");


app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);

app.use(express.static(path.join(__dirname, "../do-an/front-end/public")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../do-an/front-end/public/index.html"));
});

// Middleware for Error
app.use(errorMiddleware);

module.exports = app;
