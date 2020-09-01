const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const cors = require('cors');
const emailsRoutes = require('./emails');

app.use(cors());

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

io.on('connection', () => {
  console.log('connected to socket');
});

const server = http.listen(3001, () => {
  console.log('server is running on port', server.address().port);
});
app.use('/api/emails', emailsRoutes);
