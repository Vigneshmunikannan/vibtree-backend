const express = require('express')
const cors=require('cors')
const dotenv = require('dotenv').config();
const route=require('./routes/route')
const app = express();
const port=process.env.PORT || 4000;
app.use(cors())
app.use(express.json())
app.use('/',route)
app.listen(port, () => {
    console.log(`app is listening on port....${port}`)
})