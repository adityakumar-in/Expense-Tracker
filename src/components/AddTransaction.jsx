import { React, useContext, useEffect, useRef } from 'react'
import '../App.css'
import { ItemContext, AmountContext, IsIncomeContext, IsSubmitContext, IdContext } from './ElementProvider'

const AddTransaction = () => {
  const {item, setItem} = useContext(ItemContext);
  const {amount, setAmount} = useContext(AmountContext);
  const {isIncome, setIsIncome} = useContext(IsIncomeContext);
  const {isSubmit, setIsSubmit} = useContext(IsSubmitContext);
  const {id, setId} = useContext(IdContext);

  const Item = useRef();
  const Amount = useRef();
  const IsIncome = useRef();
  const getDateTime = () => {
    return Date.now();
  }

  const Submit = (e) => {
    e.preventDefault()

    if(item === '' || amount === 0) {
      alert('Please fill all the fields');
      return;
    }

    setId(getDateTime());
    setIsSubmit(!isSubmit);
    Item.current.value = '';
    Amount.current.value = 0;
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
