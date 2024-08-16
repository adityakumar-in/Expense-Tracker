import { useContext, useEffect, useState } from 'react'
import '../App.css'
import Transaction from './Transaction'
import { ItemContext, AmountContext, IsIncomeContext, IsSubmitContext, TransactionsContext, IdContext } from './ElementProvider'

const TransactionList = () => {
  const getDateTime = () => {
    return Date.now();
  }

  const {item, setItem} = useContext(ItemContext);
  const {amount, setAmount} = useContext(AmountContext);
  const {isIncome, setIsIncome} = useContext(IsIncomeContext);
  const {isSubmit, setIsSubmit} = useContext(IsSubmitContext);
  const {transactions, setTransactions} = useContext(TransactionsContext);
  const {id, setId} = useContext(IdContext);
  let showTransactions = 5;

  useEffect(() => {
    const convertedIsIncome = typeof isIncome === 'string' ? (isIncome==='true'? true: false) : isIncome;

    if (item !== '' || amount !== 0) {
      setId(getDateTime());
      setTransactions([...transactions, {id, item, amount, isIncome: convertedIsIncome}]);
    }
    setItem('');
    setAmount(0);
    setIsIncome(true);
    setIsSubmit(false);
  }, [isSubmit]);

  return (
    <div id='history'>
      <div className='flexing subHeading' tag={`${transactions.length>showTransactions ? "apply" : "deny"}`}>
        <div>History</div>
        {transactions.length > showTransactions && <div className='dropDown'><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#121212"><path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z"/></svg></div>}
      </div>
      {transactions.length!==0? transactions.map((transaction, index) => (
        (transaction.item !== '' || transaction.amount !== 0) &&
        <Transaction key={transaction.id} id={transaction.id} item={transaction.item} amount={transaction.amount} isIncome={transaction.isIncome} />
      )): <div>No transactions yet</div>}
    </div>
  );
}

export default TransactionList