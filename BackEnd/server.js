import express from 'express';
import bodyParser from 'body-parser';
import cors from "cors" // Allow FrontEnd to Connect with BackEnd
import Transaction from './models/TransactionSchema.js';
import mongoose from 'mongoose';

const app = express();
const port = 3000;

app.use(cors()) 
app.use(bodyParser.json())

const connectMongoDB = async () => {
  // Connect to MongoDB
  await mongoose.connect('mongodb+srv://aditya:bindu2004@pocketguard.oplxx.mongodb.net/transactions', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch((err) => {
    console.error(err);
  });
}

connectMongoDB();

app.get('/', (req, res) => {
  res.send('Hello World!');
});


app.post('/', async (req, res) => {
  const transactionData = req.body;
  console.log('Received Data: ', transactionData);

  try {
    const transaction = new Transaction(transactionData);
    await transaction.save();
    res.json ({ message: 'Transaction saved successfully'});
  } catch (error) {
    console.error("error saving transaction: ", error);
    res.status(500).json({ error: 'Failed to save transaction'});
  }
});

app.delete('/', async (req, res) => {
  const transactionData = req.body;
  console.log('Received Data: ', transactionData);

  try {
    const result = await Transaction.deleteOne({ id: transactionData.id });

    if(result.deletedCount === 1) {
      res.json({ message: 'Transaction deleted successfully'});
    } else {
      res.status(404).json({ error: 'Transaction not found'});
    }
  } catch (error) {
    console.error("error saving transaction: ", error);
    res.status(500).json({ error: 'Internal Server Error'});
  }
});

app.get('/fetch', async (req, res) => {
  try {
    const transactions = await Transaction.find();
    console.log(transactions)
    res.json(transactions);
  } catch (error) {
    console.error("error fetching transactions: ", error);
    res.status(500).json({ error: 'Failed to fetch transactions'});
  }
  // res.send("hel")
});

app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});