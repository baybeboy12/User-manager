import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web";
import initApiRoutes from "./route/api";
import connectDB from "./config/connectDB";
import cors from "cors";
import cookieParser from "cookie-parser";

require("dotenv").config();

let app = express();

//config app

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    allowedHeaders: ["authorization", "Content-Type"], // you can change the headers
    exposedHeaders: ["authorization"], // you can change the headers
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    credentials: true,
    origin: true,
    credentials: true,
  })
);
//config body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//config cookies parser
app.use(cookieParser());

//
viewEngine(app);
initWebRoutes(app);
initApiRoutes(app);
connectDB();

let port = process.env.PORT;

app.listen(port, () => {
  console.log("Server is running on Port: " + port);
});
