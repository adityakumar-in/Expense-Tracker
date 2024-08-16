// const amounts = transactions.map (transaction = transaction.amount);
// const total = amounts. reduce (acc, item) => (acc += item), 0). toFixed(2) ;
import React from 'react'
import '../App.css'

const Header = () => {
  return (
    <div id='header'>
      Expense Tracker
    </div>
  )
}

export default Header
