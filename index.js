require('dotenv').config();
const express = require('express');
const order = require('./models/books').default;

const mnogoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3000;

mnogoose.set('strictQuery', false);
const connectDB = async () => {
  try {
    const conn = await mnogoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);

  } catch (error) {

    console.log(error);

    process.exit(1)
  }
}




const bodyParser = require('body-parser');

var cors = require('cors')
app.use(cors())

app.use(bodyParser.json());


app.get('/api/a'), (req, res) => {
  console.log(' successfully');
  res.status(200);
}

app.post('/api/order', async (req, res) => {
  try {
    const formData = req.body;
    const product = await order.create(formData);

    console.log('Received form data:', formData);

    // Send a single JSON response with both product data and success message
    res.status(200).json({
      product,
      message: 'Order submitted successfully'
    });
  } catch (error) {
    // Handle errors and send an error response if needed
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred while processing your order' });
  }
});


connectDB().then(() => {

  app.listen(PORT, () => {
    console.log()
  })
})