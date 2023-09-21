const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000; // or any port you prefer

var cors = require('cors')
app.use(cors())

app.use(bodyParser.json());
app.post('/api/order', (req, res) => {
  const formData = req.body;
  console.log('Received form data:', formData);
  res.status(200).json({ message: 'Order submitted successfully' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
