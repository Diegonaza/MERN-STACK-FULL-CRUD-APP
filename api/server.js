const dotenv = require('dotenv')
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const customerRoutes = require('./routes/customers')



dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
mongoose.set("strictQuery", false);

mongoose.connect(process.env.DB_URI,{
  useNewUrlParser : true,
  useUnifiedTopology : true
}).then(()=> console.log("Connected to DB")).catch(console.error);

const path = require('path')
app.use('/static', express.static(path.join(__dirname, '/public/images')))
app.use('/api/customers',customerRoutes)




app.listen(process.env.PORT,()=> console.log('Server started at port :', process.env.PORT))