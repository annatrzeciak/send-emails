const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config');
const socketIO = require('socket.io');

const app = express();
const http = require('http').Server(app);
const cors = require('cors');
const emailsRoutes = require('./routes/emails');

app.use(cors());
// Connect to MongoDB
mongoose
  .connect(config.mongoURI, {
    useCreateIndex: true,
    useNewUrlParser: true,
  })
  .catch((err) => console.error('Error: Could not connect to MongoDB.', err));

mongoose.connection.on('connected', () => {
  console.log('Connected to database');
});
mongoose.connection.on('error', (err) => {
  console.error('Error: Could not connect to MongoDB.', err);
});
app.use(express.static(__dirname));
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

const server = http.listen(3333, () => {
  console.log('server is running on port', server.address().port);
});
const io = socketIO(server);

io.on('connection', (socket) => {
  console.log(`Socket Connection Established with ID :${socket.id}`);
});
app.io = io;
app.use('/api/emails', emailsRoutes);
