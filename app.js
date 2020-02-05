var express = require('express');
var app= express();
var bodyparser= require('body-parser');
var ejs = require('ejs');
var socketio = require('socket.io');
app.use("/public",express.static(__dirname+'/public'));
var socket1=null;
var expresserver=app.listen(3000,()=>{
    console.log('listening to 3000');
})
var io=socketio(expresserver);
app.use('/',(req,res)=>{
    res.render('input_pin.ejs')
})
io.on('connection',(socket)=>{
    console.log("socket is connected");
     socket1= socket;
   // socket1.emit('server_data',"this is the data");
})
var pin="";
var pp = require('child_process').spawn('python',['test1.py']);
pp.stdout.on('data',(data)=>{
    data = data.toString();
    pin=pin+data[0];
    if(socket1!=null)
     socket1.emit('server_data',pin);
     console.log(pin )
})