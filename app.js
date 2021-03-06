const express = require('express');
const path = require('path');
const app = express();
var cors = require('cors')
const router = require('./routes/repository');
const visibility = require('./routes/visibility');
const maintainance = require('./routes/maintainance');


app.use(cors());
app.use(express.static(path.join(__dirname, 'build')));
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
app.use(router);
app.use(visibility);
app.use(maintainance)

app.listen(9000, ()=>{
    console.log("starting a server at 9000.....")
});
