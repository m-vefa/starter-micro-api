const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const Order = require('./models/order');
const message = require('./models/message');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

mongoose.set('strictQuery', false);

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

app.use(cors());
app.use(bodyParser.json());

app.get('/api/a', (req, res) => {
  console.log('Successfully accessed /api/a');
  res.status(200).send('Success');
});


app.post('/api/order', async (req, res) => {
  try {
    const formData = req.body;
    const product = await Order.create(formData);

    console.log('Received form data:', formData);
    res.status(200).json({ product, message: 'Order submitted successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred while processing your order' });
  }
});

app.post('/api/messages', async (req, res) => {
  try {
    const formData = req.body;
    const product = await message.create(formData);

    console.log('Received form data:', formData);
    res.status(200).json({ product, message: 'message submitted successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred while processing your message' });
  }
});

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}/`);
  });
});
