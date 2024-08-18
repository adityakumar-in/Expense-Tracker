import mongoose from "mongoose";
const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
    id: String,
    item: String,
    amount: Number,
    isIncome: Boolean
});

const Transaction = mongoose.model('Transaction', TransactionSchema);

export default Transaction;