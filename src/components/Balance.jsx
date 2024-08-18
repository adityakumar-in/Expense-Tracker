import { React, useEffect, useState, useContext } from 'react'
import { TransactionsContext } from './ElementProvider'
import '../App.css'

const Balance = () => {
  const {transactions, setTransactions} = useContext(TransactionsContext);
  const [balance, setBalance] = useState(0);

  // This useEffect hook will run every time the transactions array changes and update the balance
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
      {/* If balance is positive, it will show ₹ before the amount, else it will show - ₹ before the amount */}
      <div id='balance'>{balance>=0 ? "₹" : "- ₹"}{Math.abs(balance)}.00</div>
    </div>
  )
}

export default Balance
