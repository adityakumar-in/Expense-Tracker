import { React, useState, useContext, useEffect } from 'react'
import '../App.css'
import { TransactionsContext } from './ElementProvider'

const IncomeExpense = () => {
  const {transactions, setTransactions} = useContext(TransactionsContext);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);

  useEffect(() => {
    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach((transaction) => {
      if (transaction.isIncome) {
        totalIncome += transaction.amount;
      }
      else {
        totalExpense += transaction.amount;
      }
    });
    setIncome(totalIncome);
    setExpense(totalExpense);
  }, [transactions]);

  return (
    <div id='incomeExpense'>
      <div id="income">
        INCOME
        <div className='cash-in income-bold'>
          ₹{income}.00
        </div>
      </div>
      <div id="expense">
        EXPENSE
        <div className='cash-out income-bold'>
          ₹{expense}.00
        </div>
      </div>
    </div>
  )
}

export default IncomeExpense
