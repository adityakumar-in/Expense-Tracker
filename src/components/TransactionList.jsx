import { useContext, useEffect, useState } from 'react'
import '../App.css'
import Transaction from './Transaction'
import { TransactionsContext } from './ElementProvider'

const TransactionList = () => {
  const {transactions, setTransactions} = useContext(TransactionsContext);

  return (
    <div id='history'>
      <div className='subHeading'>
        <div>History</div>
      </div>
      {transactions.length!==0? transactions.map((transaction, index) => (
        (transaction.item !== '' || transaction.amount !== 0) &&
        <Transaction key={transaction.id} id={transaction.id} item={transaction.item} amount={transaction.amount} isIncome={transaction.isIncome} />
      )): <div>No transactions yet</div>}
    </div>
  );
}

export default TransactionList