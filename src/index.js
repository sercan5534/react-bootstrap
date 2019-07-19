import express from "express";
import http from "http";
import helmet from "helmet";
import path from "path";
import bodyParser from "body-parser";


const PORT = 80,
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
http.createServer(opt,app).listen(PORT);



