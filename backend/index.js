const connectToMongo = require('./db');
const express = require('express')
var cors = require('cors');
const authRoutes = require('./routes/authRoutes');
require('dotenv').config();
connectToMongo();

const app = express()
const port = 5000;

app.use(cors());


app.use(express.json());   // middleware to use req.body
app.get('/', (req, res) => {
    res.send('Hello World!')
  })
app.use('/api', authRoutes);
app.use('/api/auth' , require('./routes/auth'));
app.use('/api/notes' , require('./routes/notes'));

app.listen(port, () => {
    console.log(`Inotebook backened listening on port ${port}`);
})