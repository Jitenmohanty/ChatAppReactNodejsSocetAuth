const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoute')
const Port = 5000 || process.env.PORT;
const app = express();

require('dotenv').config();

app.use(cors());

app.use(express.json());

app.use("/api/auth" , userRoutes)

mongoose.connect(process.env.MONGO_DB_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
})
.then(()=>{
    console.log('db Connection Sucessfully')
})
.catch((err)=>{
    console.log(err.message)
})

const server = app.listen(Port, () => {
    console.log(`Server Started on Port ${Port}`)
})
