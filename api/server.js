const dotenv = require('dotenv')
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
<<<<<<< Updated upstream
const costumerRoutes = require('./routes/costumers')
=======
const customerRoutes = require('./routes/customers')
const bookingRoutes = require('./routes/bookings')
>>>>>>> Stashed changes



dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
mongoose.set("strictQuery", false);

mongoose.connect(process.env.DB_URI,{
  useNewUrlParser : true,
  useUnifiedTopology : true
}).then(()=> console.log("Connected to DB")).catch(console.error);

<<<<<<< Updated upstream
app.use('/api/costumers',costumerRoutes)
=======
const path = require('path')
app.use('/static', express.static(path.join(__dirname, '/public/images')))
app.use('/api/customers',customerRoutes)
app.use('/api/bookings', bookingRoutes)


>>>>>>> Stashed changes


app.listen(process.env.PORT,()=> console.log('Server started at port :', process.env.PORT))