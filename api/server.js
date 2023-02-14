const dotenv = require('dotenv')
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const costumerRoutes = require('./routes/costumers')



dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
mongoose.set("strictQuery", false);

mongoose.connect(process.env.DB_URI,{
  useNewUrlParser : true,
  useUnifiedTopology : true
}).then(()=> console.log("Connected to DB")).catch(console.error);

app.use('/api/costumers',costumerRoutes)


app.listen(process.env.PORT,()=> console.log('Server started at port :', process.env.PORT))