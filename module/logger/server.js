import http from 'http'
import fs from 'fs'

const server = http.createServer((req,res)=>{
    const date=new Date();
    const log=`client request on http://localhost:4141${req.url} by ${req.method} at ${date.getDate()}/${date.getMonth()}/${date.getFullYear()}| ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} from this IP: ${req.socket.remoteAddress}\n`;

    fs.appendFileSync("one.txt",log);




    if(req.url==="/" && req.method=='GET')
    {
        res.writeHead(200,{"content-type":"text/plain"});
        res.end("Home page-GET request");

    }
    else if(req.url==="/" && req.method=='POST')
    {
        res.writeHead(200,{"content-type":"text/plain"});
        res.end("Home page-Post request");

    }
    else if(req.url==="/" && req.method=='PUT')
    {
        res.writeHead(200,{"content-type":"text/plain"});
        res.end("Home page-PUT request");

    }


    else if(req.url==="/" && req.method=='DELETE')
    {
        res.writeHead(200,{"content-type":"text/plain"});
        res.end("Home page-DELETE request");

    }
   
     else if(req.url==="/about" && req.method=='GET')
    {
        res.writeHead(200,{"content-type":"text/plain"});
        res.end("About page-GET request");
    }
     else if(req.url==="/about" && req.method=='POST')
    {
        res.writeHead(200,{"content-type":"text/plain"});
        res.end("About page-POST request");
    }
    else if(req.url==="/about" && req.method=='PUT')
    {
        res.writeHead(200,{"content-type":"text/plain"});
        res.end("About page-PUT request");
    }
    else if(req.url==="/about" && req.method=='DELETE')
    {
        res.writeHead(200,{"content-type":"text/plain"});
        res.end("About page-DELETE request");
    }
    else if(req.url==="/service" && req.method=='GET')
    {
        res.writeHead(200,{"content-type":"text/plain"});
        res.end("Service page-GET request");
    }
    else if(req.url==="/service" && req.method=='POST')
    {
        res.writeHead(200,{"content-type":"text/plain"});
        res.end("Service page-POST request");
    }
    else if(req.url==="/service" && req.method=='PUT')
    {
        res.writeHead(200,{"content-type":"text/plain"});
        res.end("Service page-PUT request");
    }
    else if(req.url==="/service" && req.method=='DELETE')
    {
        res.writeHead(200,{"content-type":"text/plain"});
        res.end("Service page-DELETE request");
    }
    else if(req.url==="/portfolio" && req.method=='GET')
    {
        res.writeHead(200,{"content-type":"text/plain"});
        res.end("Portfolio page-GET request");
    }
    else if(req.url==="/portfolio" && req.method=='POST')
    {
        res.writeHead(200,{"content-type":"text/plain"});
        res.end("Portfolio page-POST request");
    }

    else if(req.url==="/portfolio" && req.method=='PUT')
    {
        res.writeHead(200,{"content-type":"text/plain"});
        res.end("Portfolio page-PUT request");
    }
    else if(req.url==="/portfolio" && req.method=='DELETE')
    {
        res.writeHead(200,{"content-type":"text/plain"});
        res.end("Portfolio page-DELETE request");
    }
    else
    {
       console.log("404-page not found");
    }



});
server.listen(4141,()=>{
    console.log("server started");
})