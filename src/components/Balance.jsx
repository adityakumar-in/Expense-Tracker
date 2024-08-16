import { React, useEffect, useState, useContext } from 'react'
import { TransactionsContext } from './ElementProvider'
import '../App.css'

const Balance = () => {
  const {transactions, setTransactions} = useContext(TransactionsContext);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    let totalBalance = 0;

    transactions.forEach((transaction) => {
      if (transaction.isIncome) {
        totalBalance += transaction.amount;
      }
      else {
        totalBalance -= transaction.amount;
      }
    });
    setBalance(totalBalance);
  }, [transactions]);
  return (
    <div>
      <span id='col'>YOUR BALANCE</span>
      <div id='balance'>{balance>=0 ? "₹" : "- ₹"}{Math.abs(balance)}.00</div>
    </div>
  )
}

export default Balance
