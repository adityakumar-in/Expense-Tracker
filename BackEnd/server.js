import express from 'express';
import bodyParser from 'body-parser';
import cors from "cors" // Allow FrontEnd to Connect with BackEnd

const app = express();
const port = 3000;

app.use(cors()) 
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/', (req, res) => {
  const transactionData = req.body;
  console.log('Received Data: ', transactionData);
  // Process the transaction data
  res.json({ message: `Transaction received successfully ${transactionData}`});
});

app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});