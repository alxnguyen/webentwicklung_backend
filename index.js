var express=require('express');
var cors=require('cors');

var app=express();
app.use(cors())

app.get('/', function (req, res)    {
    res.send('Hallo Welt!');
});

app.listen(process.env.PORT ||3000);