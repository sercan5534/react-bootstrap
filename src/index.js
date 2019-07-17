import express from "express";
import https from "https";
import http from "http";
import helmet from "helmet";
import fs from "fs";
import path from "path";
import bodyParser from "body-parser";


const PORT = 443,
    devMode = process.env.NODE_ENV !== "production",
    staticPath = path.join(__dirname,devMode? "../dist":"public"),
    app = express(),
    indexHTML = path.join(__dirname,devMode? "../dist" : "public", "index.html"),
    opt = {
    };
    

//Support for json
app.use( bodyParser.json() );    

//Security prevention
app.use(helmet());

//Serves static and all path not include api path 
app.use(express.static(staticPath));
app.get(/^(?!.*(api)).*$/, function (request, response){
    response.sendFile(indexHTML);
});

// Redirect from http port 80 to https
http.createServer(function (req, res) {
    //TODO: check different port check
    res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
    res.end();
}).listen(80);

//Starts server
https.createServer(opt,app).listen(PORT,()=>{
    console.log("App is started!");
});


