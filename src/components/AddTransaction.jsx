import { React, useContext, useEffect, useRef, useState } from 'react'
import '../App.css'
import { TransactionsContext } from './ElementProvider'

const AddTransaction = () => {
  const [item, setItem] = useState("");
  const [amount, setAmount] = useState(0);
  const [isIncome, setIsIncome] = useState(true);
  const [isSubmit, setIsSubmit] = useState(false);
  const [send, setSend] = useState(false);
  const [id, setId] = useState(0);
  const {transactions, setTransactions} = useContext(TransactionsContext);

  const Item = useRef();
  const Amount = useRef();
  const IsIncome = useRef();

  const getDateTime = () => {
    return Date.now();
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/fetch', {
          method: 'GET'
        });
        const data = await response.json();
        await setTransactions([...data]);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [send]);

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
      setSend(!send);
      // console.log(data); // Handle the response data here
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const convertedIsIncome = typeof isIncome === 'string' ? (isIncome==='true'? true: false) : isIncome;

    if (item !== '' || amount !== 0) {
      setIsIncome(convertedIsIncome);
      sendDataToBackend();
    }
    setItem('');
    setAmount(0);
    setIsIncome(true);
  }, [isSubmit]);

  const Submit = async (e) => {
    e.preventDefault()

    if(item === '' || amount === 0) {
      alert('Please fill all the fields');
      return;
    }

    await setId(getDateTime());
    
    setIsSubmit(!isSubmit);
    Item.current.value = '';
    Amount.current.value = '';
    IsIncome.current.value = true;
  }

  const onChange = (e) => {
    setItem(e.target.value);

  }
  const onAmountChange = (e) => {
    setAmount(Math.abs(e.target.value));
  }
  const onTypeChange = (e) => {
    const IsIncome = e.target.value;
    const convertedIsIncome = typeof IsIncome === 'string' ? (IsIncome==='true'? true: false) : IsIncome;
    setIsIncome(convertedIsIncome);
  }

  return (
    <div>
      <div className="subHeading">Add new transaction</div>

      <form onSubmit={Submit}>
        <label className='inpText'>Text</label>
        <input ref={Item} type="text" value={item} onChange={onChange} placeholder="Enter text..." />

        <label className='inpText'>Amount</label>
        <div id="amount">
            <input ref={Amount} name="amount" type="number" id='cash' placeholder="Enter amount..." onChange={onAmountChange} />
            <select ref={IsIncome} name="isIncome" id="cashType" onChange={onTypeChange} >
              <option value={true}>Income</option>
              <option value={false}>Expense</option>
            </select>
        </div>

        <input type="submit" value="Add transaction" id='addTransaction' />
      </form>
    </div>
  )
}

export default AddTransaction
