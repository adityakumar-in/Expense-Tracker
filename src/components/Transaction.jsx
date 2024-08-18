import { React, useState, useContext, useEffect } from 'react'
import '../App.css'
import { TransactionsContext } from './ElementProvider'

const Transaction = ({ id, item, amount, isIncome }) => {
  const {transactions, setTransactions} = useContext(TransactionsContext);
  const [isHovered, setIsHovered] = useState(false);

  const sendDataToBackend = async () => {
    try {

      const response = await fetch('http://localhost:3000/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({id, item, amount, isIncome}),
      });
      
      const data = await response.json();
      // console.log(data); // Handle9 the response data here
    } catch (error) {
      console.error(error);
    }
  };

  const handleMouseOver = () => {
    setIsHovered(true);
  };
  const handleMouseOut = () => {
    setIsHovered(false);
  };
  const removeCurrentId = async (id) => {
    sendDataToBackend();
    await setTransactions(transactions.filter((transaction) => transaction.id !== id));
  };

  const formatDateTime = (timestamp) => {
    const dateObj = new Date(timestamp);
  
    const month = dateObj.toLocaleString("default", { month: "short" });
    const day = dateObj.getDate();
    const year = dateObj.getFullYear();
  
    let hours = dateObj.getHours();
    const minutes = dateObj.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
  
    const formattedDate = `${day} ${month}, ${year}`;
    const formattedTime = `${hours}:${minutes} ${ampm}`;
  
    return {
      date: formattedDate,
      time: formattedTime
    };
  }

  const { date, time } = formatDateTime(id);

  return (
    <div className={`transaction ${isIncome ? "cash-in-border": "cash-out-border"}`} onMouseEnter={handleMouseOver} onMouseLeave={handleMouseOut}>
      {isHovered ? <span>{date} - {time}</span> : <span>{item} - {id}</span>}
      {isHovered ? <span onClick={()=>{removeCurrentId(id)}} style={{width: "27px", height: "27px"}}><svg xmlns="http://www.w3.org/2000/svg" height="27px" viewBox="0 -960 960 960" width="27px" fill="rgb(160,4,4)"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm80-160h80v-360h-80v360Zm160 0h80v-360h-80v360Z"/></svg></span> : <span>{isIncome ? "+ ₹" : "- ₹"}{`${amount}`}</span>}
    </div>
  )
}

export default Transaction
