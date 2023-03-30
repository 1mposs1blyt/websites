const express = require('express');
const app = express();  

app.get('/', function(req, res){
    res.send('Welcome to the club buddy')
})

app.listen(port, host, function () {
    console.log(`Server listens http://${host}:${port}`)
})