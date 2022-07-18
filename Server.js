const express = require('express')
const app = express()
require('./db/db')

const User = require('./models/user');
const userRouter = require('./router/user')


// PORT of the server
const port = 8080;


app.use(express.json());
app.use(userRouter)


app.get('/', function (req, res) {
  res.send('Hello World')
})



// LISTEN PORT
app.listen(port,()=>{
    console.log(`Server running at http://localhost:${port}/`);
});